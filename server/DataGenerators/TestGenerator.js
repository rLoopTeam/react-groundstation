const bin = require('../udp/binary.js');
const crc = require('../udp/crc.js');
const commConfig = require('../../config/commConfig.js');
var dgram = require('dgram');

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
function makeNewPacket(sequence, type, payload){
    
    var testPacket = makeSafetyUDP(sequence, type, payload, true);
    var packetBuf = new Buffer(testPacket);
    var client = dgram.createSocket("udp4");
    client.bind();
    client.on("listening", function () {
        client.setBroadcast(true);
        client.send(packetBuf, 0, packetBuf.length, commConfig.RXServers[5].port, commConfig.RXServers[5].hostIP, function(err, bytes) {
            client.close();
        });
    });
    
    return testPacket;
}

module.exports = function( type, payload){
    var sequence = 0;
    setInterval(function(){
        makeNewPacket(sequence, type, payload); 
        sequence += 1;
    },30);
}