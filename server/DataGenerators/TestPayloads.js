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
accelerometer.push.apply(accelerometer,bin.int32ToBytes(2,true)); //Current Accel
accelerometer.push.apply(accelerometer,bin.int32ToBytes(3,true)); //Current Velocity
accelerometer.push.apply(accelerometer,bin.int32ToBytes(4,true)); //Previous Velocity
accelerometer.push.apply(accelerometer,bin.int32ToBytes(5,true)); //Current Displacement
accelerometer.push.apply(accelerometer,bin.int32ToBytes(6,true)); //Previous Displacement



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
accelerometer.push.apply(accelerometer,bin.int32ToBytes(2,true)); //Current Accel
accelerometer.push.apply(accelerometer,bin.int32ToBytes(3,true)); //Current Velocity
accelerometer.push.apply(accelerometer,bin.int32ToBytes(4,true)); //Previous Velocity
accelerometer.push.apply(accelerometer,bin.int32ToBytes(5,true)); //Current Displacement
accelerometer.push.apply(accelerometer,bin.int32ToBytes(6,true)); //Previous Displacement


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
* 0x1402 brakes streaming data
*/
var brakesStreaming = [];
brakesStreaming.push.apply(brakesStreaming, bin.uint32ToBytes(15,true)); //fault flags 1
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(14.90,true)); //i beam mm 1
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(14.90,true)); //lead screw mm 1
brakesStreaming.push.apply(brakesStreaming, bin.uint32ToBytes(1490,true)); //lead screw um 1
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(14.90,true)); //i beam mm 1
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(14.90,true)); //lead screw mm 1
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(1490,true)); //lead screw um 1
brakesStreaming.push.apply(brakesStreaming, bin.uint32ToBytes(0,true)); //spare 1
brakesStreaming.push.apply(brakesStreaming, bin.uint32ToBytes(0,true)); //spare 1

brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //limit extend 1
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //limit retract 1
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //limit extend edge 1
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //limit retract edge 1
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //sw error 1

brakesStreaming.push.apply(brakesStreaming, bin.uint16ToBytes(0,true)); //ADC sample 1
brakesStreaming.push.apply(brakesStreaming, bin.uint16ToBytes(0,true)); //ADC zero 1
brakesStreaming.push.apply(brakesStreaming, bin.int32ToBytes(0,true)); //ADC minus zero 1
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(0,true)); //system span 1
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(0,true)); //position mm 1
brakesStreaming.push.apply(brakesStreaming, bin.int32ToBytes(0,true)); //linear velocity 1
brakesStreaming.push.apply(brakesStreaming, bin.int32ToBytes(0,true)); //linear acceleration 1
brakesStreaming.push.apply(brakesStreaming, bin.int32ToBytes(0,true)); //current position 1

brakesStreaming.push.apply(brakesStreaming, bin.uint32ToBytes(15,true)); //fault flags 2
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(14.90,true)); //i beam mm 2
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(14.90,true)); //lead screw mm 2
brakesStreaming.push.apply(brakesStreaming, bin.uint32ToBytes(1490,true)); //lead screw um 2
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(14.90,true)); //i beam mm 2
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(14.90,true)); //lead screw mm 2
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(1490,true)); //lead screw um 2
brakesStreaming.push.apply(brakesStreaming, bin.uint32ToBytes(0,true)); //spare 2
brakesStreaming.push.apply(brakesStreaming, bin.uint32ToBytes(0,true)); //spare 2

brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //limit extend 2
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //limit retract 2
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //limit extend edge 2
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //limit retract edge 2
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //sw error 2

brakesStreaming.push.apply(brakesStreaming, bin.uint16ToBytes(0,true)); //ADC sample 2
brakesStreaming.push.apply(brakesStreaming, bin.uint16ToBytes(0,true)); //ADC zero 2
brakesStreaming.push.apply(brakesStreaming, bin.int32ToBytes(0,true)); //ADC minus zero 2
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(0,true)); //system span 2
brakesStreaming.push.apply(brakesStreaming, bin.float32ToBytes(0,true)); //position mm 2
brakesStreaming.push.apply(brakesStreaming, bin.int32ToBytes(0,true)); //linear velocity 2
brakesStreaming.push.apply(brakesStreaming, bin.int32ToBytes(0,true)); //linear acceleration 2
brakesStreaming.push.apply(brakesStreaming, bin.int32ToBytes(0,true)); //current position 2

brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //state
brakesStreaming.push.apply(brakesStreaming, bin.uint8ToBytes(0,true)); //calibration state

var BMSStreaming = []
BMSStreaming.push.apply(BMSStreaming, bin.uint32ToBytes(0,true)); //fault flags
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(1,true)); //temp sensor state
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(1,true)); //Charger state
BMSStreaming.push.apply(BMSStreaming, bin.uint16ToBytes(250,true)); //num temp sensors
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(30,true)); //highest temp
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(23,true)); //average temp
BMSStreaming.push.apply(BMSStreaming, bin.uint16ToBytes(18,true)); //highest sensor index
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(60,true)); //pack voltage
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(4.5,true)); //cell highest voltage
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(4.1,true)); //lowest cell voltage
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(22.2,true)); //bms boards temp
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(5,true)); //node pressure
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(26,true)); //node temp

BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(1,true)); //module voltage 1
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(2,true)); //module voltage 2
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(3,true)); //module voltage 3
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(4,true)); //module voltage 4
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(5,true)); //module voltage 5
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(6,true)); //module voltage 6
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(7,true)); //module voltage 7
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(8,true)); //module voltage 8
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(9,true)); //module voltage 9
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(10,true)); //module voltage 10
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(11,true)); //module voltage 11
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(12,true)); //module voltage 12
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(13,true)); //module voltage 13
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(14,true)); //module voltage 14
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(15,true)); //module voltage 15
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(16,true)); //module voltage 16
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(17,true)); //module voltage 17
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(18,true)); //module voltage 18

BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(1,true)); //BMS ID1
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(2,true)); //BMS ID2
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(3,true)); //BMS ID3
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(4,true)); //BMS ID4
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(5,true)); //BMS ID5
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(6,true)); //BMS ID6
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(7,true)); //BMS ID7
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(8,true)); //BMS ID8
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(9,true)); //BMS ID9
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(10,true)); //BMS ID10
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(11,true)); //BMS ID11
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(12,true)); //BMS ID12
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(13,true)); //BMS ID13
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(14,true)); //BMS ID14
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(15,true)); //BMS ID15
BMSStreaming.push.apply(BMSStreaming, bin.uint8ToBytes(16,true)); //BMS ID16

BMSStreaming.push.apply(BMSStreaming, bin.uint32ToBytes(100,true)); //Volts Update Count
BMSStreaming.push.apply(BMSStreaming, bin.uint32ToBytes(20,true)); //Temp Scan Count
BMSStreaming.push.apply(BMSStreaming, bin.float32ToBytes(330.23,true)); //Pack Current

var CoolingStreaming = []
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(1, true)); // general cooling state
CoolingStreaming.push.apply(CoolingStreaming, bin.int32ToBytes(149, true)); // Hover1/2 temp
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(1, true)); // Hover1/2 cooling state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(1, true)); // Hover1/2 solenoid state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(4, true)); // Hover1/2 solenoid pin
CoolingStreaming.push.apply(CoolingStreaming, bin.int32ToBytes(155, true)); // Hover3/4 temp
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(0, true)); // Hover3/4 cooling state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(0, true)); // Hover3/4 solenoid state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(8, true)); // Hover3/4 solenoid pin
CoolingStreaming.push.apply(CoolingStreaming, bin.int32ToBytes(156, true)); // Hover5/6 temp
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(0, true)); // Hover5/6 cooling state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(1, true)); // Hover5/6 solenoid state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(16, true)); // Hover5/6 solenoid pin
CoolingStreaming.push.apply(CoolingStreaming, bin.int32ToBytes(143, true)); // Hover7/8 temp
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(1, true)); // Hover7/8 cooling state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(0, true)); // Hover7/8 solenoid state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(22, true)); // Hover7/8 solenoid pin
CoolingStreaming.push.apply(CoolingStreaming, bin.int32ToBytes(150, true)); // Eddy Brakes temp
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(0, true)); // Eddy Brakes cooling state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(0, true)); // Eddy Brakes solenoid state
CoolingStreaming.push.apply(CoolingStreaming, bin.uint8ToBytes(23, true)); // Eddy Brakes solenoid pin


/*
 * 0x1901 Auto-sequence state and status
 */
var autoSequenceTestResult1 = [];
autoSequenceTestResult1.push.apply(autoSequenceTestResult1, bin.uint32ToBytes(1, true)); // Idle
autoSequenceTestResult1.push.apply(autoSequenceTestResult1, bin.uint8ToBytes(1, true)); // Pass

var autoSequenceTestResult3 = [];
autoSequenceTestResult3.push.apply(autoSequenceTestResult3, bin.uint32ToBytes(3, true)); // Brake sensing
autoSequenceTestResult3.push.apply(autoSequenceTestResult3, bin.uint8ToBytes(0, true)); // Fail


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
	autoSequenceTestResult1,
	autoSequenceTestResult3,
	brakesStreaming,
	battTempSensors,
	battTempLocations,
	optoDistanceSensors,
	forwardLaserDistanceSensors,
	BMSStreaming,
	CoolingStreaming,
}

