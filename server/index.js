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
		packetStats.gotPacketType(m.data.packetType, m.data.crc, m.data.sequence,m.data.node);
		daq.gotNewPacket(m.data);
	}
	if(m.command === 'newDAQPacket')
	{
		poddaq.gotNewPacket(m.data);
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
 Pod DAQ Data module
 Records DAQ Packets received to the file system
 ------------*/
const poddaq = require('./poddaq.js')(packetStats);


/*------------
 Config module
 Saves the config settings
 ------------*/
const config = require('./config.js')(packetStats);

//Scans the temperature node sensor busses
//for the temperature sensor ROM Ids
var romIDScanner = require('./ROMIDScanner.js')(podCommands, rtDataStore);

/*------------
	Grabs data from the charger
------------*/
var charger = require('./charger')(rtDataStore);

/*------------
  WEBSOCKETS
  Handles commands from the client to send to the Pod.
------------*/
const websocketCommands = require('./websocketCommands.js')(io, udp, room, logger, podCommands, commConfig, daq, config, romIDScanner, poddaq,charger);

/*-----------
  GUI Preload
  Let the GUI load up in a nicer state
  */
  const GUIPreload = require('./preloadGUI.js');
  GUIPreload();



/*------------
  Acclerometer Test Data Generator
  Adds some data to the real time data store for testing
  DISABLE FOR PRODUCTION
------------*/

// const BrakeTestDataGenerator = require('./DataGenerators/BrakeTestDataGenerator.js')(packetParser);
// const TempSensorsGenerator = require('./DataGenerators/BrakeTestDataGenerator.js')(packetParser);

//Accelerometer packet generator
//const payloads = require('./DataGenerators/TestPayloads');
//const testGenerator = require('./DataGenerators/TestGenerator.js');
//testGenerator(0x3401, payloads.BMSStreaming,"Power Node A");
//testGenerator(0x3401, payloads.BMSStreaming,"Power Node B");
//testGenerator(0x3601, payloads.CoolingStreaming, "Power Node A");
//testGenerator(0x1003, payloads.accelerometer, "Flight Control");
//testGenerator(0x1101, payloads.optoDistanceSensors, "Flight Control");
//testGenerator(0x1201, payloads.forwardLaserDistanceSensors, "Flight Control");
//testGenerator(0x1402, payloads.brakesStreaming, "Flight Control");
//testGenerator(0x3201, payloads.battTempSensors, "Power Node A");
//testGenerator(0x3201, payloads.battTempSensors, "Power Node B");
//testGenerator(0x3203, payloads.battTempLocations, "Power Node A");
//testGenerator(0x3203, payloads.battTempLocations, "Power Node B");
//testGenerator(0x1901, payloads.autoSequenceTestResult1, 'Flight Control');
//testGenerator(0x1901, payloads.autoSequenceTestResult3, 'Flight Control');

/*

const daqGenerator = require('./DataGenerators/daqGenerator.js')();

//For accelerometer DAQ
var accelRate = 800;
var accelPerPacket = 64;
daqGenerator.simulateDAQ(0x4000, 'uint8', 6, 50, 9100); //CPU Load
daqGenerator.simulateDAQ(0x4001, 'int16', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x4002, 'int16', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x4003, 'int16', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x4004, 'int16', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x4005, 'int16', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x4006, 'int16', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x4007, 'int32', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x4008, 'int32', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x4009, 'int32', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x400a, 'int32', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x400b, 'int32', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X
daqGenerator.simulateDAQ(0x400c, 'int32', accelPerPacket, 1000/(accelRate/accelPerPacket), 9100); //Accel 0 X

*/
