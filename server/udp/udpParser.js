const bin = require('./binary');
/*
* UDP data format:
* [u32 Sequence][u16 PacketType][u16 Length]...hardware specific data e.g. accelerometers...[CRC16]
* e.g. [u32 Sequence][u16 PacketType][u16 Length][u32 Flags0][u16 X0][u16 Y0][u16 Z0][u32 Flags1][u16 X1][u16 Y1][u16 Z1][u16 CRC16]
*/

const dataTypes = Object.freeze({
  ACCELEROMETERS: {id: 0}
});

function parseUdpMessage (raw_udp) {
  var header = parseMessageHeader(raw_udp);
  var data = parseDataOfType(raw_udp, header.packetType);
  var crc = parseCrc(raw_udp);

  return {
    header,
    data,
    crc
  };
}

function parseMessageHeader (raw_udp) {
  return {
    sequence: bin.bytesToUint32(raw_udp[0], raw_udp[1], raw_udp[2], raw_udp[3]),
    packetType: bin.bytesToUint16(raw_udp[4], raw_udp[5]),
    length: bin.bytesToUint16(raw_udp[6], raw_udp[7])
  };
}

function parseDataOfType (raw_udp, type) {
  var data = {};
  switch (type) {
    case dataTypes.ACCELEROMETERS.id: {
      data = getAccelerometersData(raw_udp);
    }
    default:
      break;
  }
  return data;
}

function parseCrc (raw_udp) {
  return bin.bytesToUint16(raw_udp[raw_udp.length - 2], raw_udp[raw_udp.length - 1]);
}

function createBinaryMessageOfType (...dataBytes) {
  dataBytes;
  return message;
}

function getAccelerometersData (raw_udp) {
  var flags0 = bin.bytesToUint32(raw_udp[8], raw_udp[9], raw_udp[10], raw_udp[11]);
  var x0 = bin.bytesToUint16(raw_udp[12], raw_udp[13]);
  var y0 = bin.bytesToUint16(raw_udp[14], raw_udp[15]);
  var z0 = bin.bytesToUint16(raw_udp[16], raw_udp[17]);
  var flags1 = bin.bytesToUint32(raw_udp[18], raw_udp[19], raw_udp[20], raw_udp[21]);
  var x1 = bin.bytesToUint16(raw_udp[22], raw_udp[23]);
  var y1 = bin.bytesToUint16(raw_udp[24], raw_udp[25]);
  var z1 = bin.bytesToUint16(raw_udp[26], raw_udp[27]);
  return {
      accelerometer0: {
        flags: flags0, x: x0, y: y0, z: z0
      },
      accelerometer1: {
        flags: flags1, x: x1, y: y1, z: z1
      }
  };
}

module.exports = {
  parseUdpMessage,
  parseDataOfType,
  parseMessageHeader,
  dataTypes

};
