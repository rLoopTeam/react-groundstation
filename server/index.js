'use strict';

/*
* Groundstation backend
*-----------------------
*/
const commConfig = require('../config/commConfig');
const app = require('./app');

/*------------
    SERVER
	Serves up the client http files
------------*/
const PORT = process.env.PORT || commConfig.Appserver.port;
const env = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT + '!');
});

const io = require('socket.io')(server);

var room = {
  dataLogging: 'dataLogging'
};

/*------------
	Sets up winston for our apps data logging needs
------------*/

var logger = require('./datalogging.js')(logger);

/*------------
	All UDP I/O directly to/from pod.
	***commands to the pod are currently down in websocketCommands, that should be abstracted out to here. 
------------*/
var udp = require('./udp/udpMain.js')(udp);

/*------------
	All UDP I/O directly to/from pod.
	***commands to the pod are currently down in websocketCommands, that should be abstracted out to here. 
------------*/
var podCommands = require('./udp/podCommands')(udp);

/*------------
	RTDATASTORE	
	Holds the last parameter values received from the pod.
	Queried by the stream pipe server for data to send to the client
------------*/
//TODO pass a hook to connect the UDP rx with the real time data store,
//TODO pass or return a hook to give the stream pipe server access to this data store
var rtDataStore = require('./realtimeDataStore')(); 

/*------------
    Stream Pipe
	Sits between the data store and the client.
	Sends requested parameters to the client at a fixed interval.
------------*/
const StreamPipeServer = require('./StreamPipeServer.js')(app, io);

/*------------
  WEBSOCKETS
  Handles commands from the client to send to the Pod.
------------*/
const websocketCommands = require('./websocketCommands.js')(io, udp, room, logger, podCommands);

/*------------
  PacketParserTest
  Just a quick test of the packet parser, need to verify a ton:
  all the endiannesses
  checksum validty
  what the packet length encompasses
------------*/
const parseTest = require('./udpParseTest.js')(logger);
