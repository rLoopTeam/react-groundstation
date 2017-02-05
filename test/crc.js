const expect = require('chai').expect;
const crc = require('../server/udp/crc');
const lookupTables = require('../server/udp/lookupTables');

/*
* Test for the CRC checksum module
*/
describe('CRC tests: ', function () {
  describe('CRC generator', function () {
    it('testing the algorithm from web against known calculated result from https://www.lammertbies.nl/comm/info/crc-calculation.html', function () {
      var udpData = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ];
      console.log('Input: ' + udpData);
      var crcResult = crc.CRC16CCITT(udpData, udpData.length).toString(16);
      expect(crcResult).to.equal('29b1');
    });
    it('testing the algorithm from web against our own data, with the expected result generated from the same calculator as above', function () {
      // test data from the hardware
      var udpData = [
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x50, 0x00, 0x10, 0x01, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ];
    // convert data to string elements because algorithm needs them as strings
      udpData = udpData.map(function (a) {
        a = String.fromCharCode(a, 16);
        return a;
      });
      console.log('Input: ' + udpData);
      var crcResult = crc.CRC16CCITT(udpData, udpData.length).toString(16);
      expect(crcResult).to.equal('a886');
    });
    it.skip("testing Lachlan's algorithm against our own data, with the expected result generated from the code on the hardware", function () {
      // test data from the hardware
      var udpData = [
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x50, 0x00, 0x10, 0x01, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ];
    // convert data to string elements
      udpData = udpData.map(function (a) {
        a = String.fromCharCode(a, 16);
        return a;
      });
      console.log('Input: ' + udpData);
      var crcResult = crc.u16SWCRC__CRC(udpData, udpData.length).toString(16);
      expect(crcResult).to.equal('0c47');
    });

    // CRC-CCITT (0xFFFF)  0x29B1

  //   it("testing the algorithm", function() {
  //     // var udpData = [
    // //     "1","2","3","4","5","6","7","8","9"
    // // ];
    // // should be 0x29B1

    // // var udpData = [
    // //   0x00,0x00,0x00,0x00,0x00,
    // //   0x50,0x00,0x10,0x01,0x00,
    // //   0x00,0x00,0x00,0x00,0x00,
    // //   0x00,0x00,0x00,0x00,0x00,
    // //   0x00,0x00,0x00,0x00
    // // ];
    // // console.log("Hex: "+udpData)

    // var udpData = [
    //   "00","00","00","00","00",
    //   "50","00","10","01","00",
    //   "00","00","00","00","00",
    //   "00","00","00","00","00",
    //   "00","00","00","00"
    // ];
    // console.log("Hex: "+udpData)

    // udpData = udpData.map(function(a){
    //   a = String.fromCharCode(parseInt(a, 16))
    //   return a
    // })
    // console.log("Hex: "+udpData)
  //     // should be 0x0C, 0x43

  //     var crc = 0xFFFF;
   //    var j, i;

   //    for (i = 0; i < udpData.length; i++) {
   //        c = udpData[i];
   //        if (c > 255) { throw new RangeError(); }
   //        j = (c ^ (crc >> 8)) & 0xFF;
   //        crc = lookupTables.u16SWCRC_CRC_TABLE[j] ^ (crc << 8);
   //        console.log(i,":",crc);
   //    }
   //    var result = (crc ^ 0) & 0xFFFF;
   //    console.log(result, result.toString(16));

  //   });

    // it("testing the algorithm", function() {
    //   var udpData = [
    //     "1","2","3","4","5","6","7","8","9"
    //   ]

    //   var crc = 0xFFFF;
     //  var j, i;

     //  for (i = 0; i < udpData.length; i++) {
     //      c = udpData[i].charCodeAt(0);
     //      if (c > 255) { throw new RangeError(); }
     //      j = (c ^ (crc >> 8)) & 0xFF;
     //      crc = lookupTables.u16SWCRC_CRC_TABLE[j] ^ (crc << 8);
     //      console.log(i,":",crc);
     //  }
     //  var result = (crc ^ 0) & 0xFFFF;
     //  console.log(result, result.toString(16));

    // });

  //   it("generates a crc and compared against a known result from an online calculator: https://www.lammertbies.nl/comm/info/crc-calculation.html", function() {
  //     let udpData = new Uint8Array([
  //       1,2,3,4,5,6,7,8,9
  //     ]);

  //     let crcResult = crc.u16SWCRC__CRC(udpData, udpData.length);
  //     expect(crcResult).to.equal(0xBB3D); // This value was calculated at the link above
  //   });
  //   it("generates a crc on makes sure the result is the same as the last two bytes", function() {
  //     // UDPSafe message data provided by @Lachlan (!this message includes the checksum in the last two bytes so need to do length - 2!)
    // let udpData = new Uint8Array([
    //     0x00,0x00,0x00,0x00,0x00,
   //     0x50,0x00,0x10,0x01,0x00,
   //     0x00,0x00,0x00,0x00,0x00,
   //     0x00,0x00,0x00,0x00,0x00,
   //     0x00,0x00,0x00,0x00,0x0C,
   //     0x47
    // ]);

  //     let crcResult = crc.u16SWCRC__CRC(udpData, udpData.length - 2);
  //     expect(crcResult).to.equal(0x0C43); // this could be wrong? (Im no good at binary)
  //   });
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
