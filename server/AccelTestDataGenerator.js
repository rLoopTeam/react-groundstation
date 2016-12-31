const bin = require('./udp/binary.js');
const crc = require('./udp/crc.js');

class AccelTestDataGenerator{
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
		payload.push.apply(payload,bin.int16ToBytes(20,true)); //Raw X Axis data
		payload.push.apply(payload,bin.int16ToBytes(21,true)); //Raw Y Axis data
		payload.push.apply(payload,bin.int16ToBytes(22,true)); //Raw Z Axis data
		payload.push.apply(payload,bin.float32ToBytes(20.123,true)); //Raw X Axis data
		payload.push.apply(payload,bin.float32ToBytes(20.123,true)); //Raw Y Axis data
		payload.push.apply(payload,bin.float32ToBytes(20.123,true)); //Raw Z Axis data
		payload.push.apply(payload,bin.float32ToBytes(60.0,true)); //Pitch Angle
		payload.push.apply(payload,bin.float32ToBytes(60.0,true)); //Roll Angle

		//Accel 2
		payload.push.apply(payload,bin.uint8ToBytes(50,true)); //Fault Flags
		payload.push.apply(payload,bin.int16ToBytes(200,true)); //Raw X Axis data
		payload.push.apply(payload,bin.int16ToBytes(201,true)); //Raw Y Axis data
		payload.push.apply(payload,bin.int16ToBytes(202,true)); //Raw Z Axis data
		payload.push.apply(payload,bin.float32ToBytes(200.123,true)); //Raw X Axis data
		payload.push.apply(payload,bin.float32ToBytes(200.345,true)); //Raw Y Axis data
		payload.push.apply(payload,bin.float32ToBytes(200.678,true)); //Raw Z Axis data
		payload.push.apply(payload,bin.float32ToBytes(500.0,true)); //Pitch Angle
		payload.push.apply(payload,bin.float32ToBytes(600.0,true)); //Roll Angle
	
		this.packetParser.gotNewPacket(this.makeSafetyUDP(this.sequence, 0x4099, payload));

		this.sequence = this.sequence + 1;
	}
}
	
module.exports = function(packetParser){
	return new AccelTestDataGenerator(packetParser);
};