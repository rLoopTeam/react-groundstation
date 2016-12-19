/*
* Pod simulator
* -------------
* This file contains a server which can send and receive data via udp.
* Using this, we can simulate data coming and going from the pod.
*/
var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4');
var config = require('../config');

/*
* UDP data sender
*/
function udpTX(){
	var message = new Buffer('Telemetry data ');
	var client = dgram.createSocket('udp4');
	client.send(message, 0, message.length, config.GroundstationPort, config.GroundstationHost, function(err, bytes) {
	    if (err) throw err;
	    console.log("POD - SENT: " + config.GroundstationHost + ':' + config.GroundstationPort +' - ' + message);
	    client.close();
	});
}

/*
* UDP data receiver
*/
udpServer.on('message', function (message, remote) {
    console.log("POD - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);
});

udpServer.bind(config.PodPort, config.PodHost);


