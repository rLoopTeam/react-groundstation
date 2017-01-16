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
  dataLogging: 'dataLogging',
  commConfig: 'commConfig',
  hoverEngines: 'hoverEngines'
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
	All UDP I/O directly to/from pod.
	***commands to the pod are currently down in websocketCommands, that should be abstracted out to here. 
------------*/
const udp = require('./udp/udpMain.js')(logger);

/*-----------
	Put the UDP RX in it's own process
------------*/
var cp = require('child_process');

//added "[], {execArgv: ['--debug=5859']}" becuase this was blocking the debugger by using the 5858 port
//found this fix here: https://github.com/nodejs/node/issues/3469
const udpRxMain = cp.fork('./server/udp/udpRxMain.js', [], {execArgv: ['--debug=5859']});
udpRxMain.on('message', function(m) {
	if(m.command === 'newPacket')
	{
		rtDataStore.insertDataPacket(m.data);
		packetStats.gotPacketType(m.data.packetType, m.data.crc, m.data.sequence);
		daq.gotNewPacket(m.data);
	}
});


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

/*------------
 Config module
 Saves the config settings
 ------------*/
const config = require('./config.js')(packetStats);

//Scans the temperature node sensor busses
//for the temperature sensor ROM Ids
var romIDScanner = require('./romIDScanner.js')(podCommands, rtDataStore);

/*------------
  WEBSOCKETS
  Handles commands from the client to send to the Pod.
------------*/
const websocketCommands = require('./websocketCommands.js')(io, udp, room, logger, podCommands, commConfig, daq, config, romIDScanner);

/*------------
	Grabs data from the charger
------------*/
var charger = require('./charger')(rtDataStore);

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
//const AccelTestDataGenerator = require('./DataGenerators/AccelTestDataGenerator.js')(packetParser);

// const BrakeTestDataGenerator = require('./DataGenerators/BrakeTestDataGenerator.js')(packetParser);
// const TempSensorsGenerator = require('./DataGenerators/BrakeTestDataGenerator.js')(packetParser);

//Accelerometer packet generator
// const payloads = require('./DataGenerators/TestPayloads');
// const testGenerator = require('./DataGenerators/TestGenerator.js');
// testGenerator(0x1003, payloads.accelerometer);
// testGenerator(0x1101, payloads.optoDistanceSensors);
// testGenerator(0x1201, payloads.forwardLaserDistanceSensors);
// testGenerator(0x3201, payloads.battTempSensors);
// testGenerator(0x3203, payloads.battTempLocations);
