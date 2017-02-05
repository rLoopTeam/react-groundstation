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
const packetDefinitions = require('../../config/packetDefinitions.js');

class packetStats {
  constructor (rtDataStore)  {
    this.rtDataStore = rtDataStore;
    this.rxPackets = [];
    this.daqPackets = [];
    this.gotPacketType.bind(this);
    this.updateRtDataStore = this.updateRtDataStore.bind(this);
    this.nodeTimes = [];
    setInterval(this.updateRtDataStore, 60);
  }

  gotPacketType (packetType, CRC, sequence, node) {
    var found = false;
    for (var i = 0; i < this.rxPackets.length; i++) {
      if (this.rxPackets[i].type == packetType.toString(16))      {
        this.rxPackets[i].count++;
        this.rxPackets[i].crc = CRC;
        if (sequence - this.rxPackets[i].lastSequence > 1) {
          this.rxPackets[i].sequenceJumps += sequence - this.rxPackets[i].lastSequence - 1;
        }
        this.rxPackets[i].lastSequence = sequence;
        found = true;
        break;
      }
    }
    if (found === false)      { this.rxPackets.push({'type': packetType.toString(16), 'count': 1, 'lastSequence': sequence, 'sequenceJumps': 0}); }

    // Records last time a node was seen
    found = false;
    for (var i = 0; i < this.nodeTimes.length; i++)    {
      if (this.nodeTimes[i].name == node)      {
        this.nodeTimes[i].lastSeen = (new Date()).getTime();
        found = true;
        break;
      }
    }
    if (found === false) {
      this.nodeTimes.push({'name': node, 'lastSeen': (new Date()).getTime()});
    }
  }

  loggedPacketType (packetType)  {
    for (var i = 0; i < this.daqPackets.length; i++) {
      if (this.daqPackets[i].type == packetType.toString(16))      {
        this.daqPackets[i].count++;
        return;
      }
    }
    this.daqPackets.push({'type': packetType.toString(16), 'count': 1});
  }

  updateRtDataStore () {
    var newData = {'packetName': 'Packet Stats', 'packetType': '0', 'rxTime': 0, 'parameters': []};
    for (var i = 0; i < this.rxPackets.length; i++) {
      newData.parameters.push({'name': 'Packet Rx Count ' + this.rxPackets[i].type, 'value': this.rxPackets[i].count, 'units': 'packets'},
                  {'name': 'Packet Last CRC ' + this.rxPackets[i].type, 'value': this.rxPackets[i].crc, 'units': ''},
                  {'name': 'Packet Sequence Jumps ' + this.rxPackets[i].type, 'value': this.rxPackets[i].sequenceJumps, 'units': ''}
                  );
    }
    for (var i = 0; i < this.daqPackets.length; i++) {
      newData.parameters.push({'name': 'Packet DAQ Count ' + this.daqPackets[i].type, 'value': this.daqPackets[i].count, 'units': 'packets'}
                  );
    }

    var currentTime = (new Date()).getTime();
    for (var i = 0; i < this.nodeTimes.length; i++) {
      if ((currentTime - this.nodeTimes[i].lastSeen) < 2000) // 2 seconds
      {
        // Node has been seen in the past 2 seconds
        newData.parameters.push({'name': this.nodeTimes[i].name + ' network status', 'value': 'Online', 'units': ''});
      } else {
        // Node has not been seen in the past 2 seconds
        newData.parameters.push({'name': this.nodeTimes[i].name + ' network status', 'value': 'Offline', 'units': ''});
      }
    }
    this.rtDataStore.insertDataPacket(newData);
  }
}

module.exports = function (rtDataStore) {
  return new packetStats(rtDataStore);
};
