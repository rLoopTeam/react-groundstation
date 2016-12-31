var dgram = require('dgram');

/*
* UDP data receiver
*/

class udpServer {
	constructor(port, ip, name, rxCallback)
	{
		this.udpServer = dgram.createSocket({type: 'udp4', reuseAddr: true});
		this.rxCallback = rxCallback;
		
		this.udpServer.on('listening', function () {
			  var address = this.udpServer.address();
			  console.log('UDP Client listening on ' + address.address + ":" + address.port);
		}.bind(this));
  
		this.udpServer.on('message', function (message, remote) {   
			console.log("Got a UDP message!"); //TODO Remove once everyone has verified it's working.
			this.rxCallback(message);
		}.bind(this));
		
		this.udpServer.on('disconnect', function(){
			udpServer.bind(port, function() {
				this.udpServer.setBroadcast(true);
			}.bind(this));
		}.bind(this));
		
		this.udpServer.bind(port, function() {
			this.udpServer.setBroadcast(true);
		}.bind(this));
	}
}

module.exports = function (port, ip, name, rxCallback){
    return new udpServer(port, ip, name, rxCallback);
};