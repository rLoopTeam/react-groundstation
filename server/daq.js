var fs = require('fs');
var outfile = fs.createWriteStream('logs/output.csv', {'flags': 'a'});
var d = new Date();

class DAQ {
  constructor (packetStats) {
    this.isLogging = false;
    this.gotNewPacket = this.gotNewPacket.bind(this);
    this.packetStats = packetStats;
  }

  gotNewPacket (packet) {
    if (this.isLogging === false) { return; }

    var toWrite = packet.packetName + ',' +  packet.rxTime + ', ';
    for (var i = 0; i < packet.parameters.length - 1; i++) {
      toWrite = toWrite + packet.parameters[i].value + ',';
    }

	toWrite += "\n";
	
    outfile.write(toWrite);

    this.packetStats.loggedPacketType(packet.packetType);
  }
}

module.exports = function (packetStats) {
  return new DAQ(packetStats);
};
