// these are the details of the GS backend
var PORT = 3003; 
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

/*
* Listen: This is the receiving point of the groundstation
*/
server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});

server.bind(PORT, HOST);


/*
* Send: This could be on a separate machine. It represents code in the Pod sending telemetry to the groundstation
*/
var SENDPORT = 3003; // point these details to the GS above OR broadcast (might require some additional settings)
var SENDHOST = '127.0.0.1';

function sendData() {
	setTimeout(function(){
		var message = new Buffer('Test parameter data ');
		var client = dgram.createSocket('udp4');
		client.send(message, 0, message.length, SENDPORT, SENDHOST, function(err, bytes) {
		    if (err) throw err;
		    //console.log('UDP message sent to ' + HOST +':'+ PORT);
		    client.close();
		});
		sendData()
	}, 500)
}
sendData();