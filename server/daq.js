fs = require('fs');


class daq {
	constructor(packetStats)
	{
		this.isLogging = false;
		this.gotNewPacket = this.gotNewPacket.bind(this);
		this.packetStats = packetStats;
	}
	
	gotNewPacket(packet)
	{
		if(this.isLogging === false)
			return;
		
		var filename = "logs/" + packet.packetName + ".csv";
		//just no need for this
		var toWrite = packet.rxTime +", ";

		
		for(var i = 0;i<packet.parameters.length-1;i++){
			toWrite = toWrite + packet.parameters[i].value + ",";
		}
		
		toWrite = toWrite + packet.parameters[packet.parameters.length-1].value + "\n";

		//TODO: reuse stream instead of opening and closing it all the time
		fs.open(filename, 'a', 666, function( e, id ) {
		  fs.write( id, toWrite, null, 'utf8', function(){
			fs.close(id, function(){

			});
		  });
		});
		
		this.packetStats.loggedPacketType(packet.packetType);
	}
}

module.exports = function (packetStats){
    return new daq(packetStats);
};