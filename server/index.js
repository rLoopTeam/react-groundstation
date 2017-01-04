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
	RTDATASTORE	
	Holds the last parameter values received from the pod.
	Queried by the stream pipe server for data to send to the client
------------*/
//TODO pass a hook to connect the UDP rx with the real time data store,
//TODO pass or return a hook to give the stream pipe server access to this data store
var rtDataStore = require('./realtimeDataStore')(logger); 

/*------------
	Stats on packets for various things that get added back to the rtDataStore
------------*/
var packetStats = require('./udp/packetStats.js')(rtDataStore);

/*------------
    Stream Pipe
	Sits between the data store and the client.
	Sends requested parameters to the client at a fixed interval.
------------*/
const StreamPipeServer = require('./StreamPipeServer.js')(app, io, rtDataStore);

/*------------
	PacketParser
	Takes raw udp packets and parses them into JSON objects
------------*/
var packetParser = require('./udp/packetParser')(logger, packetStats);

packetParser.addPacketLisenter(rtDataStore.insertDataPacket);

/*------------
	All UDP I/O directly to/from pod.
	***commands to the pod are currently down in websocketCommands, that should be abstracted out to here. 
------------*/
const udp = require('./udp/udpMain.js')(logger, packetParser.gotNewPacket);

/*------------
	All UDP I/O directly to/from pod.
	***commands to the pod are currently down in websocketCommands, that should be abstracted out to here. 
------------*/
var podCommands = require('./udp/podCommands')(udp);

/*------------
	DAQ Data module
	Records received data packets to the file system
------------*/
const daq = require('./daq.js')(packetStats);
packetParser.addPacketLisenter(daq.gotNewPacket);

/*------------
  WEBSOCKETS
  Handles commands from the client to send to the Pod.
------------*/
const websocketCommands = require('./websocketCommands.js')(io, udp, room, logger, podCommands, commConfig, daq);


/*------------
  Test Data Generator
  Adds some data to the real time data store for testing
------------*/
//const testDataGenerator = require('./testDataGenerator.js')(packetParser);

/*------------
  Acclerometer Test Data Generator
  Adds some data to the real time data store for testing
  DISABLE FOR PRODUCTION
------------*/
const AccelTestDataGenerator = require('./DataGenerators/AccelTestDataGenerator.js')(packetParser);

const BrakeTestDataGenerator = require('./DataGenerators/BrakeTestDataGenerator.js')(packetParser);

