
/* ------------
    This module should:
    -receive packets from the udp server
    -verify packet checksum
    -read the config file to determine how to parse the packet types
    -read the config file to determine how to parse fields in a given packet type
    -Enums & bitfields are not decoded here.
    -Provide a AddSubscriber() function so data stores can add a callback to receive new decoded parameter data
------------ */

/*
* UDP data format from the pod:
* [u32 Sequence][u16 PacketType][u16 Length]...hardware specific data e.g. accelerometers...[CRC16]
* e.g. [u32 Sequence][u16 PacketType][u16 Length][u32 Flags0][u16 X0][u16 Y0][u16 Z0][u32 Flags1][u16 X1][u16 Y1][u16 Z1][u16 CRC16]
*/
const bin = require('./binary.js');
const crc = require('./crc.js');
const packetDefinitions = require('../../config/packetDefinitions.json');
const commConfig = require('../../config/commConfig.js');

class PacketParser {
  constructor () {
    this.date = new Date();
    this.gotNewPacket = this.gotNewPacket.bind(this);
    this.addPacketLisenter = this.addPacketListener.bind(this);
    this.addDAQPacketListener = this.addDAQPacketListener.bind(this);
    this.packetDefinitions = packetDefinitions.packetDefinitions;
    this.packetRXCallbacks = [];
    this.daqPacketRXCallbacks = [];
  }

  addPacketListener (cb) {
    this.packetRXCallbacks.push(cb);
  }

  addDAQPacketListener (cb) {
    this.daqPacketRXCallbacks.push(cb);
  }

  verifyCRC (rawUDP) {
    let packetLength = rawUDP.length - 2; // Packet length minus CRC (2).
    let packetCRC = bin.bytesToUint16(rawUDP[rawUDP.length - 2], rawUDP[rawUDP.length - 1], true);

    let partsCRC = bin.uint16ToBytes(crc.u16SWCRC__CRC(rawUDP.slice(0, packetLength), packetLength), true);
    let calculatedCRC = bin.bytesToUint16(partsCRC[0], partsCRC[1], true);

    if (calculatedCRC === packetCRC) {
      return true;
    } else {
      return false;
    }
  }

  findPacketDefinition (packetType, port) {
    // Use the port number to identify the node that sent the packet
    var node = '';
    for (let i = 0; i < commConfig.RXServers.length; i++) {
      if (commConfig.RXServers[i].port === port) {
        node = commConfig.RXServers[i].hostName;
        break;
      }
    }

    for (let i = 0, len = this.packetDefinitions.length; i < len; i++) {
      if (this.packetDefinitions[i].PacketType === packetType && this.packetDefinitions[i].Node === node) {
        return this.packetDefinitions[i];
      }
    }

    return 0;
  }

  logPacket (packet) {
    var data = '';

    for (let i = 0, len = packet.Parameters.length; i < len; i++) {
      if (i > 0) {
        data += ',';
        data += packet.Parameters[i];
      }
    }
    console.log(data);
  }

  gotNewPacket (raw_udp, port) {
    // Good for testing, should just have some stats:
    //    how many good
    //    bad packets
    //    sequence misses

    var logger = this.logger;

    if (this.verifyCRC(raw_udp)) {
      // Woohoo! Update packet stats that we got a good one
    } else {
      // Uh - oh, update stats that we lost one, abort parsing
      console.log('packetparser.js: Warn, CRC Failure');
      return;
    }

    var sequence = bin.bytesToUint32(raw_udp[0], raw_udp[1], raw_udp[2], raw_udp[3], true);
    var packetType = bin.bytesToUint16(raw_udp[4], raw_udp[5], true);
    var length = bin.bytesToUint16(raw_udp[6], raw_udp[7], true);

    if ((length + 10) !== raw_udp.length) {
      // Packet is the wrong length, abort, should update packet stats too
      // logger.log('warn',"PacketParser: Packet with invalid length received.");
      console.log('XX! UDP.LEN:' + raw_udp.length + ' PayloadLen:' + length);
      return;
    } else {

    }

    // See if we know how to decode this particular type of packet
    var packetDef = this.findPacketDefinition(packetType, port);
    if (packetDef === 0) {
      // Uh-oh, can't decode this packet.
      // Throw an error and abort
      // logger.log('warn', "PacketParser: Got a packet of type "+packetType+" and don't know what to do with it.");
      return;
    } else {
       // Got a good packet
    }

    // Not a fan of the huge blocks of code in this if block but it works for now
    if (packetDef.DAQ === true) {
      var daqPacket = {'packetName': packetDef.Name, 'rxTime': (new Date()).getTime(), 'samples': [], 'dataType': packetDef.dataType, 'sequence': sequence, 'packetType': packetType};
      for (let i = 8; i < (raw_udp.length - 2); i += packetDef.dataSize) {
        switch (packetDef.dataType) {
          case 'uint8':daqPacket.samples.push(bin.bytesToUint8(raw_udp[i], true)); break;
          case 'int8':daqPacket.samples.push(bin.bytesToInt8(raw_udp[i], true)); break;
          case 'uint16':daqPacket.samples.push(bin.bytesToUint16(raw_udp[i], raw_udp[i + 1], true)); break;
          case 'int16':daqPacket.samples.push(bin.bytesToInt16(raw_udp[i], raw_udp[i + 1], true)); break;
          case 'uint32':daqPacket.samples.push(bin.bytesToUint32(raw_udp[i], raw_udp[i + 1],
                                  raw_udp[i + 2], raw_udp[i + 3], true)); break;
          case 'int32':daqPacket.samples.push(bin.bytesToInt32(raw_udp[i], raw_udp[i + 1],
                                  raw_udp[i + 2], raw_udp[i + 3], true)); break;
          case 'int64':daqPacket.samples.push(bin.bytesToInt64(raw_udp[i + 7], raw_udp[i + 6], raw_udp[i + 5], raw_udp[i + 4], raw_udp[i + 3], raw_udp[i + 2], raw_udp[i + 1], raw_udp[i + 0])); break;
          case 'uint64':daqPacket.samples.push(bin.bytesToUint64(raw_udp[i + 7], raw_udp[i + 6], raw_udp[i + 5], raw_udp[i + 4], raw_udp[i + 3], raw_udp[i + 2], raw_udp[i + 1], raw_udp[i + 0])); break;
          case 'float32':daqPacket.samples.push(bin.bytesToFloat32(raw_udp[i], raw_udp[i + 1],
                                  raw_udp[i + 2], raw_udp[i + 3], true)); break;
          case 'float64':daqPacket.samples.push(bin.bytesToFloat64(raw_udp[i + 7], raw_udp[i + 6],
                                  raw_udp[i + 5], raw_udp[i + 4],
                                  raw_udp[i + 3], raw_udp[i + 2],
                                  raw_udp[i + 1], raw_udp[i + 0])); break;
        }
      }

      for (let i = 0; i < this.daqPacketRXCallbacks.length; i++) {
        this.daqPacketRXCallbacks[i](daqPacket);
      }
    } else {
      var newDataParams = {
        'packetName': packetDef.Name,
        'packetType': packetDef.PacketType,
        'rxTime': (new Date()).getTime(), // Millis since 1970/1/1
        'parameters': []
      };

      var parseLoc = 8;
      var newParseLoc = 8;

      var looping = false;
      var loopingIndex = 1;
      var loopSuffix = '';
      var loopFieldCount = 0;

      for (let i = 0, len = packetDef.Parameters.length; i < len; i++) {
        var _newName = packetDef.Parameters[i];
        newParseLoc += packetDef.Parameters[i].size;

        if (newParseLoc > (length + 8)) {
          // Needs to be updated to handle looping
          // logger.log('warn','PacketParser: Error parsing packet, not long enough');
          break;
        }

        // Starting a loop set of fields
        if (packetDef.Parameters[i].beginLoop === true && looping === false) {
          looping = true;
          loopSuffix = 1;
        }

        if (looping === true && loopingIndex === 1) {
          loopFieldCount++;
        }

        if (looping === true) { loopSuffix = loopingIndex.toString() + ' '; }

        // Might put this switch statement in its own function so it's not gunking up the flow of this one so much
        switch (packetDef.Parameters[i].type) {
          case 'uint8':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToUint8(raw_udp[parseLoc], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'int8':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToInt8(raw_udp[parseLoc], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'uint16':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToUint16(raw_udp[parseLoc], raw_udp[parseLoc + 1], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'int16':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToInt16(raw_udp[parseLoc], raw_udp[parseLoc + 1], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'uint32':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToUint32(raw_udp[parseLoc], raw_udp[parseLoc + 1],
                                  raw_udp[parseLoc + 2], raw_udp[parseLoc + 3], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'int32':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToInt32(raw_udp[parseLoc], raw_udp[parseLoc + 1],
                                  raw_udp[parseLoc + 2], raw_udp[parseLoc + 3], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'uint64':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToUint64(raw_udp[parseLoc], raw_udp[parseLoc + 1],
                                  raw_udp[parseLoc + 2], raw_udp[parseLoc + 3],
                                  raw_udp[parseLoc + 4], raw_udp[parseLoc + 5],
                                  raw_udp[parseLoc + 6], raw_udp[parseLoc + 7], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'int64':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToInt64(raw_udp[parseLoc], raw_udp[parseLoc + 1],
                                  raw_udp[parseLoc + 2], raw_udp[parseLoc + 3],
                                  raw_udp[parseLoc + 4], raw_udp[parseLoc + 5],
                                  raw_udp[parseLoc + 6], raw_udp[parseLoc + 7], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'float32':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToFloat32(raw_udp[parseLoc], raw_udp[parseLoc + 1],
                                  raw_udp[parseLoc + 2], raw_udp[parseLoc + 3], true),
              'units': packetDef.Parameters[i].units});
            break;
          case 'float64':
            newDataParams.parameters.push({'name': packetDef.ParameterPrefix + loopSuffix + packetDef.Parameters[i].Name,
              'value': bin.bytesToFloat64(raw_udp[parseLoc + 7], raw_udp[parseLoc + 6],
                                  raw_udp[parseLoc + 5], raw_udp[parseLoc + 4],
                                  raw_udp[parseLoc + 3], raw_udp[parseLoc + 2],
                                  raw_udp[parseLoc + 1], raw_udp[parseLoc + 0]),
              'units': packetDef.Parameters[i].units});
            break;

          default: console.log('PacketParser: Error in packet definition, type unknown'); break;
        }
        parseLoc = newParseLoc;

        if (looping === true && packetDef.Parameters[i].endLoop === true) {
          i -= loopFieldCount;
          loopingIndex++;
        }
      }

      newDataParams.crc = bin.bytesToUint16(raw_udp[raw_udp.length - 2], raw_udp[raw_udp.length - 1]);
      newDataParams.sequence = sequence;
      newDataParams.node = packetDef.Node;

      for (let i = 0; i < this.packetRXCallbacks.length; i++) {
        this.packetRXCallbacks[i](newDataParams);
      }
    }
  }
}

module.exports = function () {
  return new PacketParser();
};
