const bin = require('./udp/binary.js');

module.exports = function(logger){
	
	var packetParser = require('./udp/packetParser')(logger);
	var DummyPacket = [];
	DummyPacket.push.apply(DummyPacket,bin.uint32ToBytes(0,true)); //Sequence
	DummyPacket.push.apply(DummyPacket,bin.uint16ToBytes(20)); //PacketType
	DummyPacket.push.apply(DummyPacket,bin.uint16ToBytes(0,true)); //Length
	DummyPacket.push.apply(DummyPacket,bin.uint16ToBytes(20,true)); //X 1 uint16
	DummyPacket.push.apply(DummyPacket,bin.uint16ToBytes(25,true)); //X 1 uint16
	DummyPacket.push.apply(DummyPacket,bin.uint16ToBytes(30,true)); //X 1 uint16
	DummyPacket.push.apply(DummyPacket,bin.float32ToBytes(20.2)); //velocity
	DummyPacket.push.apply(DummyPacket,bin.uint16ToBytes(0,true)); //checksum

	var packetLength = DummyPacket.length;
	DummyPacket[6] = bin.uint16ToBytes(packetLength,true)[0];
	DummyPacket[7] = bin.uint16ToBytes(packetLength,true)[1];

	console.log(JSON.stringify(DummyPacket));

	console.log("Packet Data: " + JSON.stringify(packetParser.gotNewPacket(DummyPacket)));
};