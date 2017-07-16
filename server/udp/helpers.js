const bin = require('./binary.js');
const crc = require('./crc.js');
const dgram = require('dgram');
const commConfig = require('../../config/commConfig.js');

function makeSafetyUDP (sequence, packetType, payload) {
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

function makeCommandPacket (PacketType, block1, block2, block3, block4) {
  var payload = [];

  payload.push.apply(payload, bin.uint32ToBytes(block1, true));
  payload.push.apply(payload, bin.uint32ToBytes(block2, true));
  payload.push.apply(payload, bin.uint32ToBytes(block3, true));
  payload.push.apply(payload, bin.uint32ToBytes(block4, true));
  // TODO: reincorporate this all into a class and store the sequence number to increment on each command
  var sequenceNum = 0;
  var commandPacket = makeSafetyUDP(sequenceNum, PacketType, payload);

  return commandPacket;
}

function sendPacket (sequence, type, payload, port) {
  var testPacket = makeSafetyUDP(sequence, type, payload);
  var packetBuf = new Buffer(testPacket);
  var client = dgram.createSocket({type: 'udp4', reuseAddr: true});
  client.bind();
  client.on('listening', function () {
    client.setBroadcast(true);
    client.send(packetBuf, 0, packetBuf.length, port, commConfig.testDataGeneratorTargetHost, function (_err, bytes) {
      client.close();
    });
  });

  return testPacket;
}

module.exports = {
  makeSafetyUDP: makeSafetyUDP,
  makeCommandPacket: makeCommandPacket,
  sendPacket: sendPacket
};
