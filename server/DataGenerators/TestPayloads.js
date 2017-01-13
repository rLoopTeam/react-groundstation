const bin = require('../udp/binary');

/*
* 0x1003 Accelerometer test data
*/
var accelerometer = []
//Accel 1
accelerometer.push.apply(accelerometer,bin.uint32ToBytes(7,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.int16ToBytes(-100,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(-666,true)); //Raw Y Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(1024,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(20.123,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(20.123,true)); //Raw Y Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(20.123,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(60.0,true)); //Pitch Angle
accelerometer.push.apply(accelerometer,bin.float32ToBytes(60.0,true)); //Roll Angle

//Accel 2
accelerometer.push.apply(accelerometer,bin.uint32ToBytes(7,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.int16ToBytes(-2002,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(-5005,true)); //Raw Y Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(4096,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(200.123,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(200.345,true)); //Raw Y Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(200.678,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(500.0,true)); //Pitch Angle
accelerometer.push.apply(accelerometer,bin.float32ToBytes(600.0,true)); //Roll Angle


/*
* 0x1101 Laser opto sensors
*/
var optoDistanceSensors = [];
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(7,true)); //Top level fault Flags
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(7,true)); //spare

optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(7,true)); //fault flags 1
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //laser error packet count 1
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //first bbyte wrong 1
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(14.5,true)); //raw distance 1
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(98.72,true)); //filtered value 1
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //spare 1

optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //fault flags 2
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //laser error packet count 2
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //first bbyte wrong 2
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(0.5,true)); //raw distance 2
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(8.72,true)); //filtered value 2
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //spare 2

optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //fault flags 3
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //laser error packet count 3
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //first bbyte wrong 3
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(13.5,true)); //raw distance 3
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(8.72,true)); //filtered value 3
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //spare 3

optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //fault flags 4
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //laser error packet count 4
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //first bbyte wrong 4
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(70.5,true)); //raw distance 4
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(8.72,true)); //filtered value 4
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //spare 4

optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //fault flags 5
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //laser error packet count 5
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //first bbyte wrong 5
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(310.5,true)); //raw distance 5
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(8.72,true)); //filtered value 5
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //spare 5

optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //fault flags 6
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //laser error packet count 6
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //first bbyte wrong 6
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(103.5,true)); //raw distance 6
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(8.72,true)); //filtered value 6
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //spare 6

optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //fault flags 7
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //laser error packet count 7
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //first bbyte wrong 7
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(10.5,true)); //raw distance 7
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(8.72,true)); //filtered value 7
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //spare 7

optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(2,true)); //fault flags 8
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //laser error packet count 8
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //first bbyte wrong 8
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(120.5,true)); //raw distance 8
optoDistanceSensors.push.apply(optoDistanceSensors, bin.float32ToBytes(18.82,true)); //filtered value 8
optoDistanceSensors.push.apply(optoDistanceSensors, bin.uint32ToBytes(0,true)); //spare 8

/*
* 0x1201 Forward laser distance sensor
*/
var forwardLaserDistanceSensors = [];
forwardLaserDistanceSensors.push.apply(forwardLaserDistanceSensors, bin.uint32ToBytes(0,true)); //fault flags
forwardLaserDistanceSensors.push.apply(forwardLaserDistanceSensors, bin.uint32ToBytes(0,true)); //spare 0
forwardLaserDistanceSensors.push.apply(forwardLaserDistanceSensors, bin.uint32ToBytes(0,true)); //spare 1
forwardLaserDistanceSensors.push.apply(forwardLaserDistanceSensors, bin.float32ToBytes(100.5,true)); //raw value
forwardLaserDistanceSensors.push.apply(forwardLaserDistanceSensors, bin.float32ToBytes(18.82,true)); //filtered value
forwardLaserDistanceSensors.push.apply(forwardLaserDistanceSensors, bin.uint32ToBytes(0,true)); //spare 3


/*
* 0x3021 Temperature sensor
*/
var battTempSensors = [];
var NumOfTempSensors = 300;
battTempSensors.push.apply(battTempSensors,bin.uint16ToBytes(NumOfTempSensors,true)); //Number of temperature sensors
battTempSensors.push.apply(battTempSensors,bin.uint16ToBytes(0,true)); //Spare slot

for(var i = 0;i<NumOfTempSensors;i++)
{
	battTempSensors.push.apply(battTempSensors,bin.float32ToBytes(23+i/10,true));
}


/*
* 0x3203 Accelerometer location
*/
var battTempLocations = [];;
battTempLocations.push.apply(battTempLocations,bin.uint16ToBytes(NumOfTempSensors,true)); //Number of temperature sensors
battTempLocations.push.apply(battTempLocations,bin.uint16ToBytes(0,true)); //Spare slot

for(var i = 0;i<NumOfTempSensors;i++)
{
	battTempLocations.push.apply(battTempLocations,bin.uint16ToBytes(23+i,true)); //User Location
	battTempLocations.push.apply(battTempLocations,bin.uint8ToBytes(10,true)); //Resolution in bits
	battTempLocations.push.apply(battTempLocations,bin.uint8ToBytes(2+i,true)); //Bus Index
}

module.exports = {
	accelerometer,
	battTempSensors,
	battTempLocations,
	optoDistanceSensors,
	forwardLaserDistanceSensors
}

