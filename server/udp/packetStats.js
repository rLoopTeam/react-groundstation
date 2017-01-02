
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

class packetStats{
	constructor(rtDataStore)
	{
		this.rtDataStore = rtDataStore;
		this.rxPackets = [];
		this.gotPacketType.bind(this);
		this.updateRtDataStore = this.updateRtDataStore.bind(this);
		
		setInterval(this.updateRtDataStore ,30);
	}

	gotPacketType(packetType, CRC){
		for(var i = 0;i<this.rxPackets.length;i++){
			if(this.rxPackets[i].type == packetType.toString(16))
			{
				this.rxPackets[i].count++;
				this.rxPackets[i].crc = CRC;
				return;
			}
		}
		this.rxPackets.push({'type':packetType.toString(16),'count':1});
	}
	
	updateRtDataStore(){
		var newData ={'packetName':'Packet Stats','packetType':'0','rxTime':0,'parameters':[]};
		for(var i = 0;i<this.rxPackets.length;i++){
			newData.parameters.push({'name':'Packet Rx Count '+this.rxPackets[i].type,'value':this.rxPackets[i].count,'units':'packets'},
									{'name':'Packet Last CRC '+this.rxPackets[i].type,'value':this.rxPackets[i].crc,'units':''}
									);
		}
		this.rtDataStore.insertDataPacket(newData);
	}
}

module.exports = function(rtDataStore){
	return new packetStats(rtDataStore);
};
