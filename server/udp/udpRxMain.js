const udprx = require('./rx');
const commConfig = require('../../config/commConfig');
const packetParser = require('./packetParser.js')();

class udpRxMain{
	constructor(){
	  this.rx = udprx;
	  this.RXServers = [];
	  this.rxNewPacket = this.rxNewPacket.bind(this);
	  this.initializeRXServersFromConfig();
	  this.parsedPacketCb = this.parsedPacketCb.bind(this);
	  this.parsedDAQPacketCb = this.parsedDAQPacketCb.bind(this);
	  packetParser.addPacketListener(this.parsedPacketCb);
	  packetParser.addDAQPacketListener(this.parsedDAQPacketCb);

	}
	
	initializeRXServersFromConfig()
	{
		for(var i = 0;i<commConfig.RXServers.length;i++)
		{
			this.RXServers.push(new udprx(commConfig.RXServers[i].port,
										commConfig.RXServers[i].hostIP,
										commConfig.RXServers[i].hostName,
										this.rxNewPacket
										));
		}

	}
	
	parsedPacketCb(data)
	{
		process.send({command:'newPacket', data:data});
	}
	
	parsedDAQPacketCb(data)
	{
		process.send({command:'newDAQPacket', data:data});
	}
	

	//Pass a udp packet from the receivers to the parser
	rxNewPacket(rawUDP, port)
	{
		packetParser.gotNewPacket(rawUDP, port);
	}
}

var newUDP = new udpRxMain();
