const bin = require('../udp/binary.js');
const crc = require('../udp/crc.js');

class BrakeTestDataGenerator{
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
		
		//Accel 1
		payload.push.apply(payload,bin.uint8ToBytes(5,true)); //Fault Flags
		payload.push.apply(payload,bin.float32ToBytes(90.1,true)); //Raw X Axis data
		payload.push.apply(payload,bin.float32ToBytes(2.1,true)); //Raw X Axis data
		payload.push.apply(payload,bin.uint8ToBytes(5,true)); //Fault Flags
		payload.push.apply(payload,bin.uint8ToBytes(52,true)); //Fault Flags
		payload.push.apply(payload,bin.uint8ToBytes(51,true)); //Fault Flags
		payload.push.apply(payload,bin.uint8ToBytes(25,true)); //Fault Flags
		payload.push.apply(payload,bin.float32ToBytes(12.34,true)); //Raw X Axis data
		payload.push.apply(payload,bin.float32ToBytes(120.1,true)); //Raw X Axis data
		payload.push.apply(payload,bin.float32ToBytes(3.2,true)); //Raw X Axis data
		payload.push.apply(payload,bin.float32ToBytes(2.4,true)); //Raw X Axis data
		payload.push.apply(payload,bin.int16ToBytes(1024,true)); //Raw Z Axis data
		payload.push.apply(payload,bin.int16ToBytes(23,true)); //Raw Z Axis data
		payload.push.apply(payload,bin.int16ToBytes(124,true)); //Raw Z Axis data
		payload.push.apply(payload,bin.int16ToBytes(7024,true)); //Raw Z Axis data

		this.packetParser.gotNewPacket(this.makeSafetyUDP(this.sequence, 0x0000, payload));

		this.sequence = this.sequence + 1;
	}
}
	
module.exports = function(packetParser){
	return new BrakeTestDataGenerator(packetParser);
};