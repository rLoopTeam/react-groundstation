const bin = require('../udp/binary.js');
const crc = require('../udp/crc.js');

class BatteryTestDataGenerator{
	constructor(packetParser){
		this.SendNewPacketToGS = this.SendNewPacketToGS.bind(this);
		this.packetParser = packetParser;
		this.sequence = 0;
		setInterval(this.SendNewPacketToGS,30);
	}
	
	makeSafetyUDP(sequence, packetType, payload){
		var finalPacket = [];
		
		finalPacket.push.apply(finalPacket,bin.uint32ToBytes(sequence,true)); //Sequence
		finalPacket.push.apply(finalPacket,bin.uint16ToBytes(packetType, true)); //PacketType
		finalPacket.push.apply(finalPacket,bin.uint16ToBytes(0,true)); //Length
		
		finalPacket.push.apply(finalPacket, payload);
		
		var packetLength = payload.length; //Strictly the payload. Header & CRC not included
		finalPacket[6] = bin.uint16ToBytes(packetLength,true)[0];
		finalPacket[7] = bin.uint16ToBytes(packetLength,true)[1];
		
		finalPacket.push.apply(finalPacket,bin.uint16ToBytes(crc.u16SWCRC__CRC(finalPacket, finalPacket.length),true));
		
		return finalPacket;
	}
	
	SendNewPacketToGS(){
		var payload = [];
		var batteryCell = [];
		
		// Battery A Temps
		payload.push.apply(payload,bin.uint16ToBytes(18,true)); //Number of Sensors
		payload.push.apply(payload,bin.uint16ToBytes(1,true)); //Spare
		
		for(var i = 0; i < 6; i++)
		{
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.01,true)); //1 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.02,true)); //2 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.03,true)); //3 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.04,true)); //4 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.05,true)); //5 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.06,true)); //6 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.07,true)); //7 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.08,true)); //8 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.09,true)); //9 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.10,true)); //10 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.11,true)); //11 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.12,true)); //12 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.13,true)); //13 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.14,true)); //14 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.15,true)); //15 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.16,true)); //16 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.17,true)); //17 Temp
			batteryCell.push.apply(batteryCell,bin.float32ToBytes(23.18,true)); //18 Temp
		}
		
		payload.push.apply(payload, batteryCell); //push all cells' values to payload

		this.packetParser.gotNewPacket(this.makeSafetyUDP(this.sequence, 0x3201, payload));

		this.sequence = this.sequence + 1;
	}
}
	
module.exports = function(packetParser){
	return new BatteryTestDataGenerator(packetParser);
};