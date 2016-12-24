/*
* UDP data format:
* [u32 Sequence][u16 PacketType][u16 Length]...hardware specific data e.g. accelerometers...[CRC16]
* e.g. [u32 Sequence][u16 PacketType][u16 Length][u32 Flags0][u16 X0][u16 Y0][u16 Z0][u32 Flags1][u16 X1][u16 Y1][u16 Z1][u16 CRC16]
*/
function parseUdpMessage(raw_udp) {
	var header = extractMessageHeader(raw_udp);
	var data = extractDataOfType(raw_udp, header.packetType);
	var crc = extractCrc(raw_udp);
	return {
		header,
		data,
		crc
	}
	
}

function extractMessageHeader(raw_udp) {

  	var sequence = new DataView(new ArrayBuffer(4))
  	var packetType = new DataView(new ArrayBuffer(2))
	var length = new DataView(new ArrayBuffer(2))

	sequence.setInt8(0, raw_udp[0]);
	sequence.setInt8(1, raw_udp[1]);
	sequence.setInt8(2, raw_udp[2]);
	sequence.setInt8(3, raw_udp[3]);

	packetType.setInt8(0, raw_udp[4]);
	packetType.setInt8(1, raw_udp[5]);

	length.setInt8(0, raw_udp[6]);
	length.setInt8(1, raw_udp[7]);
	
	return {
		sequence: sequence.getUint32(0, true),
		packetType: packetType.getUint16(0, true),
		length: length.getUint16(0, true)
	}
}

function extractDataOfType(raw_udp, type){
	var data = {}
	switch (type) {
		case dataTypes.ACCELEROMETERS: {

		}
		default:
			break;
	}
	return data
}

function extractCrc(raw_udp){
	var crc = new DataView(new ArrayBuffer(2))
	crc.setInt8(0, raw_udp[raw_udp.length - 2]);
	crc.setInt8(1, raw_udp[raw_udp.length - 1]);
	return crc.getUint16(0, true)
}

const dataTypes = Object.freeze({
    ACCELEROMETERS: 0
});

const dataTemplates = Object.freeze({
    ACCELEROMETERS: {
    	accelerometer0: {
    		x: null,
    		y: null,
    		z: null
    	},
    	accelerometer1: {
    		x: null,
    		y: null,
    		z: null
    	}
    }
});

module.exports = {
	parseUdpMessage,
	extractDataOfType,
	extractMessageHeader,
	dataTypes,

}