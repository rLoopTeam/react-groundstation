const commConfig = require('../../config/commConfig');
const dgram = require('dgram');

/*
* UDP data sender
*/
// var txPort = 9100; //3003; // This points to the Pod's UDP listener port
// var txHost = '127.0.0.1';

txPort = commConfig.PodRxPort;//send from server to pod on pod's receiving port
txHost = commConfig.PodRxHost;//send from server to pod on pod's receiving host ip

module.exports = {
    sendMessage: function (messageStr){
        var message = new Buffer(messageStr);
        var client = dgram.createSocket('udp4');
        client.send(message, 0, message.length, txPort, txHost, function(err, bytes) {
            if (err) throw err;
            console.log("GROUNSTATION UDP - SENT: " +  txHost + ':' + txPort +' - ' + message);
            client.close();
        });
    }
}