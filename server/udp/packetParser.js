
/*------------
    This module should:
		-receive packets from the udp server
		-verify packet checksum
		-read the config file to determine how to parse the packet types
		-read the config file to determine how to parse fields in a given packet type
		-Enums & bitfields are not decoded here.
		-Provide a AddSubscriber() function so data stores can add a callback to receive new decoded parameter data
------------*/

/*
* UDP data format from the pod:
* [u32 Sequence][u16 PacketType][u16 Length]...hardware specific data e.g. accelerometers...[CRC16]
* e.g. [u32 Sequence][u16 PacketType][u16 Length][u32 Flags0][u16 X0][u16 Y0][u16 Z0][u32 Flags1][u16 X1][u16 Y1][u16 Z1][u16 CRC16]
*/
const bin = require('./binary.js');
const packetDefinitions = require('../../config/packetDefinitions.js');

class PacketParser{
	constructor()
	{
		this.date = new Date();
		this.gotNewPacket = this.gotNewPacket.bind(this);
		this.addPacketLisenter = this.addPacketListener.bind(this);
		this.packetDefinitions = packetDefinitions.packetDefinitions;
		this.packetRXCallbacks = [];
	}

	addPacketListener(cb)
	{
		this.packetRXCallbacks.push(cb);
	}
	
	verifyCRC(raw_udp)
	{
		var crc = bin.bytesToUint16(raw_udp[raw_udp.length - 2], raw_udp[raw_udp.length - 1]);
		return true;
	}

	findPacketDefinition(packetType)
	{
		for(var i = 0, len = this.packetDefinitions.length; i<len; i++)
		{
			if(this.packetDefinitions[i].PacketType == packetType)
			{
				return this.packetDefinitions[i];
			}
		}
		
		return 0;
	}

	logPacket(packet){
		data = ''
		for(var i = 0, len = packet.Parameters.length; i<len; i++){
			if (i > 0){
				data = data + ","
				data = data + packet.Parameters[i]
			}
		}
		logger.log("info", data)
	}

	gotNewPacket (raw_udp) {
		//Good for testing, should just have some stats:
		//    how many good
		//    bad packets
		//    sequence misses

		var logger = this.logger;
		
		if(this.verifyCRC(raw_udp))
		{
			//Woohoo! Update packet stats that we got a good one
		}else{
			//Uh - oh, update stats that we lost one, abort parsing
			console.log("packetparser.js: Warn, CRC Failure");
			return;
		}
		
		var sequence = bin.bytesToUint32(raw_udp[0], raw_udp[1], raw_udp[2], raw_udp[3], true);
		var packetType = bin.bytesToUint16(raw_udp[4], raw_udp[5], true);
		var length = bin.bytesToUint16(raw_udp[6], raw_udp[7], true);
		
		
		if((length+10) !== raw_udp.length)
		{
			//Packet is the wrong length, abort, should update packet stats too
			//logger.log('warn',"PacketParser: Packet with invalid length received.");
			console.log("XX! UDP.LEN:" + raw_udp.length + " PayloadLen:" + length);
			return;
		}
		else {
			
		}
			
		
		//See if we know how to decode this particular type of packet
		var packetDef = this.findPacketDefinition(packetType);
		if(packetDef === 0)
		{
			//Uh-oh, can't decode this packet.
			//Throw an error and abort
			//logger.log('warn', "PacketParser: Got a packet of type "+packetType+" and don't know what to do with it.");
			return;
		}
		else
		{
		 	//Got a good packet
		}
		
		var newDataParams = {
			'packetName':packetDef.Name,
			'packetType':packetDef.PacketType,
			'rxTime':this.date.getTime(), //Millis since 1970/1/1
			'parameters':[]
			}
		
		var parseLoc = 8;
		var newParseLoc = 8;
		
		for(var i = 0, len = packetDef.Parameters.length;i<len;i++){
			var newName = packetDef.Parameters[i]
			newParseLoc += packetDef.Parameters[i].size;
			
			if(newParseLoc > (length+8)){
				//uh oh, ran out of packet
				logger.log('warn','PacketParser: Error parsing packet, not long enough');
			}
			
			//Might put this switch statement in its own function so it's not gunking up the flow of this one so much
			switch(packetDef.Parameters[i].type){
				case 'uint8':
							newDataParams.parameters.push({'name':packetDef.ParameterPrefix+packetDef.Parameters[i].Name,
														'value':bin.bytesToUint8(raw_udp[parseLoc],true),
														'units':packetDef.Parameters[i].units});
							break;
				case 'int8': 
							newDataParams.parameters.push({'name':packetDef.ParameterPrefix+packetDef.Parameters[i].Name,
														'value':bin.bytesToInt8(raw_udp[parseLoc],true),
														'units':packetDef.Parameters[i].units});
							break;
				case 'uint16': 
							newDataParams.parameters.push({'name':packetDef.ParameterPrefix+packetDef.Parameters[i].Name,
														'value':bin.bytesToUint16(raw_udp[parseLoc], raw_udp[parseLoc+1],true),
														'units':packetDef.Parameters[i].units});
							break;
				case 'int16': 
							newDataParams.parameters.push({'name':packetDef.ParameterPrefix+packetDef.Parameters[i].Name,
														'value':bin.bytesToInt16(raw_udp[parseLoc], raw_udp[parseLoc+1],true),
														'units':packetDef.Parameters[i].units});
							break;
				case 'uint32':
							newDataParams.parameters.push({'name':packetDef.ParameterPrefix+packetDef.Parameters[i].Name,
														'value':bin.bytesToUint32(raw_udp[parseLoc], raw_udp[parseLoc+1],
																raw_udp[parseLoc+2], raw_udp[parseLoc+3],true),
														'units':packetDef.Parameters[i].units});
							break;
				case 'int32': 
							newDataParams.parameters.push({'name':packetDef.ParameterPrefix+packetDef.Parameters[i].Name,
														'value':bin.bytesToInt32(raw_udp[parseLoc], raw_udp[parseLoc+1],
																raw_udp[parseLoc+2], raw_udp[parseLoc+3],true),
														'units':packetDef.Parameters[i].units});
							break;
				case 'uint64': 
							logger.log('error',"PacketParser: JS can't do 64-bit integers!");
							break;
				case 'int64':
							logger.log('error',"PacketParser: JS can't do 64-bit integers!");
							break;
				case 'float32': 
							newDataParams.parameters.push({'name':packetDef.ParameterPrefix+packetDef.Parameters[i].Name,
														'value':bin.bytesToFloat32(raw_udp[parseLoc], raw_udp[parseLoc+1],
																raw_udp[parseLoc+2], raw_udp[parseLoc+3],true),
														'units':packetDef.Parameters[i].units});
							break;
				case 'float64':	
							newDataParams.parameters.push({'name':packetDef.ParameterPrefix+packetDef.Parameters[i].Name,
														'value':bin.bytesToFloat64(raw_udp[parseLoc+7], raw_udp[parseLoc+6],
																raw_udp[parseLoc+5], raw_udp[parseLoc+4],
																raw_udp[parseLoc+3], raw_udp[parseLoc+2],
																raw_udp[parseLoc+1], raw_udp[parseLoc+0]),
														'units':packetDef.Parameters[i].units});
							break;
				
				default: logger.log('warn', "PacketParser: Error in packet definition, type unknown"); break;
			}
			parseLoc = newParseLoc;
		}
		
		newDataParams.crc = bin.bytesToUint16(raw_udp[raw_udp.length - 2], raw_udp[raw_udp.length - 1]);
		newDataParams.sequence = sequence;
		
		for(var i = 0;i<this.packetRXCallbacks.length;i++)
		{
			this.packetRXCallbacks[i](newDataParams);
		}

	}
}

module.exports = function(){
	return new PacketParser();
};