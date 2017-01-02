/*
* Pod simulator
* -------------
* This file contains a server which can send and receive data via udp.
* Using this, we can simulate data coming and going from the pod.
*/
var tx = require('./tx');
var rx = require('./rx');

console.log("Pod started")
// setTimeout(function(){
// 	tx.udpTX();
// }, 500)

