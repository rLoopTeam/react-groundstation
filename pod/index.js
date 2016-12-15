var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4');
var updateConfig = require('./updateConfig');


/*
* Send: This could be on a separate machine. It represents code in the Pod sending telemetry to the groundstation
*/
var SENDPORT = 3003; // point these details to the GS above OR broadcast (might require some additional settings)
var SENDHOST = '127.0.0.1';
var go = false;

function sendData() {
	if(!go)
		setTimeout(function(){go = true}, 2000)
	else
	{
		go();
	}

	function go(){
		setTimeout(function(){
			var message = new Buffer('Test parameter data ');
			var client = dgram.createSocket('udp4');
			client.send(message, 0, message.length, SENDPORT, SENDHOST, function(err, bytes) {
			    if (err) throw err;
			    //console.log('UDP message sent to ' + HOST +':'+ PORT);
			    client.close();
			});
			sendData()
		}, updateConfig())
	}
}
sendData();

module.exports = udpServer;