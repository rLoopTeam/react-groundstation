var expect    = require("chai").expect;
var crc = require("../utils/crc");
const lookupTables = require('../utils/lookupTables');

/*
* Test for the CRC checksum module
*/
describe("CRC tests: ", function() {
  describe("CRC generator", function() {
    // it("algorithm polynomial test", function() {
    // 	const u16CRC = 0;
    // 	const value = 1;
    // 	const u16CRCSingleValue = lookupTables.C_LOCALDEF__LCCM012__TABLE16_DEF[((u16CRC >> 8) ^ value) & 0xFF] ^ (u16CRC << 8);
    // 	console.log(u16CRCSingleValue)
    // });
    it("generates a crc and compared against a known result from an online calculator: https://www.lammertbies.nl/comm/info/crc-calculation.html", function() {
    	let udpData = new Uint8Array([
    		1,2,3,4,5,6,7,8,9
    	]);

    	let crcResult = crc.u16SWCRC__CRC(udpData, udpData.length);
    	expect(crcResult).to.equal(0xBB3D); // This value was calculated at the link above
    });
    it("generates a crc on makes sure the result is the same as the last two bytes", function() {
    	// UDPSafe message data provided by @Lachlan (!this message includes the checksum in the last two bytes so need to do length - 2!)
		let udpData = new Uint8Array([
		  	0x00,0x00,0x00,0x00,0x00,
	 		0x50,0x00,0x10,0x01,0x00,
	 		0x00,0x00,0x00,0x00,0x00,
	 		0x00,0x00,0x00,0x00,0x00,
	 		0x00,0x00,0x00,0x00,0x0C,
 			0x43
		]);

    	let crcResult = crc.u16SWCRC__CRC(udpData, udpData.length - 2);
    	expect(crcResult).to.equal(0x0C43); // this could be wrong? (Im no good at binary)
    });
  });
});

// // message
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x50
// 0x00
// 0x10
// 0x01
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// 0x00
// // checksum
// 0x0C
// 0x47