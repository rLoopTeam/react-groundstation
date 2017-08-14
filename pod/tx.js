/*
* Pod simulator
* -------------
* This file contains a server which can send data via udp.
* Using this, we can simulate data going from the pod.
*/
var dgram = require('dgram');
var bin = require('../server/udp/binary');
var config = require('../config/commConfig');

var fakePodState = {
  accelerometer1: {
    flags: 0,
    x: 0.23,
    y: 0.0289,
    z: 1202.4
  },
  accelerometer2: {
    flags: 0,
    x: 0.46,
    y: 0.112,
    z: 201.49
  }
};

/*
* UDP data sender
*/
function udpTX () {
  var arr = new ArrayBuffer(4 + 2 + 4 + 2 + 2 + 2 + 4 + 2 + 2 + 2 + 2);
  var view = new DataView(arr);
  view.setUint32(0, bin.uint32ToBytes(1, true), true); // sequence number
  view.setUint16(4, bin.uint16ToBytes(1, true), true); // packet type (accelerometer)

  view.setUint32(6, bin.uint32ToBytes(fakePodState.accelerometer1.flags, true), true);
  view.setUint16(10, bin.uint16ToBytes(fakePodState.accelerometer1.x, true), true);
  view.setUint16(12, bin.uint16ToBytes(fakePodState.accelerometer1.y, true), true);
  view.setUint16(14, bin.uint16ToBytes(fakePodState.accelerometer1.z, true), true);

  view.setUint32(16, bin.uint32ToBytes(fakePodState.accelerometer2.flags, true), true);
  view.setUint16(20, bin.uint16ToBytes(fakePodState.accelerometer2.x, true), true);
  view.setUint16(22, bin.uint16ToBytes(fakePodState.accelerometer2.y, true), true);
  view.setUint16(24, bin.uint16ToBytes(fakePodState.accelerometer2.z, true), true);

  view.setUint16(24, bin.uint16ToBytes(1, true), true); // checksum

  var buffer = new Buffer(arr);
  for (var i = 0; i < arr.length; ++i) {
    buffer[i] = arr[i];
  }
  // var message = new Buffer('Telemetry data ');
  var client = dgram.createSocket({type: 'udp4', reuseAddr: true});
  client.send(buffer, 0, buffer.length, config.PodTxPort, config.PodTxHost, function (err, bytes) {
    if (err) throw err;
    console.log('POD - SENT: ' + config.PodTxHost + ':' + config.PodTxPort + ' - ' + JSON.stringify(fakePodState));
    client.close();
  });
}

module.exports = {
  udpTX
};
