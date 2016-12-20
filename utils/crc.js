const lookupTables = require('./lookupTables');
/*
// * @brief
// * 16Bit Table Based CRC
// *
// * @param[in]		*cpu8Data				Pointer to the data array of bytes
// * @param[in] 		u32Length				The total length of bytes.
// * @return 			The computed CRC
// * @st_funcMD5		40F6C8C288B1388CC5C8C3E6941704F8
// * @st_funcID		LCCM012R0.FILE.001.FUNC.007
 
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

}*/

exports.u16SWCRC__CRC = function(cpu8Data, u32Length) {
	let u16CRC;
	let u32Counter;
	
	u16CRC = 0;
	console.log(u32Length);
	for (u32Counter = 0; u32Counter < u32Length; u32Counter++)
	{
		u16CRC = Math.pow(lookupTables.u16SWCRC_CRC_TABLE[(Math.pow((u16CRC >> 8), cpu8Data[u32Counter])) & 0xFF], (u16CRC << 8));
		console.log(u32Counter+":"+u16CRC);
	}

	return u16CRC
}
