/*
* Module for converting between numbers and bytes and vice versa
* Each function has an optional parameter for setting the endianness
* where true is little-endian and false is big-endian
*/
var Uint64BE = require("int64-buffer").Uint64BE;
var Int64BE = require("int64-buffer").Int64BE;


function bytesToUint8 (byte1, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(1));
  dataView.setInt8(0, byte1);
  return dataView.getUint8(0, littleEndian);
}

function bytesToInt8 (byte1, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(1));
  dataView.setInt8(0, byte1);
  return dataView.getInt8(0, littleEndian);
}

function bytesToUint16 (byte1, byte2, littleEndian) {
  if (arguments.length > 3 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(2));
  dataView.setInt8(0, byte1);
  dataView.setInt8(1, byte2);
  return dataView.getUint16(0, littleEndian);
}

function bytesToInt16 (byte1, byte2, littleEndian) {
  if (arguments.length > 3 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(2));
  dataView.setInt8(0, byte1);
  dataView.setInt8(1, byte2);
  return dataView.getInt16(0, littleEndian);
}

function bytesToUint32 (byte1, byte2, byte3, byte4, littleEndian) {
  if (arguments.length > 5 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(4));
  dataView.setInt8(0, byte1);
  dataView.setInt8(1, byte2);
  dataView.setInt8(2, byte3);
  dataView.setInt8(3, byte4);
  return dataView.getUint32(0, littleEndian);
}

function bytesToInt32 (byte1, byte2, byte3, byte4, littleEndian) {
  if (arguments.length > 5 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(4));
  dataView.setInt8(0, byte1);
  dataView.setInt8(1, byte2);
  dataView.setInt8(2, byte3);
  dataView.setInt8(3, byte4);
  return dataView.getInt32(0, littleEndian);
}

function bytesToFloat32 (byte1, byte2, byte3, byte4, littleEndian) {
  if (arguments.length > 5 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(4));
  dataView.setInt8(0, byte1);
  dataView.setInt8(1, byte2);
  dataView.setInt8(2, byte3);
  dataView.setInt8(3, byte4);
  return dataView.getFloat32(0, littleEndian);
}

function bytesToFloat64 (byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8, littleEndian) {
  if (arguments.length > 9 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(8));
  dataView.setInt8(0, byte1);
  dataView.setInt8(1, byte2);
  dataView.setInt8(2, byte3);
  dataView.setInt8(3, byte4);
  dataView.setInt8(4, byte5);
  dataView.setInt8(5, byte6);
  dataView.setInt8(6, byte7);
  dataView.setInt8(7, byte8);
  return dataView.getFloat64(0, littleEndian);
}

function bytesToInt64 (byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8, littleEndian) {
  if (arguments.length > 9 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var dataView = new DataView(new ArrayBuffer(8));
  dataView.setInt8(0, byte1);
  dataView.setInt8(1, byte2);
  dataView.setInt8(2, byte3);
  dataView.setInt8(3, byte4);
  dataView.setInt8(4, byte5);
  dataView.setInt8(5, byte6);
  dataView.setInt8(6, byte7);
  dataView.setInt8(7, byte8);
  let bigNumber = new Int64BE(dataView);
console.log(bigNumber.toNumber());
  return bigNumber.toNumber();
}

function bytesToUint64 (byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8, littleEndian) {
if (arguments.length > 9 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
var dataView = new DataView(new ArrayBuffer(8));
dataView.setInt8(0, byte1);
dataView.setInt8(1, byte2);
dataView.setInt8(2, byte3);
dataView.setInt8(3, byte4);
dataView.setInt8(4, byte5);
dataView.setInt8(5, byte6);
dataView.setInt8(6, byte7);
dataView.setInt8(7, byte8);
let bigNumber = new Uint64BE(dataview);
console.log(bigNumber.toNumber());
return bigNumber.toNumber();
}

function uint8ToBytes (uint8, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var arr = new ArrayBuffer(1);
  var view = new DataView(arr);
  view.setUint8(0, uint8, littleEndian); // byteOffset = 0; litteEndian = false
  var tmpArr = [view.getUint8(0)];
  return tmpArr;
}

function uint16ToBytes (uint16, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var arr = new ArrayBuffer(2);
  var view = new DataView(arr);
  view.setUint16(0, uint16, littleEndian); // byteOffset = 0; litteEndian = false
  var tmpArr = [view.getUint8(0), view.getUint8(1)];
  return tmpArr;
}

function uint32ToBytes (uint32, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var arr = new ArrayBuffer(4);
  var view = new DataView(arr);
  view.setUint32(0, uint32, littleEndian); // byteOffset = 0; litteEndian = false
  var tmpArr = [view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)];
  return tmpArr;
}

function int8ToBytes (int8, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var arr = new ArrayBuffer(1);
  var view = new DataView(arr);
  view.setInt8(0, int8, littleEndian); // byteOffset = 0; litteEndian = false
  var tmpArr = [view.getUint8(0)];
  return tmpArr;
}

function int16ToBytes (int16, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var arr = new ArrayBuffer(2);
  var view = new DataView(arr);
  view.setInt16(0, int16, littleEndian); // byteOffset = 0; litteEndian = false
  var tmpArr = [view.getUint8(0), view.getUint8(1)];
  return tmpArr;
}

function int32ToBytes (int32, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var arr = new ArrayBuffer(4);
  var view = new DataView(arr);
  view.setInt32(0, int32, littleEndian); // byteOffset = 0; litteEndian = false
  var tmpArr = [view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)];
  return tmpArr;
}

function float32ToBytes (float, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var arr = new ArrayBuffer(4);
  var view = new DataView(arr);
  view.setFloat32(0, float, littleEndian); // byteOffset = 0; litteEndian = false
  var tmpArr = [view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)];
  return tmpArr;
}

function float64ToBytes (float, littleEndian) {
  if (arguments.length > 2 || (typeof littleEndian !== 'boolean' && littleEndian !== undefined)) { throw new Error('Error - Wrong number or type of arguments'); }
  var arr = new ArrayBuffer(8);
  var view = new DataView(arr);
  view.setFloat64(0, float, littleEndian); // byteOffset = 0; litteEndian = false
  var tmpArr = [view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3),
    view.getUint8(4), view.getUint8(5), view.getUint8(6), view.getUint8(7)
  ];
  return tmpArr;
}

module.exports = {
  bytesToUint8,
  bytesToUint16,
  bytesToUint32,
  bytesToInt8,
  bytesToInt16,
  bytesToInt32,
  bytesToInt64,
  bytesToInt64,
  uint8ToBytes,
  uint16ToBytes,
  uint32ToBytes,
  int8ToBytes,
  int16ToBytes,
  int32ToBytes,
  float32ToBytes,
  float64ToBytes,
  bytesToFloat32,
  bytesToFloat64
};
