var fs = require('fs');
var writefile = fs.createWriteStream('logs/poddaq.csv');
class PodDAQ {
  constructor (packetStats) {
    this.isLogging = false;
    this.gotNewPacket = this.gotNewPacket.bind(this);
    this.packetStats = packetStats;
  }

  gotNewPacket (packet) {
    if (this.isLogging === false) { return; }

    // var toWrite = packet.rxTime +", ";
    var sequence = packet.sequence.toString() + ',';
    var toWrite = '';
    toWrite = packet.packetName + ',';
    for (var i = 0; i < packet.samples.length; i++) {
      toWrite = toWrite + sequence + packet.samples[i].toString() + '\n';
    }

    writefile.write(toWrite);
    this.packetStats.loggedPacketType(packet.packetType);
  }
}

module.exports = function (packetStats) {
  return new PodDAQ(packetStats);
};
