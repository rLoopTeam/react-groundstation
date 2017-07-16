const bin = require('../udp/binary.js');
const makeSafetyUDP = require('../udp/helpers.js').makeSafetyUDP;

class TempSensorsGenerator {
  constructor (packetParser) {
    this.SendNewPacketToGS = this.SendNewPacketToGS.bind(this);
    this.packetParser = packetParser;
    this.sequence = 0;
    setInterval(this.SendNewPacketToGS, 30);
  }

  SendNewPacketToGS () {
    var payload = [];

    var NumOfSensors = 20;

    payload.push.apply(payload, bin.uint16ToBytes(NumOfSensors, true)); // Number of temperature sensors
    payload.push.apply(payload, bin.uint16ToBytes(0, true)); // Spare slot

    for (var i = 0; i < NumOfSensors; i++) {
      payload.push.apply(payload, bin.float32ToBytes(23 + i / 10, true));
    }

    this.packetParser.gotNewPacket(makeSafetyUDP(this.sequence, 0x3201, payload));

    this.sequence = this.sequence + 1;
  }
}

module.exports = function (packetParser) {
  return new TempSensorsGenerator(packetParser);
};
