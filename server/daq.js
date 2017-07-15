var fs = require('fs');
var outfile = fs.createWriteStream('lgos/output.csv');

class DAQ {
  constructor (packetStats) {
    this.isLogging = false;
    this.gotNewPacket = this.gotNewPacket.bind(this);
    this.packetStats = packetStats;
  }

  gotNewPacket (packet) {
    if (this.isLogging === false) { return; }

    // just no need for this
    var toWrite = packet.rxTime + ', ';
    toWrite = packet.packetName + ',';
    for (var i = 0; i < packet.parameters.length - 1; i++) {
      toWrite = toWrite + packet.parameters[i].value + ',';
    }

    outfile.write(toWrite);

    this.packetStats.loggedPacketType(packet.packetType);
  }
}

module.exports = function (packetStats) {
  return new DAQ(packetStats);
};
