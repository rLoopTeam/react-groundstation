/*
* Fault flag definitions file.
* Each key should match a flag in the packetDefinitions.js file
*/
module.exports = {
  // Accel Cal Full
  // e.g. 0x00000007 = 00000000 00000000 00000000 00000111
  // is represented by the following definition:
  'Accel Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'MMA Init Fault', 'severity': 'critical'} // 1
      // {"name":"Fault 2 (this one is dangerous)", "severity":"critical"}, // 1
      // {"name":"Fault 3 (this one is critical!)", "severity":"critical"}, // 1
      // ... 0
      // ... 0
      // ... and so on for the rest of the bits
    ]
  },
  'Accel 1 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'MMA Init Fault', 'severity': 'critical'}
    ]
  },
  'Accel 2 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'MMA Init Fault', 'severity': 'critical'}
    ]
  },

  /*
  * LCCM655 Accel
  */
  'LCCM655 Accel Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'MMA Init Fault', 'severity': 'critical'}
    ]
  },

  /*
  * Brakes
  */
  'Brake Core Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'MLP range limit low', 'severity': 'critical'},
      {'name': 'MLP range limit high', 'severity': 'critical'},
      {'name': 'Calibration data reload', 'severity': 'critical'},
      {'name': 'Development mode enabled', 'severity': 'critical'}
    ]
  },
  'Brake Fault Flags 1': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },
  'Brake Fault Flags 2': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  /*
  *  Laser Opto Sensor
  */
  'LaserOpto Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'CRC Reloaded', 'severity': 'critical'},
      {'name': 'Guarding Fault', 'severity': 'critical'},
      {'name': 'Injection Mode Enabled', 'severity': 'critical'}
    ]
  },
  'LaserOpto 1 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Transceiver Failure', 'severity': 'critical'},
      {'name': 'Byte Timeout', 'severity': 'critical'},
      {'name': 'Packet Timeout', 'severity': 'critical'},
      {'name': 'Packet Byte 1 Counter High', 'severity': 'critical'},
      {'name': 'Laser Out of Range', 'severity': 'critical'}
    ]
  },
  'LaserOpto 2 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Transceiver Failure', 'severity': 'critical'},
      {'name': 'Byte Timeout', 'severity': 'critical'},
      {'name': 'Packet Timeout', 'severity': 'critical'},
      {'name': 'Packet Byte 1 Counter High', 'severity': 'critical'},
      {'name': 'Laser Out of Range', 'severity': 'critical'}
    ]
  },
  'LaserOpto 3 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Transceiver Failure', 'severity': 'critical'},
      {'name': 'Byte Timeout', 'severity': 'critical'},
      {'name': 'Packet Timeout', 'severity': 'critical'},
      {'name': 'Packet Byte 1 Counter High', 'severity': 'critical'},
      {'name': 'Laser Out of Range', 'severity': 'critical'}
    ]
  },
  'LaserOpto 4 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Transceiver Failure', 'severity': 'critical'},
      {'name': 'Byte Timeout', 'severity': 'critical'},
      {'name': 'Packet Timeout', 'severity': 'critical'},
      {'name': 'Packet Byte 1 Counter High', 'severity': 'critical'},
      {'name': 'Laser Out of Range', 'severity': 'critical'}
    ]
  },
  'LaserOpto 5 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Transceiver Failure', 'severity': 'critical'},
      {'name': 'Byte Timeout', 'severity': 'critical'},
      {'name': 'Packet Timeout', 'severity': 'critical'},
      {'name': 'Packet Byte 1 Counter High', 'severity': 'critical'},
      {'name': 'Laser Out of Range', 'severity': 'critical'}
    ]
  },
  'LaserOpto 6 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Transceiver Failure', 'severity': 'critical'},
      {'name': 'Byte Timeout', 'severity': 'critical'},
      {'name': 'Packet Timeout', 'severity': 'critical'},
      {'name': 'Packet Byte 1 Counter High', 'severity': 'critical'},
      {'name': 'Laser Out of Range', 'severity': 'critical'}
    ]
  },
  'LaserOpto 7 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Transceiver Failure', 'severity': 'critical'},
      {'name': 'Byte Timeout', 'severity': 'critical'},
      {'name': 'Packet Timeout', 'severity': 'critical'},
      {'name': 'Packet Byte 1 Counter High', 'severity': 'critical'},
      {'name': 'Laser Out of Range', 'severity': 'critical'}
    ]
  },
  'LaserOpto 8 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Transceiver Failure', 'severity': 'critical'},
      {'name': 'Byte Timeout', 'severity': 'critical'},
      {'name': 'Packet Timeout', 'severity': 'critical'},
      {'name': 'Packet Byte 1 Counter High', 'severity': 'critical'},
      {'name': 'Laser Out of Range', 'severity': 'critical'}
    ]
  },

  /*
  *  Forward Laser Distance Sensor
  */
  'ForwardLaser Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'No Bytes', 'severity': 'critical'},
      {'name': 'No Packets', 'severity': 'critical'}
    ]
  },

  /*
  * FCU Throttle
  */
  'Throttle Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'AMC Fault', 'severity': 'critical'},
      {'name': 'Indexing Fault', 'severity': 'critical'},
      {'name': 'Throttle not in run mode', 'severity': 'critical'},
      {'name': 'Development mode enabled', 'severity': 'critical'}
    ]
  },

  'Throttle AMC Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'DAC Indexing Fault', 'severity': 'critical'},
      {'name': 'I2C Fault', 'severity': 'critical'}
    ]
  },

  /*
  * FCU Brakes
  */
  'FCU Brakes Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'MLP Range Limit Low Fault', 'severity': 'critical'},
      {'name': 'MLP Range Limit High Fault', 'severity': 'critical'},
      {'name': 'Calibration Data Reload Fault', 'severity': 'critical'},
      {'name': 'Development Mode Enable Fault', 'severity': 'critical'}
    ]
  },

  /*
  * MCP23S17
  */
  'MCP23S17 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  /*
  * ATA6870
  */
  'ATA6870 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  /*
  * MMA8541
  */
  'MMA8541 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Sensor Index Not Found Fault', 'severity': 'critical'},
      {'name': 'Device Not Working Fault', 'severity': 'critical'},
      {'name': 'Status Register Read Fail Fault', 'severity': 'critical'},
      {'name': 'Interrupt Lost Fault', 'severity': 'critical'},
      {'name': 'Unable To Calibrate Fault', 'severity': 'critical'},
      {'name': 'Reset Calibration Data Fault', 'severity': 'critical'},
      {'name': 'Cal Dara CRC Fault', 'severity': 'critical'},
      {'name': 'Calibration In Progress Fault', 'severity': 'critical'}

    ]
  },

  /*
  * SC16
  */
  'SC16 1 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Receive FIFI overflow Fault', 'severity': 'critical'},
      {'name': 'Device Index Fault', 'severity': 'critical'}
    ]
  },
  'SC16 2 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Receive FIFI overflow Fault', 'severity': 'critical'},
      {'name': 'Device Index Fault', 'severity': 'critical'}
    ]
  },
  'SC16 3 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Receive FIFI overflow Fault', 'severity': 'critical'},
      {'name': 'Device Index Fault', 'severity': 'critical'}
    ]
  },
  'SC16 4 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Receive FIFI overflow Fault', 'severity': 'critical'},
      {'name': 'Device Index Fault', 'severity': 'critical'}
    ]
  },
  'SC16 5 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Receive FIFI overflow Fault', 'severity': 'critical'},
      {'name': 'Device Index Fault', 'severity': 'critical'}
    ]
  },
  'SC16 6 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Receive FIFI overflow Fault', 'severity': 'critical'},
      {'name': 'Device Index Fault', 'severity': 'critical'}
    ]
  },
  'SC16 7 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Receive FIFI overflow Fault', 'severity': 'critical'},
      {'name': 'Device Index Fault', 'severity': 'critical'}
    ]
  },
  'SC16 8 Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Receive FIFI overflow Fault', 'severity': 'critical'},
      {'name': 'Device Index Fault', 'severity': 'critical'}
    ]
  },
  /*
  * ETH
  */
  'ETH Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  /*
  * RM4 flash
  */
  'RM4 Flash Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Init Banks Fault', 'severity': 'critical'},
      {'name': 'FSM Busy Fault', 'severity': 'critical'},
      {'name': 'Error Fail Fault', 'severity': 'critical'},
      {'name': 'Null Pointer Fault', 'severity': 'critical'},
      {'name': 'Invalid Command Fault', 'severity': 'critical'},
      {'name': 'Invalid ECC ADDX Fault', 'severity': 'critical'},
      {'name': 'OTP Checksum Fault', 'severity': 'critical'},
      {'name': 'Invalid HCLK Fault', 'severity': 'critical'},
      {'name': 'Invalid Bank Fault', 'severity': 'critical'},
      {'name': 'Invalid ADDX Fault', 'severity': 'critical'},
      {'name': 'Invalid Read Mode Fault', 'severity': 'critical'},
      {'name': 'Data Buffer Length Fault', 'severity': 'critical'},
      {'name': 'ECC Buff Mismatch Fault', 'severity': 'critical'},
      {'name': 'Error Not Available Fault', 'severity': 'critical'},
      {'name': 'Generic Fail', 'severity': 'critical'},
      {'name': 'ECC Buffer Length Fault', 'severity': 'critical'}

    ]
  },

  /*
  * RM4 ESM
  */
  'RM4 ESM Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'ADC 2 Fault', 'severity': 'critical'},
      {'name': 'DMA MPU Fault', 'severity': 'critical'},
      {'name': 'DMA Parity Fault', 'severity': 'critical'},
      {'name': 'DMA DMM Fault', 'severity': 'critical'},
      {'name': 'FMC Fault', 'severity': 'critical'},
      {'name': 'N2HET Parity Fault', 'severity': 'critical'},
      {'name': 'HTU Parity Fault', 'severity': 'critical'},
      {'name': 'HTU MPU Fault', 'severity': 'critical'},
      {'name': 'PLL Slip Fault', 'severity': 'critical'},
      {'name': 'Clock monitor ISR Fault', 'severity': 'critical'},
      {'name': 'DMA DMM IMP Write Fault', 'severity': 'critical'},
      {'name': 'VIM RAM Parity Fault', 'severity': 'critical'},
      {'name': 'SPI 1 Parity Fault', 'severity': 'critical'},
      {'name': 'SPI 3 Parity Fault', 'severity': 'critical'},
      {'name': 'ADC 1 Parity Fault', 'severity': 'critical'},
      {'name': 'CAN 1 Parity Fault', 'severity': 'critical'},
      {'name': 'CAN 3 Parity Fault', 'severity': 'critical'},
      {'name': 'CAN 2 Parity Fault', 'severity': 'critical'},
      {'name': 'SPI 5 Parity Fault', 'severity': 'critical'},
      {'name': 'RAM Even Correctable Fault', 'severity': 'critical'},
      {'name': 'RAM ODD Correctable Fault', 'severity': 'critical'},
      {'name': 'DDC 1 Fault', 'severity': 'critical'},
      {'name': 'CCM R4 Fault', 'severity': 'critical'},
      {'name': 'FMC Correctable Fault', 'severity': 'critical'},
      {'name': 'FMC Uncorrectable Fault', 'severity': 'critical'},
      {'name': 'IOMM Fault', 'severity': 'critical'},
      {'name': 'PLL 2 Fault', 'severity': 'critical'},
      {'name': 'ETH Master Fault', 'severity': 'critical'},
      {'name': 'USB Host Fault', 'severity': 'critical'},
      {'name': 'DCC 2 Fault', 'severity': 'critical'},
      {'name': 'CPU Self-check Fault', 'severity': 'critical'}
    ]
  },

  /*
  * RM4 ESM G2
  */
  'RM4 ESM G2 Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'CCM R4 Fault', 'severity': 'critical'},
      {'name': 'FMC Fault', 'severity': 'critical'},
      {'name': 'B0TCM Fault', 'severity': 'critical'},
      {'name': 'B1TCM Fault', 'severity': 'critical'},
      {'name': 'B0TCM ADDX Fault', 'severity': 'critical'},
      {'name': 'B1TCM ADDX Fault', 'severity': 'critical'},
      {'name': 'FLASH ATCM ADDX Fault', 'severity': 'critical'},
      {'name': 'RTI WWD NMI Group2 24 Fault', 'severity': 'critical'}
    ]
  },

  /*
  * RM4 EEPROM
  */
  'RM4 EEPROM Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'EEPROM not init Fault', 'severity': 'critical'},
      {'name': 'Erase sector Fault', 'severity': 'critical'},
      {'name': 'Write buffer Fault', 'severity': 'critical'},
      {'name': 'Read out of range Fault', 'severity': 'critical'}
    ]
  },

  /*
  * RM4 System
  */
  'RM4 System Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  /*
  * EMAC
  */
  'EMAC Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  /*
  * BIST
  */
  'BIST Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Self-check Fault', 'severity': 'critical'},
      {'name': 'Ram test Fault', 'severity': 'critical'}
    ]
  },

  /*
  * DMA
  */
  'DMA Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  /*
  * i2c
  */
  'I2C Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Write time-out Fault', 'severity': 'critical'},
      {'name': 'Read time-out Fault', 'severity': 'critical'}
    ]
  },

  /*
  * FCU - Flight control unit
  */
  'FCU Core Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Guarding Fault', 'severity': 'critical'}
    ]
  },

  // Flight Control - Laser Contrast 0"
  'LaserContrast0 System Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'Guarding Fault', 'severity': 'critical'}
    ]
  },
  'LaserContrast0 Laser Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'Guarding Fault', 'severity': 'critical'}
    ]
  },

  // AuxProp
  'AuxProp Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  // All Fault Flags
  'All Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'Accel Subsystem Fault', 'severity': 'critical'},
      {'name': 'ASI Subsystem Fault', 'severity': 'critical'},
      {'name': 'Brakes Subsystem Fault', 'severity': 'critical'},
      {'name': 'DAQ Fault', 'severity': 'critical'},
      {'name': 'FCU Fault', 'severity': 'critical'},
      {'name': 'Laser Contrast Fault', 'severity': 'critical'},
      {'name': 'Laser Distance Fault', 'severity': 'critical'},
      {'name': 'OptoNCDT Fault', 'severity': 'critical'},
      {'name': 'Networking Fault', 'severity': 'critical'},
      {'name': 'Pusher Subsystem Fault', 'severity': 'critical'},
      {'name': 'Throttle Subsystem Fault', 'severity': 'critical'}
    ]
  },

  // ASI
  'ASI Fault Flags Root': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'PHY Failure', 'severity': 'critical'},
      {'name': 'Guarding Fault', 'severity': 'critical'}
    ]
  },

  // DAQ
  'DAQ Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  // Networking
  'Networking Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  // Pusher
  'Pusher Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'}
    ]
  },

  // Pod Health
  'Pod Health Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'Battery Pack Temperature Range', 'severity': 'critical'},
      {'name': 'Battery Cell Temperature Range', 'severity': 'critical'},
      {'name': 'Battery Voltage Range', 'severity': 'critical'},
      {'name': 'Battery Cell Voltage Range', 'severity': 'critical'},
      {'name': 'Battery Current Range', 'severity': 'critical'},
      {'name': 'HE Temp Range', 'severity': 'critical'},
      {'name': 'HE Current Range', 'severity': 'critical'},
      {'name': 'HE Voltage Range', 'severity': 'critical'},
      {'name': 'HE RPMs Range', 'severity': 'critical'},
      {'name': 'PV Pressure Range', 'severity': 'critical'},
      {'name': 'PV Temperature Range', 'severity': 'critical'}
    ]
  },

  // TrackDB
  'TrackDB Fault Flags': {
    'smallEndian': true,
    'template': [
      {'name': 'General Fault', 'severity': 'critical'},
      {'name': 'Struct size mismatch', 'severity': 'critical'}
    ]
  }
};
