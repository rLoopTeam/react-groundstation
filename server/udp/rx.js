const commConfig = require('../../config/commConfig');
const dgram = require('dgram');
var Promise = require('promise');

/*
* UDP data receiver
*/
// var rxPort = 9100; //3002; // Groundsation's udp port
// var rxHost = '127.0.0.1';

rxPort = commConfig.PodTxPort;//receive from server to pod on pod's sending port
rxHost = commConfig.PodTxHost;//receive from server to pod on pod's sending host ip

var udpServer = dgram.createSocket('udp4');
udpServer.bind(rxPort, rxHost);


module.exports = {
    server: function(){
        return udpServer
    },
    listeningForUdp: false,
    setHost: function (ip) {
        rxHost = ip;
    },
    setPort: function (port) {
        rxPort = port;
    },
    updateConnectionData: function (params) {
       var _this = this;
       _this.setPort(params.port);
       _this.setHost(params.ip);
       
       var promise = new Promise(function (resolve, reject) {
           udpServer.close(function () {
               _this.listeningForUdp = false;
               udpServer = dgram.createSocket('udp4');
               udpServer = udpServer.bind(rxPort, rxHost);
               resolve();
            })
       });
       return promise;
    }
};