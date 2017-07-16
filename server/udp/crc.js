const lookupTables = require('./crcLookupTables');

// LACHLAN'S ORIGINAL CODE
/*
// * @brief
// * 16Bit Table Based CRC
// *
// * @param[in]    *cpu8Data        Pointer to the data array of bytes
// * @param[in]     u32Length        The total length of bytes.
// * @return       The computed CRC
// * @st_funcMD5    40F6C8C288B1388CC5C8C3E6941704F8
// * @st_funcID    LCCM012R0.FILE.001.FUNC.007

Luint16 u16SWCRC__CRC(const Luint8 *cpu8Data, Luint32 u32Length)
{
  Luint16 u16CRC;
  Luint32 u32Counter;

  u16CRC = 0U;

  for(u32Counter = 0U; u32Counter < u32Length; u32Counter++)
  {
    u16CRC = u16SWCRC_CRC_TABLE[((u16CRC >> 8U) ^ cpu8Data[u32Counter]) & 0xFFU] ^ (u16CRC << 8U);
  }

  return u16CRC;

} */

// THIS IS AN EXAMPLE JS IMPLEMENTATION OF A SIMILAR ALGORITHM https://gist.github.com/chitchcock/5112270
exports.CRC16CCITT = function (cpu8Data, u32Length) {
  var crc = 0xFFFF;
  var j, i, c;

  for (i = 0; i < u32Length; i++) {
    c = cpu8Data[i].charCodeAt(0);
    if (c > 255) { throw new RangeError(); }

    j = (c ^ (crc >> 8)) & 0xFF;
    crc = lookupTables.u16SWCRC_CRC_TABLE[j] ^ (crc << 8);

    console.log('crc:', crc, ' character:', cpu8Data[i]);
  }
  var result = (crc ^ 0) & 0xFFFF;
  return result;
};

// THIS IS LACHLAN'S EXAMPLE CONVERTED TO JS
exports.u16SWCRC__CRC = function (cpu8Data, length) {
  var crc = 0x0000;
  var j, i, c;

  for (i = 0; i < length; i++) {
    c = cpu8Data[i];
    if (c > 255) { throw new RangeError(); }

    j = ((crc >> 8) ^ c) & 0xFF;
    crc = lookupTables.u16SWCRC_CRC_TABLE[j] ^ (crc << 8);
  }
  var result = crc;
  return result;
};

