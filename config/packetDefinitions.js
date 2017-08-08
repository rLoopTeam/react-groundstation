module.exports = {
  packetDefinitions:
  [
    {
      'Name': 'Power A Current Temps',
      'ParameterPrefix': 'Power A Temps ',
      'PacketType': 0x3201,
      'Node': 'Power Node A',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Count', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Spare', 'type': 'uint16', 'units': 'RAW', 'size': 2},

                {'Name': 'Temperature', 'type': 'float32', 'units': 'C', 'size': 4, 'beginLoop': true, 'endLoop': true}
      ]
    },

    {
      'Name': 'Power B Current Temps',
      'ParameterPrefix': 'Power B Temps ',
      'PacketType': 0x3201,
      'Node': 'Power Node B',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Count', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Spare', 'type': 'uint16', 'units': 'RAW', 'size': 2},

                {'Name': 'Temperature', 'type': 'float32', 'units': 'C', 'size': 4, 'beginLoop': true, 'endLoop': true}
      ]
    },

    {
      'Name': 'Power A Current Temps Locations',
      'ParameterPrefix': 'Power A Temps Loc ',
      'PacketType': 0x3203,
      'Node': 'Power Node A',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Number of Temps', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Spare', 'type': 'uint16', 'units': 'RAW', 'size': 2},

                {'Name': 'User Index', 'type': 'uint16', 'units': 'Hex', 'size': 2, 'beginLoop': true},
                {'Name': 'Resolution', 'type': 'uint8', 'units': 'bits', 'size': 1},
                {'Name': 'Bus Index', 'type': 'uint8', 'units': '', 'size': 1, 'endLoop': true}
      ]
    },

    {
      'Name': 'Power B Current Temps Locations',
      'ParameterPrefix': 'Power B Temps Loc ',
      'PacketType': 0x3203,
      'Node': 'Power Node B',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Number of Temps', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Spare', 'type': 'uint16', 'units': 'RAW', 'size': 2},

                {'Name': 'User Index', 'type': 'uint16', 'units': 'Hex', 'size': 2, 'beginLoop': true},
                {'Name': 'Resolution', 'type': 'uint8', 'units': 'bits', 'size': 1},
                {'Name': 'Bus Index', 'type': 'uint8', 'units': '', 'size': 1, 'endLoop': true}
      ]
    },

    {
      'Name': 'Power A ROM ID',
      'ParameterPrefix': 'Power A ROM ',
      'PacketType': 0x3205,
      'Node': 'Power Node A',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Index', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Hi', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Lo', 'type': 'uint32', 'units': '', 'size': 4}
      ]
    },
    {
      'Name': 'Power B ROM ID',
      'ParameterPrefix': 'Power B ROM ',
      'PacketType': 0x3205,
      'Node': 'Power Node B',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Index', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Hi', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Lo', 'type': 'uint32', 'units': '', 'size': 4}
      ]
    },
    {
      'Name': 'Auto-sequence test',
      'ParameterPrefix': 'Auto-test ',
      'PacketType': 0x1901,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': 'State', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Status', 'type': 'uint8', 'units': '', 'size': 1}
      ]
    },
    {
      'Name': 'Power A BMS',
      'ParameterPrefix': 'Power A BMS ',
      'PacketType': 0x3401,
      'Node': 'Power Node A',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Faults', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Temp State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Charger State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Num Temp Sensors', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Highest Sensor Value', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Average Temp', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Highest Sensor Index', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Pack Volts', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Highest Cell Volts', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Lowest Cell Volts', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Board Temp', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Node Pressure', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Node Temp', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': '1 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '2 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '3 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '4 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '5 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '6 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '7 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '8 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '9 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '10 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '11 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '12 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '13 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '14 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '15 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '16 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '17 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '18 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '1 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '2 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '3 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '4 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '5 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '6 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '7 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '8 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '9 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '10 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '11 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '12 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '13 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '14 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '15 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '16 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Voltage Updates', 'type': 'uint32', 'units': 'updates', 'size': 4},
                {'Name': 'Temp Scan Count', 'type': 'uint32', 'units': 'scans', 'size': 4},
                {'Name': 'Pack Current', 'type': 'float32', 'units': 'A', 'size': 4}
      ]
    },

    {
      'Name': 'Power B BMS',
      'ParameterPrefix': 'Power B BMS ',
      'PacketType': 0x3401,
      'Node': 'Power Node B',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Faults', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Temp State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Charger State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Num Temp Sensors', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Highest Sensor Value', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Average Temp', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Highest Sensor Index', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Pack Volts', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Highest Cell Volts', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Lowest Cell Volts', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Board Temp', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Node Pressure', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Node Temp', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': '1 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '2 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '3 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '4 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '5 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '6 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '7 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '8 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '9 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '10 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '11 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '12 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '13 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '14 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '15 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '16 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '17 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '18 Module Voltage', 'type': 'float32', 'units': 'V', 'size': 4},
                {'Name': '1 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '2 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '3 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '4 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '5 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '6 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '7 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '8 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '9 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '10 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '11 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '12 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '13 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '14 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '15 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': '16 BMS ID', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Voltage Updates', 'type': 'uint32', 'units': 'updates', 'size': 4},
                {'Name': 'Temp Scan Count', 'type': 'uint32', 'units': 'scans', 'size': 4},
                {'Name': 'Pack Current', 'type': 'float32', 'units': 'A', 'size': 4}
      ]
    },

    {
      'Name': 'Power A Cooling',
      'ParameterPrefix': 'Power A Cooling ',
      'PacketType': 0x3601,
      'Node': 'Power Node A',
      'DAQ': false,
      'Parameters': [
                {'Name': 'State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover1/2 Temp', 'type': 'int32', 'units': 'degF', 'size': 4},
                {'Name': 'Hover1/2 Cooling State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover1/2 Solenoid State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover1/2 Solenoid Pin', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover3/4 Temp', 'type': 'int32', 'units': 'degF', 'size': 4},
                {'Name': 'Hover3/4 Cooling State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover3/4 Solenoid State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover3/4 Solenoid Pin', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover5/6 Temp', 'type': 'int32', 'units': 'degF', 'size': 4},
                {'Name': 'Hover5/6 Cooling State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover5/6 Solenoid State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover5/6 Solenoid Pin', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover7/8 Temp', 'type': 'int32', 'units': 'degF', 'size': 4},
                {'Name': 'Hover7/8 Cooling State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover7/8 Solenoid State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Hover7/8 Solenoid Pin', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'EddyBrake Temp', 'type': 'int32', 'units': 'degF', 'size': 4},
                {'Name': 'EddyBrake Cooling State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'EddyBrake Solenoid State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'EddyBrake Solenoid Pin', 'type': 'uint8', 'units': '', 'size': 1}
      ]
    },

    {
      'Name': 'Accel Cal Full',
      'ParameterPrefix': 'Accel ',
      'PacketType': 0x1001,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': '0 Flags', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': '0 X Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '0 Y Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '0 Z Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},

                {'Name': '1 Flags', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': '1 X Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '1 Y Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '1 Z Raw', 'type': 'int16', 'units': 'RAW', 'size': 2}
      ]
    },
    {
      'Name': 'Accel Data Full',
      'ParameterPrefix': 'Accel ',
      'PacketType': 0x1003,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': '0 Flags', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': '0 X Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '0 Y Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '0 Z Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '0 X Gs', 'type': 'float32', 'units': 'Gs', 'size': 4},
                {'Name': '0 Y Gs', 'type': 'float32', 'units': 'Gs', 'size': 4},
                {'Name': '0 Z Gs', 'type': 'float32', 'units': 'Gs', 'size': 4},
                {'Name': '0 Pitch', 'type': 'float32', 'units': '°', 'size': 4},
                {'Name': '0 Roll', 'type': 'float32', 'units': '°', 'size': 4},
                {'Name': '0 Current Accel', 'type': 'int32', 'units': 'mmss', 'size': 4},
                {'Name': '0 Current Velocity', 'type': 'int32', 'units': 'mms', 'size': 4},
                {'Name': '0 Previous Velocity', 'type': 'int32', 'units': 'mms', 'size': 4},
                {'Name': '0 Current Displacement', 'type': 'int32', 'units': 'mm', 'size': 4},
                {'Name': '0 Previous Displacement', 'type': 'int32', 'units': 'mm', 'size': 4},

                {'Name': '1 Flags', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': '1 X Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '1 Y Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '1 Z Raw', 'type': 'int16', 'units': 'RAW', 'size': 2},
                {'Name': '1 X Gs', 'type': 'float32', 'units': 'Gs', 'size': 4},
                {'Name': '1 Y Gs', 'type': 'float32', 'units': 'Gs', 'size': 4},
                {'Name': '1 Z Gs', 'type': 'float32', 'units': 'Gs', 'size': 4},
                {'Name': '1 Pitch', 'type': 'float32', 'units': '°', 'size': 4},
                {'Name': '1 Roll', 'type': 'float32', 'units': '°', 'size': 4},
                {'Name': '1 Current Accel', 'type': 'int32', 'units': 'mmss', 'size': 4},
                {'Name': '1 Current Velocity', 'type': 'int32', 'units': 'mms', 'size': 4},
                {'Name': '1 Previous Velocity', 'type': 'int32', 'units': 'mms', 'size': 4},
                {'Name': '1 Current Displacement', 'type': 'int32', 'units': 'mm', 'size': 4},
                {'Name': '1 Previous Displacement', 'type': 'int32', 'units': 'mm', 'size': 4}

      ]
    },
    {
      'Name': 'Brake Cal Full',
      'ParameterPrefix': 'Brake ',
      'PacketType': 0x0000, // defined in the packet section of confluence for FCU
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Parking', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Left Screw Pos', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Right Screw Pos', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Left Extend Limit', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Right Extend Limit', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Left Retract Limit', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Right Retract Limit', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'FL I-Beam Dist', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'RL I-Beam Dist', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'FR I-Beam Dist', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'RR I-Beam Dist', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Left MLP Raw', 'type': 'int16', 'units': 'mm', 'size': 2},
                {'Name': 'Right MLP Raw', 'type': 'int16', 'units': 'mm', 'size': 2},
                {'Name': 'Left MLP Scaled', 'type': 'int16', 'units': 'mm', 'size': 2},
                {'Name': 'Right MLP Scaled', 'type': 'int16', 'units': 'mm', 'size': 2}
      ]
    },
    {
      'Name': 'Brake data',
      'ParameterPrefix': 'Brake ',
      'PacketType': 0x1402,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Fault flags 1', 'type': 'uint32', 'units': 'A', 'size': 4},

                {'Name': 'I Beam mm 1 Target', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Lead screw mm 1 Target', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Lead screw um 1 Target', 'type': 'uint32', 'units': 'um', 'size': 4},

                {'Name': 'I Beam mm 1 Current', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Lead Screw mm 1 Current', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'MLP 1 Current', 'type': 'float32', 'units': 'mm', 'size': 4},

                {'Name': 'Spare 1', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Spare 1', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Limit Extend 1', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Limit Retract 1', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Limit Extend Edge 1', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Limit Retract Edge 1', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'SW Error 1', 'type': 'uint8', 'units': '', 'size': 1},

                {'Name': 'ADC Sample 1', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ADC Zero 1', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ADC Minus Zero 1', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'System Span 1', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Position mm 1', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Linear Velocity 1', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Linear Acceleration 1', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Current Position 1', 'type': 'int32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 2', 'type': 'uint32', 'units': 'A', 'size': 4},

                {'Name': 'I Beam mm 2 Target', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Lead screw mm 2 Target', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Lead screw um 2 Target', 'type': 'uint32', 'units': 'um', 'size': 4},

                {'Name': 'I Beam mm 2 Current', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Lead Screw mm 2 Current', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'MLP 2 Current', 'type': 'float32', 'units': 'mm', 'size': 4},

                {'Name': 'Limit Extend 2', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Limit Retract 2', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Limit Extend Edge 2', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Limit Retract Edge 2', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'SW Error 2', 'type': 'uint8', 'units': '', 'size': 1},

                {'Name': 'ADC Sample 2', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ADC Zero 2', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ADC Minus Zero 2', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'System Span 2', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Position mm 2', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Linear Velocity 2', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Linear Acceleration 2', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Current Position 2', 'type': 'int32', 'units': '', 'size': 4},

                {'Name': 'State', 'type': 'uint8', 'units': '', 'size': 1},
                {'Name': 'Calibration State', 'type': 'uint8', 'units': '', 'size': 1}
      ]
    },
    {
      'Name': 'Throttle parameters',
      'ParameterPrefix': 'Throttle ',
      'PacketType': 0x1503,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Requested RPM 1', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Requested RPM 2', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Requested RPM 3', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Requested RPM 4', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Requested RPM 5', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Requested RPM 6', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Requested RPM 7', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Requested RPM 8', 'type': 'uint16', 'units': '', 'size': 2},

                {'Name': 'Current RPM 1', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Current RPM 2', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Current RPM 3', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Current RPM 4', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Current RPM 5', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Current RPM 6', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Current RPM 7', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Current RPM 8', 'type': 'uint16', 'units': '', 'size': 2},

                {'Name': 'ASI RPM 1', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ASI RPM 2', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ASI RPM 3', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ASI RPM 4', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ASI RPM 5', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ASI RPM 6', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ASI RPM 7', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'ASI RPM 8', 'type': 'uint16', 'units': '', 'size': 2}
      ]
    },
    {
      'Name': 'Motor parameters',
      'ParameterPrefix': 'Motor ',
      'PacketType': 0x1406,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Microstep Resolution 1', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Max Acceleration 1', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Microns per Revolution 1', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Steps per Revolution 1', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Max Angular Velocity 1', 'type': 'int32', 'units': '', 'size': 4},

                {'Name': 'Microstep Resolution 2', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Max Acceleration 2', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Microns per Revolution 2', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Steps per Revolution 2', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Max Angular Velocity 2', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Lowest Cell Volts', 'type': 'float32', 'units': '', 'size': 4}
      ]
    },
    {
      'Name': 'Laser Opto Sensor',
      'ParameterPrefix': 'LaserOpto ',
      'PacketType': 0x1101,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Fault flags', 'type': 'uint32', 'units': '', 'size': 4}, // top-level fault flags
                {'Name': 'Spare', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 1', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Laser error packet count 1', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'First byte wrong 1', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Raw distance 1', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Filtered value 1', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 1', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 2', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Laser error packet count 2', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'First byte wrong 2', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Raw distance 2', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Filtered value 2', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 2', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 3', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Laser error packet count 3', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'First byte wrong 3', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Raw distance 3', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Filtered value 3', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 3', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 4', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Laser error packet count 4', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'First byte wrong 4', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Raw distance 4', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Filtered value 4', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 4', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 5', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Laser error packet count 5', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'First byte wrong 5', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Raw distance 5', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Filtered value 5', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 5', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 6', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Laser error packet count 6', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'First byte wrong 6', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Raw distance 6', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Filtered value 6', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 6', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 7', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Laser error packet count 7', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'First byte wrong 7', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Raw distance 7', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Filtered value 7', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 7', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Fault flags 8', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Laser error packet count 8', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'First byte wrong 8', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Raw distance 8', 'type': 'float32', 'units': '', 'size': 4},
                {'Name': 'Filtered value 8', 'type': 'float32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 8', 'type': 'uint32', 'units': '', 'size': 4}
      ]
    },
    {
      'Name': 'Forward Laser Distance Sensor',
      'ParameterPrefix': 'ForwardLaser ',
      'PacketType': 0x1201,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': 'Fault flags', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Spare 0', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Spare 1', 'type': 'int32', 'units': '', 'size': 4},
				{'Name': 'Spare 2', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'RAW value', 'type': 'int32', 'units': '', 'size': 4},
                {'Name': 'Filtered value', 'type': 'int32', 'units': 'mm', 'size': 4},
                {'Name': 'Spare 3', 'type': 'int32', 'units': '', 'size': 4},
				{'Name': 'Binary Distance', 'type': 'uint32', 'units': '', 'size': 4},
				{'Name': 'Missed Start', 'type': 'uint32', 'units': '', 'size': 4},
				{'Name': 'Bad Distance', 'type': 'uint32', 'units': '', 'size': 4},
				{'Name': 'Error Code', 'type': 'uint32', 'units': '', 'size': 4}
				
      ]
    },
    {
      'Name': 'Flight Control - Laser Contrast 0',
      'ParameterPrefix': 'LaserContrast0 ',
      'PacketType': 0x1301,
      'Node': 'Flight Control',
      'DAQ': false,
      'Parameters': [
                {'Name': 'System Fault Flags', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Spare 0', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Spare 1', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Spare 2', 'type': 'uint32', 'units': '', 'size': 4},
                {'Name': 'Spare 3', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Laser Fault Flags', 'type': 'uint32', 'units': '', 'size': 4},

                {'Name': 'Rising Count', 'type': 'uint16', 'units': '', 'size': 2},
                {'Name': 'Falling Count', 'type': 'uint16', 'units': '', 'size': 2},

                // 55 stripes
                {'Name': 'Rise_00', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_01', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_02', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_03', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_04', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_05', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_06', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_07', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_08', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_09', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Rise_10', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_11', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_12', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_13', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_14', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_15', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_16', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_17', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_18', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_19', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Rise_20', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_21', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_22', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_23', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_24', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_25', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_26', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_27', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_28', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_29', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Rise_30', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_31', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_32', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_33', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_34', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_35', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_36', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_37', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_38', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_39', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Rise_40', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_41', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_42', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_43', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_44', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_45', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_46', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_47', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_48', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_49', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Rise_50', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_51', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_52', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Rise_53', 'type': 'uint64', 'units': 'ns', 'size': 8},

                // 55 stripes
                {'Name': 'Fall_00', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_01', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_02', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_03', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_04', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_05', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_06', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_07', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_08', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_09', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Fall_10', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_11', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_12', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_13', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_14', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_15', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_16', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_17', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_18', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_19', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Fall_20', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_21', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_22', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_23', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_24', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_25', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_26', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_27', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_28', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_29', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Fall_30', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_31', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_32', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_33', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_34', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_35', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_36', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_37', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_38', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_39', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Fall_40', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_41', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_42', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_43', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_44', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_45', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_46', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_47', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_48', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_49', 'type': 'uint64', 'units': 'ns', 'size': 8},

                {'Name': 'Fall_50', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_51', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_52', 'type': 'uint64', 'units': 'ns', 'size': 8},
                {'Name': 'Fall_53', 'type': 'uint64', 'units': 'ns', 'size': 8}
      ]
    },
    {
      'Name': 'FCU DAQ CPU LOAD',
      'PacketType': 0x4000,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'uint8',
      'dataSize': 1
    },
    {
      'Name': 'FCU DAQ ACCEL 1 X',
      'PacketType': 0x4001,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int16',
      'dataSize': 2
    },
    {
      'Name': 'FCU DAQ ACCEL 1 Y',
      'PacketType': 0x4002,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int16',
      'dataSize': 2
    },
    {
      'Name': 'FCU DAQ ACCEL 1 Z',
      'PacketType': 0x4003,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int16',
      'dataSize': 2
    },
    {
      'Name': 'FCU DAQ ACCEL 2 X',
      'PacketType': 0x4004,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int16',
      'dataSize': 2
    },
    {
      'Name': 'FCU DAQ ACCEL 2 Y',
      'PacketType': 0x4005,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int16',
      'dataSize': 2
    },
    {
      'Name': 'FCU DAQ ACCEL 2 Z',
      'PacketType': 0x4006,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int16',
      'dataSize': 2
    },
    {
      'Name': 'FCU DAQ ACCEL 1 ACCEL',
      'PacketType': 0x4007,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int32',
      'dataSize': 4
    },
    {
      'Name': 'FCU DAQ ACCEL 1 VELOCITY',
      'PacketType': 0x4008,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int32',
      'dataSize': 4
    },
    {
      'Name': 'FCU DAQ ACCEL 1 DISPLACEMENT',
      'PacketType': 0x4009,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int32',
      'dataSize': 4
    },
    {
      'Name': 'FCU DAQ ACCEL 2 ACCEL',
      'PacketType': 0x400a,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int32',
      'dataSize': 4
    },
    {
      'Name': 'FCU DAQ ACCEL 2 VELOCITY',
      'PacketType': 0x400c,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int32',
      'dataSize': 4
    },
    {
      'Name': 'FCU DAQ ACCEL 2 DISPLACEMENT',
      'PacketType': 0x400d,
      'Node': 'Flight Control',
      'DAQ': true,
      'dataType': 'int32',
      'dataSize': 4
    }
  ]
};
