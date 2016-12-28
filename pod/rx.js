/*
* Pod simulator
* -------------
* This file contains a server which can receive data via udp.
* Using this, we can simulate data coming into the pod.
*/
var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4');
var config = require('../config/commConfig');

/*
* UDP data receiver
*/
udpServer.on('message', function (message, remote) {
    console.log("POD - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);
});

udpServer.bind(config.PodRxPort, config.PodRxHost);
