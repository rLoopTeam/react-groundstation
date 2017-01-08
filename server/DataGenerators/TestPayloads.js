const bin = require('../udp/binary');
var accelerometer = []
accelerometer.push.apply(accelerometer,bin.uint8ToBytes(5,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.float32ToBytes(90.1,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(2.1,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.uint8ToBytes(5,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.uint8ToBytes(52,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.uint8ToBytes(51,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.uint8ToBytes(25,true)); //Fault Flags
accelerometer.push.apply(accelerometer,bin.float32ToBytes(12.34,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(120.1,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(3.2,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.float32ToBytes(2.4,true)); //Raw X Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(1024,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(23,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(124,true)); //Raw Z Axis data
accelerometer.push.apply(accelerometer,bin.int16ToBytes(7024,true)); //Raw Z Axis data

module.exports = {
	accelerometer
}