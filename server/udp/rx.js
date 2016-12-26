const commConfig = require('../../config/commConfig');
const dgram = require('dgram');
var Promise = require('promise');

/*
* UDP data receiver
*/
// var txPort = 9100; //3002; // Groundsation's udp port
// var txHost = '127.0.0.1';

txPort = commConfig.PodTxPort;//receive from server to pod on pod's sending port
txHost = commConfig.PodTxHost;//receive from server to pod on pod's sending host ip

var udpServer = dgram.createSocket('udp4');
udpServer.bind(txPort, txHost);


module.exports = {
     server: udpServer,
     listeningForUdp: false,
     setHost: function (ip) {
         txHost = ip;
     },
     setPort: function (port) {
         txPort = port;
     },
     updateConnectionData: function (params) {
        this.setPort(params.port);
        this.setHost(params.ip);
        
        var promise = new Promise(function (resolve, reject) {
            udpServer.close(function () {
                this.listeningForUdp = false;
                udpServer = dgram.createSocket('udp4');
                udpServer = udpServer.bind(txPort, txHost);
                resolve();
            })
        });
        return promise;
     }
};