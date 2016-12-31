const expect = require("chai").expect;
const udp = require("../server/udp/udpParser");
/*
* Test for the CRC checksum module
*/
describe("UDP tests: ", function() {
	describe("parseMessageHeader", function() {
		it("should parse header of udp message and output the correct MAXIMUM value for each type of Uint: [u32 Sequence][u16 PacketType][u16 Length]", function() {
			var raw = [
				0xFF,0xFF,0xFF,0xFF, //32 bit sequence
				0xFF,0xFF, //16 bit type
				0xFF,0xFF, //16 bit length
			]
			var start = udp.parseMessageHeader(raw);
			console.log(start)
			expect(start.sequence).to.equal(4294967295);
			expect(start.packetType).to.equal(65535);
			expect(start.length).to.equal(65535);
		})
		it("should parse header of udp message and output the correct MINIMUM value for each type of Uint: [u32 Sequence][u16 PacketType][u16 Length]", function() {
			var raw = [
				0x00,0x00,0x00,0x00, //32 bit sequence
				0x00,0x00, //16 bit type
				0x00,0x00, //16 bit length
			]
			var start = udp.parseMessageHeader(raw);
			expect(start.sequence).to.equal(0);
			expect(start.packetType).to.equal(0);
			expect(start.length).to.equal(0);
		})
	})
	
	describe("parseAccelerometerData", function() {
		it("should parse the raw udp, and detect the type of data contained and parse it. In this case it is ACCELOROMETER data", function() {
			var raw = [
				// header
				0xFF,0xFF,0xFF,0xFF, //32 bit sequence
				0x00,0x00, //16 bit type
				0xFF,0xFF, //16 bit length

				// data
				0xFF,0xFF,0xFF,0xFF, // accelrometer 0 flags
				0xFF,0xFF, // acceleration X
				0xFF,0xFF, // acceleration Y
				0xFF,0xFF, // acceleration Z
				0xFF,0xFF,0xFF,0xFF, // accelrometer 1 flags
				0xFF,0xFF, // acceleration X
				0xFF,0xFF, // acceleration Y
				0xFF,0xFF, // acceleration Z

				// crc
				0xFF, 0xFF
			]
			// Parse raw udp data
			var parsedUdpMessage = udp.parseUdpMessage(raw);

			// We expect it to be accelerometer data
			expect(parsedUdpMessage.data.accelerometer0.flags).to.equal(4294967295)
			expect(parsedUdpMessage.data.accelerometer0.x).to.equal(65535)
			expect(parsedUdpMessage.data.accelerometer0.y).to.equal(65535)
			expect(parsedUdpMessage.data.accelerometer0.z).to.equal(65535)
			expect(parsedUdpMessage.data.accelerometer1.flags).to.equal(4294967295)
			expect(parsedUdpMessage.data.accelerometer1.x).to.equal(65535)
			expect(parsedUdpMessage.data.accelerometer1.y).to.equal(65535)
			expect(parsedUdpMessage.data.accelerometer1.z).to.equal(65535)
		})
	})
})