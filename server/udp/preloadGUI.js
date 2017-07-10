// Preload some dummy packets so the GUI loads up a bit nicer.
// Very similar to TestPayload
const bin = require('./udp/binary');
const commConfig = require('../config/commConfig.js');
var dgram = require('dgram');
const makeSafetyUDP = require('../udp/helpers.js').makeSafetyUDP;

module.exports = function () {
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

  function preloadPowerNodes () {
    var BMSStreaming = [];
    BMSStreaming.push.apply(BMSStreaming, bin.uint32ToBytes(0, true)); // fault flags
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // temp sensor state
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // Charger state
    BMSStreaming.push.apply(BMSStreaming, bin.uint16ToBytes(0, true)); // num temp sensors
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // highest temp
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // average temp
    BMSStreaming.push.apply(BMSStreaming, bin.uint16ToBytes(0, true)); // highest sensor index
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // pack voltage
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // cell highest voltage
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // lowest cell voltage
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // bms boards temp
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // node pressure
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // node temp

    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 10
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 2
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 3
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 4
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 5
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 6
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 7
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 8
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 9
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 10
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 11
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 12
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 13
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 14
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 15
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 16
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 17
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // module voltage 18

    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID1
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID2
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID3
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID4
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID5
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID6
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID7
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID8
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID9
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID10
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID11
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID12
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID13
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID14
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID15
    BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(0, true)); // BMS ID16

    BMSStreaming.push.apply(BMSStreaming, bin.uint32ToBytes(0, true)); // Volts Update Count
    BMSStreaming.push.apply(BMSStreaming, bin.uint32ToBytes(0, true)); // Temp Scan Count
    BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(0, true)); // Pack Current

    sendPacket(0, 0x3401, BMSStreaming, 9110);
    sendPacket(0, 0x3401, BMSStreaming, 9111);
  }

  function GUIPreload (rtDataStore) {
    preloadPowerNodes();
  }

  return {
    GUIPreload
  };
};
