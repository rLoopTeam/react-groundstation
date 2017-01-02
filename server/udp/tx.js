const commConfig = require('../../config/commConfig');
const bin = require('./binary.js');
const crc = require('./crc.js');
const dgram = require('dgram');

/*
* UDP data sender
*/
// var txPort = 9100; //3003; // This points to the Pod's UDP listener port
// var txHost = '127.0.0.1';

var winston = require('winston');
var txPort = commConfig.PodRxPort;//send from server to pod on pod's receiving port
var txHost = commConfig.PodRxHost;//send from server to pod on pod's receiving host ip
var u8Buffer;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: './logs/winston_tx.log' }),
        new (winston.transports.File)({ filename: './logs/winston_all.log', name: 'file.all' })
    ]
});
logger.level = 'debug';

module.exports = {
	/*
	Commented this out to see what breaks, should just delete later
    sendMessage: function (messageStr){
        var message = new Buffer(messageStr);
        var client = dgram.createSocket({type: 'udp4', reuseAddr: true});
        client.send(message, 0, message.length, txPort, txHost, function(err, bytes) {
            if (err) throw err;
            console.log("GROUNSTATION UDP - SENT: " +  txHost + ':' + txPort +' - ' + message);
            logger.log("debug", "GROUNSTATION UDP - SENT: " +  txHost + ':' + txPort +' - ' + message);
            client.close();
        });
    },*/
	
	//Probably need to do something about these:
	sendMessage: function(messageStr){
		console.log("GS->Pod theoretically: "+messageStr);
	},

	transmitPodCommand: function(node, packetType, u32Block0, u32Block1, u32Block2, u32Block3)
	{	
		//TODO Sequence counters
	
		//Find the IP and port for the node we're transmitting to
		var found = false;
		var port = 0;
		var ip = '';
		for(var i = 0;i<commConfig.RXServers.length;i++){
			if(commConfig.RXServers[i].hostName === node)
			{
				found = true;
				port = commConfig.RXServers[i].port;
				ip = commConfig.RXServers[i].hostIP;
				break;
			}
		}
		
		if(found === false)
		{
			console.log("Couldn't transmit to "+node+" command "+packetType);
			return;
		}else{
			console.log("Transmitting type 0x"+packetType.toString(16)+" to "+node+" "+ip+":"+port+" blocks: " +u32Block0+" "+u32Block1+" "+u32Block2+" "+u32Block3);
		}
		
		var packet = [];
		
		//These if blocks look odd but I think it'll do the correct handling for everything
		//everything: + numbers, - numbers, unsigned numbers above the max uint32 / 2
		if(u32Block0 > 0)
			packet.push.apply(packet,bin.uint32ToBytes(u32Block0,true));
		else
			packet.push.apply(packet,bin.int32ToBytes(u32Block0,true));
		if(u32Block1 > 0)
			packet.push.apply(packet,bin.uint32ToBytes(u32Block1,true));
		else
			packet.push.apply(packet,bin.int32ToBytes(u32Block1,true));
		if(u32Block2 > 0)
			packet.push.apply(packet,bin.uint32ToBytes(u32Block2,true));
		else
			packet.push.apply(packet,bin.int32ToBytes(u32Block2,true));
		if(u32Block3 > 0)
			packet.push.apply(packet,bin.uint32ToBytes(u32Block3,true));
		else
			packet.push.apply(packet,bin.int32ToBytes(u32Block3,true));

		packet = this.makeSafetyUDP(0, packetType, packet);
		
		//Might want to look into reusing the client instead of instantiating a new one each time
		var client = dgram.createSocket({type: 'udp4', reuseAddr: true});
        client.send(Buffer.from(packet), 0, packet.length, port, ip, function(err, bytes) {
            if (err) 
			{
				throw err;
			}
            client.close();
        });
		
		if(commConfig.MirrorLocal == true)
		{
			var client2 = dgram.createSocket({type: 'udp4', reuseAddr: true});
			client2.send(Buffer.from(packet), 0, packet.length, port, '127.0.0.1', function(err, bytes) {
				if (err) throw err;
				client2.close();
			});	
		}
	},
	
	makeSafetyUDP: function (sequence, packetType, payload){
		var finalPacket = [];
		
		finalPacket.push.apply(finalPacket,bin.uint32ToBytes(sequence,true)); //Sequence
		finalPacket.push.apply(finalPacket,bin.uint16ToBytes(packetType, true)); //PacketType
		finalPacket.push.apply(finalPacket,bin.uint16ToBytes(0,true)); //Length
		
		finalPacket.push.apply(finalPacket, payload);
		
		//TODO: move this above, probably left here after refactoring but can be moved above and reverified.
		var packetLength = payload.length; //Strictly the payload. Header & CRC not included
		finalPacket[6] = bin.uint16ToBytes(packetLength,true)[0];
		finalPacket[7] = bin.uint16ToBytes(packetLength,true)[1];
		
		finalPacket.push.apply(finalPacket,bin.uint16ToBytes(crc.u16SWCRC__CRC(finalPacket, finalPacket.length),true));
		
		return finalPacket;
	}
}



