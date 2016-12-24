function uint8(byte1) {
	var dataView = new DataView(new ArrayBuffer(1))
	dataView.setInt8(0, byte1);
	return dataView.getUint8(0, littleEndian)
}

function uint16(byte1, byte2, littleEndian) {
	var dataView = new DataView(new ArrayBuffer(2))
	dataView.setInt8(0, byte1);
	dataView.setInt8(1, byte2);
	return dataView.getUint16(0, littleEndian)
}

function uint32(byte1, byte2, byte3, byte4, littleEndian) {
	var dataView = new DataView(new ArrayBuffer(4))
	dataView.setInt8(0, byte1);
	dataView.setInt8(1, byte2);
	dataView.setInt8(2, byte3);
	dataView.setInt8(3, byte4);
	return dataView.getUint32(0, littleEndian)
}

module.exports = {
	uint8,
	uint16,
	uint32,
}