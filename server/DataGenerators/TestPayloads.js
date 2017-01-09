const bin = require('../udp/binary');

/*
* 0x1003 Accelerometer test data
*/
var accelerometer = []
//Accel 1
accelerometer.push.apply(accelerometer,bin.uint32ToBytes(5,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.int16ToBytes(-100,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(-666,true)); //Raw Y Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(1024,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(20.123,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(20.123,true)); //Raw Y Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(20.123,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(60.0,true)); //Pitch Angle
accelerometer.push.apply(accelerometer,bin.float32ToBytes(60.0,true)); //Roll Angle

//Accel 2
accelerometer.push.apply(accelerometer,bin.uint32ToBytes(50,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.int16ToBytes(-2002,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(-5005,true)); //Raw Y Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(4096,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(200.123,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(200.345,true)); //Raw Y Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(200.678,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(500.0,true)); //Pitch Angle
accelerometer.push.apply(accelerometer,bin.float32ToBytes(600.0,true)); //Roll Angle

var battTempSensors = [];
var NumOfTempSensors = 300;
battTempSensors.push.apply(battTempSensors,bin.uint16ToBytes(NumOfTempSensors,true)); //Number of temperature sensors
battTempSensors.push.apply(battTempSensors,bin.uint16ToBytes(0,true)); //Spare slot

for(var i = 0;i<NumOfTempSensors;i++)
{
	battTempSensors.push.apply(battTempSensors,bin.float32ToBytes(23+i/10,true));
}

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
	battTempLocations
}

