const commConfig = require('../../config/commConfig.js');
var dgram = require('dgram');
const makeSafetyUDP = require('../udp/helpers.js').makeSafetyUDP;

function makeNewPacket (sequence, type, payload, port) {
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

module.exports = function (type, payload, node) {
  var sequence = 0;

  var port = 0;

  for (var i = 0; i < commConfig.RXServers.length; i++) {
    if (commConfig.RXServers[i].hostName === node) {
      port = commConfig.RXServers[i].port;
    }
  }

  setInterval(function () {
    makeNewPacket(sequence, type, payload, port);
    sequence += 1;
  }, 30);
};
