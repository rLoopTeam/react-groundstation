/*
* Fault flag definitions file. 
* Each key should match a flag in the packetDefinitions.js file
*/
module.exports = {
	// Accel Cal Full
	// e.g. 0x00000007 = 00000000 00000000 00000000 00000111
	// is represented by the following definition:
	"Accel 0 Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"}, // 1
			// {"name":"Fault 2 (this one is dangerous)", "severity":"critical"}, // 1
			// {"name":"Fault 3 (this one is critical!)", "severity":"critical"}, // 1
			// ... 0
			// ... 0
			// ... and so on for the rest of the bits
		]
	},
	"Accel 1 Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	// Accel Data Full
	"Accel 0 Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	/*
	* LCCM655 Accel
	*/
	"LCCM655 Accel Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"MMA Init Fault", "severity":"critical"},
		]
	},

	
	/*
	* Brakes
	*/
	"Brake Core Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"MLP range limit low", "severity":"critical"},
			{"name":"MLP range limit high", "severity":"critical"},
			{"name":"Calibration data reload", "severity":"critical"},
			{"name":"Development mode enabled", "severity":"critical"},
		]
	},
	"Brake Fault Flags 1": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"Brake Fault Flags 2": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	
	/*
	*  Laser Opto Sensor
	*/
	"LaserOpto Fault flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"LaserOpto Fault flags 1": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"LaserOpto Fault flags 2": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"LaserOpto Fault flags 3": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"LaserOpto Fault flags 4": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"LaserOpto Fault flags 5": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"LaserOpto Fault flags 6": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"LaserOpto Fault flags 7": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},
	"LaserOpto Fault flags 8": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},


	/*
	* FCU Throttle
	*/
	"FCU Throttle Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	/*
	* FCU Brakes
	*/
	"FCU Brakes Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"MLP Range Limit Low Fault", "severity":"critical"},
			{"name":"MLP Range Limit High Fault", "severity":"critical"},
			{"name":"Calibration Data Reload Fault", "severity":"critical"},
			{"name":"Development Mode Enable Fault", "severity":"critical"},
		]
	},

	/*
	* MCP23S17
	*/
	"MCP23S17 Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	/*
	* ATA6870
	*/
	"ATA6870 Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	/*
	* MMA8541
	*/
	"MMA8541 Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"Sensor Index Not Found Fault", "severity":"critical"},
			{"name":"Device Not Working Fault", "severity":"critical"},
			{"name":"Status Register Read Fail Fault", "severity":"critical"},
			{"name":"Interrupt Lost Fault", "severity":"critical"},
			{"name":"Unable To Calibrate Fault", "severity":"critical"},
			{"name":"Reset Calibration Data Fault", "severity":"critical"},
			{"name":"Cal Dara CRC Fault", "severity":"critical"},
			{"name":"Calibration In Progress Fault", "severity":"critical"},

		]
	},

	/*
	* SC16
	*/
	"SC16 Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"Receive FIFI overflow Fault", "severity":"critical"},
		]
	},

	/*
	* ETH
	*/
	"ETH Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	/*
	* RM4 flash
	*/
	"RM4 Flash Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"Init Banks Fault", "severity":"critical"},
			{"name":"FSM Busy Fault", "severity":"critical"},
			{"name":"Error Fail Fault", "severity":"critical"},
			{"name":"Null Pointer Fault", "severity":"critical"},
			{"name":"Invalid Command Fault", "severity":"critical"},
			{"name":"Invalid ECC ADDX Fault", "severity":"critical"},
			{"name":"OTP Checksum Fault", "severity":"critical"},
			{"name":"Invalid HCLK Fault", "severity":"critical"},
			{"name":"Invalid Bank Fault", "severity":"critical"},
			{"name":"Invalid ADDX Fault", "severity":"critical"},
			{"name":"Invalid Read Mode Fault", "severity":"critical"},
			{"name":"Data Buffer Length Fault", "severity":"critical"},
			{"name":"ECC Buff Mismatch Fault", "severity":"critical"},
			{"name":"Error Not Available Fault", "severity":"critical"},
			{"name":"Generic Fail", "severity":"critical"},
			{"name":"ECC Buffer Length Fault", "severity":"critical"},

		]
	},



	/*
	* RM4 Self test
	*/
	"RM4 ESM G2 Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"EFC Stuck Zero Fault", "severity":"critical"},
			{"name":"EFC Fault", "severity":"critical"},
			{"name":"VIM Parity Fault", "severity":"critical"},
			{"name":"DMA Parity Fault", "severity":"critical"},
			{"name":"SPI 1 Parity Fault", "severity":"critical"},
			{"name":"SPI 3 Parity Fault", "severity":"critical"},
			{"name":"SPI 5 Parity Fault", "severity":"critical"},
			{"name":"N2HTE 1 Parity Fault", "severity":"critical"},
			{"name":"RAM ECC Fault", "severity":"critical"},
			{"name":"RAM ECC 2 Fault", "severity":"critical"},
			{"name":"CAN 1 Parity Fault", "severity":"critical"},
			{"name":"CAN 2 Parity Fault", "severity":"critical"},
			{"name":"CAN 3 Parity Fault", "severity":"critical"},
			{"name":"N2HTE 2 Parity Fault", "severity":"critical"},
			{"name":"CCM Check 1 Fault", "severity":"critical"},
			{"name":"CCM Check 2 Fault", "severity":"critical"},
			{"name":"CCM Check 3 Fault", "severity":"critical"},
			{"name":"CCM Check 4 Fault", "severity":"critical"},

		]
	},


	/*
	* RM4 ESM
	*/
	"RM4 ESM Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"ADC 2 Fault", "severity":"critical"},
			{"name":"DMA MPU Fault", "severity":"critical"},
			{"name":"DMA Parity Fault", "severity":"critical"},
			{"name":"DMA DMM Fault", "severity":"critical"},
			{"name":"FMC Fault", "severity":"critical"},
			{"name":"N2HET Parity Fault", "severity":"critical"},
			{"name":"HTU Parity Fault", "severity":"critical"},
			{"name":"HTU MPU Fault", "severity":"critical"},
			{"name":"PLL Slip Fault", "severity":"critical"},
			{"name":"Clock monitor ISR Fault", "severity":"critical"},
			{"name":"DMA DMM IMP Write Fault", "severity":"critical"},
			{"name":"VIM RAM Parity Fault", "severity":"critical"},
			{"name":"SPI 1 Parity Fault", "severity":"critical"},
			{"name":"SPI 3 Parity Fault", "severity":"critical"},
			{"name":"ADC 1 Parity Fault", "severity":"critical"},
			{"name":"CAN 1 Parity Fault", "severity":"critical"},
			{"name":"CAN 3 Parity Fault", "severity":"critical"},
			{"name":"CAN 2 Parity Fault", "severity":"critical"},
			{"name":"SPI 5 Parity Fault", "severity":"critical"},
			{"name":"RAM Even Correctable Fault", "severity":"critical"},
			{"name":"RAM ODD Correctable Fault", "severity":"critical"},
			{"name":"DDC 1 Fault", "severity":"critical"},
			{"name":"CCM R4 Fault", "severity":"critical"},
			{"name":"FMC Correctable Fault", "severity":"critical"},
			{"name":"FMC Uncorrectable Fault", "severity":"critical"},
			{"name":"IOMM Fault", "severity":"critical"},
			{"name":"PLL 2 Fault", "severity":"critical"},
			{"name":"ETH Master Fault", "severity":"critical"},
			{"name":"USB Host Fault", "severity":"critical"},
			{"name":"DCC 2 Fault", "severity":"critical"},
			{"name":"CPU Self-check Fault", "severity":"critical"},
		]
	},

	/*
	* RM4 ESM G2
	*/
	"RM4 ESM G2 Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"CCM R4 Fault", "severity":"critical"},
			{"name":"FMC Fault", "severity":"critical"},
			{"name":"B0TCM Fault", "severity":"critical"},
			{"name":"B1TCM Fault", "severity":"critical"},
			{"name":"B0TCM ADDX Fault", "severity":"critical"},
			{"name":"B1TCM ADDX Fault", "severity":"critical"},
			{"name":"FLASH ATCM ADDX Fault", "severity":"critical"},
			{"name":"RTI WWD NMI Group2 24 Fault", "severity":"critical"},
		]
	},

	/*
	* RM4 Brakes
	*/
	"Brake Core Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"MLP range limit low", "severity":"critical"},
			{"name":"MLP range limit high", "severity":"critical"},
			{"name":"Calibration data reload", "severity":"critical"},
			{"name":"Development mode enabled", "severity":"critical"},
		]
	},

	/*
	* RM4 EEPROM
	*/
	"RM4 EEPROM Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"EEPROM not init Fault", "severity":"critical"},
			{"name":"Erase sector Fault", "severity":"critical"},
			{"name":"Write buffer Fault", "severity":"critical"},
			{"name":"Read out of range Fault", "severity":"critical"},
		]
	},

	/*
	* RM4 System
	*/
	"RM4 System Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	/*
	* EMAC
	*/
	"EMAC Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	/*
	* BIST
	*/
	"BIST Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"Self-check Fault", "severity":"critical"},
			{"name":"Ram test Fault", "severity":"critical"},
		]
	},


	/*
	* DMA
	*/
	"DMA Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
		]
	},

	/*
	* i2c 
	*/
	"I2C Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"Write time-out Fault", "severity":"critical"},
			{"name":"Read time-out Fault", "severity":"critical"},
		]
	},

	/*
	* FCU - Flight control unit 
	*/
	"FCU Core Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General Fault", "severity":"critical"},
			{"name":"Guarding Fault", "severity":"critical"},
		]
	},

	// Forward Laser Distance Sensor
	"ForwardLaser Fault flags": {
		"smallEndian": true,
		"template": [
			{"name":"Guarding Fault", "severity":"critical"},
		]
	},

	// Flight Control - Laser Contrast 0"
	"LaserContrast0 System Fault Flags": {
		"smallEndian": true,
		"template": [
			{"name":"Guarding Fault", "severity":"critical"},
		]
	},
	"LaserContrast0 Laser Fault Flags":  {
		"smallEndian": true,
		"template": [
			{"name":"Guarding Fault", "severity":"critical"},
		]
	}
}