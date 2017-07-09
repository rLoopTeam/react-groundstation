
const commConfig = require('../../config/commConfig');
const dgram = require('dgram');
const bin = require('../udp/binary.js');
const makeSafetyUDP = require('../udp/helpers.js').makeSafetyUDP;

class DAQGenerator {
  constructor () {
    this.daqTypes = [];
    this.sequences = [];
    this.makeNewPacket = this.makeNewPacket.bind(this);
  }

  simulateDAQ (packetType, sampleType, sampleQuantity, timeout, port) {
    this.sequences.push({'type': packetType, 'sequence': 0, 'start': 0});
    setInterval(function () {
      this.makeNewPacket(sampleType, packetType, sampleQuantity, port);
    }.bind(this), timeout);
  }

  makeNewPacket (sampleType, packetType, sampleQuantity, port) {
    var payload = [];
    var index;

    for (let i = 0; i < this.sequences.length; i++) {
      if (this.sequences[i].type === packetType) {
        index = i;
        break;
      }
    }

    // should do something more creativ but eh
    for (let i = 0; i < sampleQuantity; i++) {
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

    var testPacket = makeSafetyUDP(this.sequences[index].sequence++, packetType, payload);
    var packetBuf = new Buffer(testPacket);
    var client = dgram.createSocket({type: 'udp4', reuseAddr: true});
    client.bind();
    client.on('listening', function () {
      client.setBroadcast(true);
      client.send(packetBuf, 0, packetBuf.length, port, '255.255.255.255', function (_err, bytes) {
        client.close();
      });
    });
  }
}

module.exports = function () {
  return new DAQGenerator();
};
