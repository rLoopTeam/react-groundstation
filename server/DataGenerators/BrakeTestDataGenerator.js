const bin = require('../udp/binary.js');
const makeSafetyUDP = require('../udp/helpers.js').makeSafetyUDP;

class BrakeTestDataGenerator {
  constructor (packetParser) {
    this.SendNewPacketToGS = this.SendNewPacketToGS.bind(this);
    this.packetParser = packetParser;
    this.sequence = 0;
    setInterval(this.SendNewPacketToGS, 30);
  }

  SendNewPacketToGS () {
    var payload = [];

    // Accel 2
    payload.push.apply(payload, bin.uint8ToBytes(5, true)); // Fault Flags
    payload.push.apply(payload, bin.float32ToBytes(90.1, true)); // Raw X Axis data
    payload.push.apply(payload, bin.float32ToBytes(2.1, true)); // Raw X Axis data
    payload.push.apply(payload, bin.uint8ToBytes(5, true)); // Fault Flags
    payload.push.apply(payload, bin.uint8ToBytes(52, true)); // Fault Flags
    payload.push.apply(payload, bin.uint8ToBytes(51, true)); // Fault Flags
    payload.push.apply(payload, bin.uint8ToBytes(25, true)); // Fault Flags
    payload.push.apply(payload, bin.float32ToBytes(12.34, true)); // Raw X Axis data
    payload.push.apply(payload, bin.float32ToBytes(120.1, true)); // Raw X Axis data
    payload.push.apply(payload, bin.float32ToBytes(3.2, true)); // Raw X Axis data
    payload.push.apply(payload, bin.float32ToBytes(2.4, true)); // Raw X Axis data
    payload.push.apply(payload, bin.int16ToBytes(1024, true)); // Raw Z Axis data
    payload.push.apply(payload, bin.int16ToBytes(23, true)); // Raw Z Axis data
    payload.push.apply(payload, bin.int16ToBytes(124, true)); // Raw Z Axis data
    payload.push.apply(payload, bin.int16ToBytes(7024, true)); // Raw Z Axis data

    this.packetParser.gotNewPacket(makeSafetyUDP(this.sequence, 0x0000, payload));

    this.sequence = this.sequence + 1;
  }
}

module.exports = function (packetParser) {
  return new BrakeTestDataGenerator(packetParser);
};
