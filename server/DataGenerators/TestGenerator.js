const commConfig = require('../../config/commConfig.js');
var dgram = require('dgram');
const udpHelpers = require('../udp/helpers.js');

module.exports = function (type, payload, node) {
  var sequence = 0;

  var port = 0;

  for (var i = 0; i < commConfig.RXServers.length; i++) {
    if (commConfig.RXServers[i].hostName === node) {
      port = commConfig.RXServers[i].port;
    }
  }

  setInterval(function () {
    udpHelpers.sendPacket(sequence, type, payload, port);
    sequence += 1;
  }, 30);
};
