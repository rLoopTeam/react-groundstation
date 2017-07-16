const bin = require('./udp/binary.js');
const makeSafetyUDP = require('../udp/helpers.js').makeSafetyUDP;

module.exports = function (logger) {
  var packetParser = require('./udp/packetParser')(logger);

  var payload = [];

  payload.push.apply(payload, bin.uint8ToBytes(20, true));
  payload.push.apply(payload, bin.int8ToBytes(-20, true));
  payload.push.apply(payload, bin.uint16ToBytes(1000, true));
  payload.push.apply(payload, bin.int16ToBytes(-1000, true));
  payload.push.apply(payload, bin.uint32ToBytes(100000, true));
  payload.push.apply(payload, bin.int32ToBytes(-100000, true));
  payload.push.apply(payload, bin.float32ToBytes(12348.23, true));
  payload.push.apply(payload, bin.float64ToBytes(12348.23, true));

  var testPacket = makeSafetyUDP(0x46, 0x5000, payload);

  console.log('Packet Data: ');
  for (var i = 0; i < testPacket.length; i++) {
    console.log(testPacket[i].toString(16));
  }

  console.log('--------');

  console.log(JSON.stringify(packetParser.gotNewPacket(testPacket)));
};
