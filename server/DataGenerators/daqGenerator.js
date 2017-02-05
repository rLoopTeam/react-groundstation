
const commConfig = require('../../config/commConfig');
const dgram = require('dgram');
const bin = require('../udp/binary.js');
const crc = require('../udp/crc.js');

class daqGenerator {
  constructor () {
    this.daqTypes = [];
    this.sequences = [];
    this.makeNewPacket = this.makeNewPacket.bind(this);
  }

  simulateDAQ (packetType, sampleType, sampleQuantity, timeout, port)  {
    this.sequences.push({'type': packetType, 'sequence': 0, 'start': 0});
      setInterval(function () {
          this.makeNewPacket(sampleType, packetType, sampleQuantity, port);
      }.bind(this), timeout);
  }

  makeNewPacket (sampleType, packetType, sampleQuantity, port) {
    var payload = [];
    var index;

    for (var i = 0; i < this.sequences.length; i++) {
      if (this.sequences[i].type === packetType) {
        index = i;
        break;
      }
    }

    // should do something more creativ but eh
    for (var i = 0; i < sampleQuantity; i++) {
      switch (sampleType) {
        case 'uint8':payload.push.apply(payload, bin.uint8ToBytes(i + this.sequences[index].start, true)); break;
        case 'int8':payload.push.apply(payload, bin.int8ToBytes(i + this.sequences[index].start, true)); break;
        case 'uint16':payload.push.apply(payload, bin.uint16ToBytes(i + this.sequences[index].start, true)); break;
        case 'int16':payload.push.apply(payload, bin.int16ToBytes(i + this.sequences[index].start, true)); break;
        case 'uint32':payload.push.apply(payload, bin.uint32ToBytes(i + this.sequences[index].start, true)); break;
        case 'int32':payload.push.apply(payload, bin.int32ToBytes(i + this.sequences[index].start, true)); break;
        case 'float32':payload.push.apply(payload, bin.float32ToBytes(i + this.sequences[index].start, true)); break;
        case 'float64':payload.push.apply(payload, bin.float64ToBytes(i + this.sequences[index].start, true)); break;
      }
    }
    this.sequences[index].start += sampleQuantity;

      var testPacket = this.makeSafetyUDP(this.sequences[index].sequence++, packetType, payload);
      var packetBuf = new Buffer(testPacket);
      var client = dgram.createSocket({type: 'udp4', reuseAddr: true});
      client.bind();
      client.on('listening', function () {
          client.setBroadcast(true);
          client.send(packetBuf, 0, packetBuf.length, port, '255.255.255.255', function (err, bytes) {
              client.close();
          });
      });
  }

  makeSafetyUDP (sequence, packetType, payload) {
      var finalPacket = [];

      finalPacket.push.apply(finalPacket, bin.uint32ToBytes(sequence, true)); // Sequence
      finalPacket.push.apply(finalPacket, bin.uint16ToBytes(packetType, true)); // PacketType
      finalPacket.push.apply(finalPacket, bin.uint16ToBytes(0, true)); // Length

      finalPacket.push.apply(finalPacket, payload);

      var packetLength = payload.length; // Strictly the payload. Header & CRC not included
      finalPacket[6] = bin.uint16ToBytes(packetLength, true)[0];
      finalPacket[7] = bin.uint16ToBytes(packetLength, true)[1];

      finalPacket.push.apply(finalPacket, bin.uint16ToBytes(crc.u16SWCRC__CRC(finalPacket, finalPacket.length), true));

      return finalPacket;
  }
}

module.exports = function () {
  return new daqGenerator();
};
