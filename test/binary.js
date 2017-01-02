const expect = require("chai").expect;
const bin = require("../server/udp/binary");
/*
* Test for the CRC checksum module
*/
describe("Binary tests: ", function() {
	describe("bytes to uint", function() {
		it("should result in a UINT given a valid set of BYTES", function() {
			expect(bin.bytesToUint32(0xFF, 0x00, 0x00, 0x00)).to.equal(4278190080);
			expect(bin.bytesToUint16(0xFF, 0x00)).to.equal(65280);
			expect(bin.bytesToUint8(0xFF)).to.equal(255);
		})
	})
	describe("uint to bytes", function() {
		it("should result in an array of BYTES given a corresponding UINT of the correct size", function() {
			expect(bin.uint32ToBytes(4278190080)[0]).to.equal(0xFF);
			expect(bin.uint32ToBytes(4278190080)[1]).to.equal(0x00);
			expect(bin.uint32ToBytes(4278190080)[2]).to.equal(0x00);
			expect(bin.uint32ToBytes(4278190080)[3]).to.equal(0x00);
			
			expect(bin.uint16ToBytes(65280)[0]).to.equal(0xFF);
			expect(bin.uint16ToBytes(65280)[1]).to.equal(0x00);

			expect(bin.uint8ToBytes(255)[0]).to.equal(0xFF);
		})
	})
	describe("bytes to int", function() {
		it("should result in a INT given a valid set of BYTES", function() {
			
			expect(bin.bytesToInt32(0x7F, 0xFF, 0xFF, 0xFF)).to.equal(2147483647);

			var bytes = bin.int16ToBytes(-666, true)
			expect(bin.bytesToInt16(bytes[0], bytes[1], true)).to.equal(-666)
			expect(bin.bytesToInt16(0xFD, 0x66)).to.equal(-666);
			expect(bin.bytesToInt16(0x7F, 0xFF)).to.equal(32767);
			
			expect(bin.bytesToInt8(0x7F)).to.equal(127);
		})
	})
	describe("int to bytes", function() {
		it("should result in an array of BYTES given a corresponding INT of the correct size", function() {

			expect(bin.int32ToBytes(2147483647)[0]).to.equal(0x7F);
			expect(bin.int32ToBytes(2147483647)[1]).to.equal(0xFF);
			expect(bin.int32ToBytes(2147483647)[2]).to.equal(0xFF);
			expect(bin.int32ToBytes(2147483647)[3]).to.equal(0xFF);
			
			expect(bin.int16ToBytes(-666)[0]).to.equal(0xFD);
			expect(bin.int16ToBytes(-666)[1]).to.equal(0x66);

			expect(bin.int16ToBytes(32767)[0]).to.equal(0x7F);
			expect(bin.int16ToBytes(32767)[1]).to.equal(0xFF);

			expect(bin.int8ToBytes(127)[0]).to.equal(0x7F);
		})
	})
	describe("bytes to float", function() {
		it("should result in a FLOAT given a valid set of BYTES", function() {
			expect(bin.bytesToFloat32(0x3c, 0xb6, 0xc3, 0x76)).to.be.within(0.02230, 0.02231);
			expect(bin.bytesToFloat32(0x41, 0xa1, 0x99, 0x9a)).to.be.within(20.15, 20.25);
			expect(bin.bytesToFloat32(0x44, 0xfa, 0x09, 0x45)).to.be.within(2000.285, 2000.35);
			expect(bin.bytesToFloat32(0x47, 0x14, 0x70, 0x12)).to.be.within(38000.05, 38000.15);

		})
	})
	describe("float to bytes", function() {
		it("should result in an array of BYTES given a FLOAT", function() {
			expect(bin.float32ToBytes(0.02230)[0]).to.equal(0x3c);
			expect(bin.float32ToBytes(0.02230)[1]).to.equal(0xb6);
			expect(bin.float32ToBytes(0.02230)[2]).to.equal(0xae);
			expect(bin.float32ToBytes(0.02230)[3]).to.equal(0x7d);
		})
	})
})