var fs = require('fs');
var writefile = fs.createWriteStream('poddaq.csv');
class PodDAQ {
  constructor (packetStats) {
    this.isLogging = false;
    this.gotNewPacket = this.gotNewPacket.bind(this);
    this.packetStats = packetStats;
  }

  gotNewPacket (packet) {
    if (this.isLogging === false) { return; }

  //  var filename = 'logs/' + packet.packetName + '.csv';

    // var toWrite = packet.rxTime +", ";
    var sequence = packet.sequence.toString() + ',';
    var toWrite = '';
    toWrite = packet.packetName +',';
    for (var i = 0; i < packet.samples.length; i++) {
      toWrite = toWrite + sequence + packet.samples[i].toString() + '\n';
    }

    // TODO: reuse stream instead of opening and closing it all the time
    //fs.open(filename, 'a', 666, function (e, id) {
      //fs.write(id, toWrite, null, 'utf8', function () {
        //fs.close(id, function () {

        //});
     // });
   // });
   writefile.write(toWrite);
    this.packetStats.loggedPacketType(packet.packetType);
  }
}

module.exports = function (packetStats) {
  return new PodDAQ(packetStats);
};
