const bin = require('./udp/binary.js');
const makeSafetyUDP = require('../udp/helpers.js').makeSafetyUDP;

function makeNewPacket () {
  var payload = [];

  payload.push.apply(payload, bin.uint8ToBytes(20, true));
  payload.push.apply(payload, bin.int8ToBytes(-20, true));
  payload.push.apply(payload, bin.uint16ToBytes(50, true));
  payload.push.apply(payload, bin.int16ToBytes(-1000, true));
  payload.push.apply(payload, bin.uint32ToBytes(100000, true));
  payload.push.apply(payload, bin.int32ToBytes(-100000, true));
  payload.push.apply(payload, bin.float32ToBytes(12348.23, true));
  payload.push.apply(payload, bin.float64ToBytes((new Date()).getTime(), true));

  var testPacket = makeSafetyUDP(0x46, 0x5000, payload);

  return testPacket;
}

module.exports = function (packetParser) {
  var payload = [];

  setInterval(function () {
    packetParser.gotNewPacket(makeNewPacket());
  }, 30);
};
