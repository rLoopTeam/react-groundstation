const bin = require('../udp/binary.js');
const crc = require('../udp/crc.js');

class TempSensorsGenerator {
  constructor (packetParser) {
    this.SendNewPacketToGS = this.SendNewPacketToGS.bind(this);
    this.packetParser = packetParser;
    this.sequence = 0;
    setInterval(this.SendNewPacketToGS, 30);
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

  SendNewPacketToGS () {
    var payload = [];

    var NumOfSensors = 20;

    payload.push.apply(payload, bin.uint16ToBytes(NumOfSensors, true)); // Number of temperature sensors
    payload.push.apply(payload, bin.uint16ToBytes(0, true)); // Spare slot

    for (var i = 0; i < NumOfSensors; i++)		{
      payload.push.apply(payload, bin.float32ToBytes(23 + i / 10, true));
    }

    this.packetParser.gotNewPacket(this.makeSafetyUDP(this.sequence, 0x3201, payload));

    this.sequence = this.sequence + 1;
  }
}

module.exports = function (packetParser) {
  return new TempSensorsGenerator(packetParser);
};
