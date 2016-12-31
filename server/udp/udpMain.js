const udptx = require('./tx');
const udprx = require('./rx');
const commConfig = require('../../config/commConfig');


class udp{
	constructor(logger, packetProcessorCb){
	  this.tx = udptx;
	  this.rx = udprx;
	  this.logger = logger;
	  this.RXServers = [];
	  this.PacketProcessorCallback = packetProcessorCb;
	  this.rxNewPacket = this.rxNewPacket.bind(this);
	  this.initializeRXServersFromConfig();
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
	
	rxNewPacket(rawUDP)
	{
		
		if(this.PacketProcessorCallback != null)
			this.PacketProcessorCallback(rawUDP);
	}
}

module.exports = function (logger, packetProcessorCb)
{
	return new udp(logger, packetProcessorCb);
};