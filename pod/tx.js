/*
* Pod simulator
* -------------
* This file contains a server which can send data via udp.
* Using this, we can simulate data going from the pod.
*/
var dgram = require('dgram');
var config = require('../config/commConfig');

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