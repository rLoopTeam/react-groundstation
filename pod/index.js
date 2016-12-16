/*
* Pod simulator
* -------------
* This file contains a server which can send and receive data via udp.
* Using this, we can simulate data coming and going from the pod.
*/
var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4');
var updateConfig = require('./updateConfig');


/*
* UDP data sender
*/
var SENDPORT = 3002; // point these details to the GS OR broadcast (might require some additional settings)
var SENDHOST = '127.0.0.1';

function sendDataContinuously(){
	setTimeout(function(){
		var message = new Buffer('Telemetry data ');
		var client = dgram.createSocket('udp4');
		client.send(message, 0, message.length, SENDPORT, SENDHOST, function(err, bytes) {
		    if (err) throw err;
		    console.log("POD - SENT: " + 	SENDHOST + ':' + SENDPORT +' - ' + message);
		    client.close();
		});
		sendDataContinuously()
	}, updateConfig())
}
sendDataContinuously();


/*
* UDP data receiver
*/
var udpPORT = 3003; // details of the pod itself 
var ddpHOST = '127.0.0.1';

udpServer.on('message', function (message, remote) {
    console.log("POD - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);
});

udpServer.bind(udpPORT, ddpHOST);
