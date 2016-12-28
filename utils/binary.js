/*
* Module for converting between numbers and bytes and vice versa
* Each function has an optional parameter for setting the endianness
* where true is little-endian and false is big-endian
*/

function bytesToUint8(byte1, littleEndian) {
	var dataView = new DataView(new ArrayBuffer(1))
	dataView.setInt8(0, byte1);
	return dataView.getUint8(0, littleEndian)
}

function bytesToUint16(byte1, byte2, littleEndian) {
	var dataView = new DataView(new ArrayBuffer(2))
	dataView.setInt8(0, byte1);
	dataView.setInt8(1, byte2);
	return dataView.getUint16(0, littleEndian)
}

function bytesToUint32(byte1, byte2, byte3, byte4, littleEndian) {
	var dataView = new DataView(new ArrayBuffer(4))
	dataView.setInt8(0, byte1);
	dataView.setInt8(1, byte2);
	dataView.setInt8(2, byte3);
	dataView.setInt8(3, byte4);
	return dataView.getUint32(0, littleEndian)
}

function bytesToFloat(byte1, byte2, byte3, byte4, littleEndian) {
	var dataView = new DataView(new ArrayBuffer(4))
	dataView.setInt8(0, byte1);
	dataView.setInt8(1, byte2);
	dataView.setInt8(2, byte3);
	dataView.setInt8(3, byte4);
	return dataView.getFloat32(0, littleEndian)
}

function uint8ToBytes(uint8, littleEndian) {
    arr = new ArrayBuffer(1);
    view = new DataView(arr);
    view.setUint8(0, uint8, littleEndian); // byteOffset = 0; litteEndian = false
    tmpArr = [view.getUint8(0)]
	return tmpArr
}

function uint16ToBytes(uint16, littleEndian) {
    arr = new ArrayBuffer(2);
    view = new DataView(arr);
    view.setUint16(0, uint16, littleEndian); // byteOffset = 0; litteEndian = false
    tmpArr = [view.getUint8(0), view.getUint8(1)]
	return tmpArr
}

function uint32ToBytes(uint32, littleEndian) {
    arr = new ArrayBuffer(4);
    view = new DataView(arr);
    view.setUint32(0, uint32, littleEndian); // byteOffset = 0; litteEndian = false
    tmpArr = [view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)]
	return tmpArr
}

function floatToBytes(float, littleEndian) {
 	arr = new ArrayBuffer(4);
    view = new DataView(arr);
    view.setFloat32(0, float, littleEndian); // byteOffset = 0; litteEndian = false
    tmpArr = [view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)]
	return tmpArr   
}

module.exports = {
	bytesToUint8,
	bytesToUint16,
	bytesToUint32,
	uint8ToBytes,
	uint16ToBytes,
	uint32ToBytes,
	floatToBytes,
	bytesToFloat
}