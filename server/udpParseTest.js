const bin = require('./udp/binary.js');
const crc = require('./udp/crc.js');

function makeSafetyUDP(sequence, packetType, payload){
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

module.exports = function(logger){
	
	var packetParser = require('./udp/packetParser')(logger);

	var payload = [];
	
	payload.push.apply(payload,bin.uint8ToBytes(20,true)); 
	payload.push.apply(payload,bin.int8ToBytes(-20,true)); 
	payload.push.apply(payload,bin.uint16ToBytes(1000,true)); 
	payload.push.apply(payload,bin.int16ToBytes(-1000,true)); 
	payload.push.apply(payload,bin.uint32ToBytes(100000,true)); 
	payload.push.apply(payload,bin.int32ToBytes(-100000,true)); 
	payload.push.apply(payload,bin.float32ToBytes(12348.23,true)); 
	payload.push.apply(payload,bin.float64ToBytes(12348.23,true)); 
	
	var testPacket = makeSafetyUDP(0x46, 0x5000, payload)

	console.log("Packet Data: ");
	for(var i = 0;i<testPacket.length;i++){
		console.log(testPacket[i].toString(16));
	}

	console.log("--------")
	
	console.log(JSON.stringify(packetParser.gotNewPacket(testPacket)));
};