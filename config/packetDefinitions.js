module.exports = {
	packetDefinitions:
	[
			{
				"Name":"Test Packet",
				"ParameterPrefix":"Test 1: ",
				"PacketType":0x5000,
				"Parameters":[
								{'Name':'x', 'type':'uint8', 'units':'test1', 'size': 1},
								{'Name':'y', 'type':'int8', 'units':'test2', 'size': 1},
								{'Name':'a', 'type':'uint16', 'units':'NA', 'size': 2},
								{'Name':'b', 'type':'int16', 'units':'NA', 'size': 2},
								{'Name':'c', 'type':'uint32', 'units':'NA', 'size': 4},
								{'Name':'d', 'type':'int32', 'units':'NA', 'size': 4},
								{'Name':'e', 'type':'float32', 'units':'NA', 'size': 4},
								{'Name':'f', 'type':'float64', 'units':'millis since Unix Epoch', 'size': 8}
							]
			},
			
			{
				"Name":"Power A Current Temps",
				"ParameterPrefix":"Power A Temps",
				"PacketType":0x3201,
				"Parameters":[
								{'Name':'Number of Temps', 'type':'uint16', 'units':'', 'size': 2},
								{'Name':'Spare', 'type':'uint16', 'units':'RAW', 'size': 2},
								
								{'Name':'Temperature', 'type':'float32', 'units':'C', 'size': 4, 'beginLoop':true, 'endLoop':true},
							]
			},
			
			{
				"Name":"Power A Current Temps Locations",
				"ParameterPrefix":"Power A Temps Locs",
				"PacketType":0x3203,
				"Parameters":[
								{'Name':'Number of Temps', 'type':'uint16', 'units':'', 'size': 2},
								{'Name':'Spare', 'type':'uint16', 'units':'RAW', 'size': 2},
								
								{'Name':'User Index', 'type':'uint32', 'units':'Hex', 'size': 4, 'beginLoop':true},
								{'Name':'Resolution', 'type':'uint16', 'units':'bits', 'size': 4},
								{'Name':'Bus Index', 'type':'uint32', 'units':'', 'size': 4, 'endLoop':true},
							]
			},
			
			{
				"Name":"Accel Cal Full",
				"ParameterPrefix":"Accel ",
				"PacketType":0x1001,
				"Parameters":[
								{'Name':'0 Flags', 'type':'uint32', 'units':'', 'size': 4},
								{'Name':'0 X Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'0 Y Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'0 Z Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								
								{'Name':'1 Flags', 'type':'uint32', 'units':'', 'size': 4},
								{'Name':'1 X Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'1 Y Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'1 Z Raw', 'type':'int16', 'units':'RAW', 'size': 2},
							]
			},
			{
				"Name":"Accel Data Full",
				"ParameterPrefix":"Accel ",
				"PacketType":0x1003,
				"Parameters":[
								{'Name':'0 Flags', 'type':'uint32', 'units':'', 'size': 4},
								{'Name':'0 X Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'0 Y Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'0 Z Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'0 X Gs', 'type':'float32', 'units':'Gs', 'size': 4},
								{'Name':'0 Y Gs', 'type':'float32', 'units':'Gs', 'size': 4},
								{'Name':'0 Z Gs', 'type':'float32', 'units':'Gs', 'size': 4},
								{'Name':'0 Pitch', 'type':'float32', 'units':'degrees', 'size': 4},
								{'Name':'0 Roll', 'type':'float32', 'units':'degrees', 'size': 4},
								
								{'Name':'1 Flags', 'type':'uint32', 'units':'', 'size': 4},
								{'Name':'1 X Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'1 Y Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'1 Z Raw', 'type':'int16', 'units':'RAW', 'size': 2},
								{'Name':'1 X Gs', 'type':'float32', 'units':'Gs', 'size': 4},
								{'Name':'1 Y Gs', 'type':'float32', 'units':'Gs', 'size': 4},
								{'Name':'1 Z Gs', 'type':'float32', 'units':'Gs', 'size': 4},
								{'Name':'1 Pitch', 'type':'float32', 'units':'degrees', 'size': 4},
								{'Name':'1 Roll', 'type':'float32', 'units':'degrees', 'size': 4}
							]
			},
			{
				"Name":"Brake Cal Full",
				"ParameterPrefix":"Brake ",
				"PacketType":0x0000, //defined in the packet section of confluence for FCU
				"Parameters":[
								{'Name':'Parking', 'type':'uint8', 'units':'', 'size': 1},
								{'Name':'Left Screw Pos', 'type':'float32', 'units':'mm', 'size': 4},
								{'Name':'Right Screw Pos', 'type':'float32', 'units':'mm', 'size': 4},
								{'Name':'Left Extend Limit', 'type':'uint8', 'units':'', 'size': 1},
								{'Name':'Right Extend Limit', 'type':'uint8', 'units':'', 'size': 1},
								{'Name':'Left Retract Limit', 'type':'uint8', 'units':'', 'size': 1},
								{'Name':'Right Retract Limit', 'type':'uint8', 'units':'', 'size': 1},
								{'Name':'FL I-Beam Dist', 'type':'float32', 'units':'mm', 'size': 4},
								{'Name':'RL I-Beam Dist', 'type':'float32', 'units':'mm', 'size': 4},
								{'Name':'FR I-Beam Dist', 'type':'float32', 'units':'mm', 'size': 4},
								{'Name':'RR I-Beam Dist', 'type':'float32', 'units':'mm', 'size': 4},
								{'Name':'Left MLP Raw', 'type':'int16', 'units':'mm', 'size': 2},
								{'Name':'Right MLP Raw', 'type':'int16', 'units':'mm', 'size': 2},
								{'Name':'Left MLP Scaled', 'type':'int16', 'units':'mm', 'size': 2},
								{'Name':'Right MLP Scaled', 'type':'int16', 'units':'mm', 'size': 2},
							]
			},
			{
				"Name": "Laser Opto Sensor",
				"ParameterPrefix": "LaserOpto",
				"PacketType": 0x1101,
				"Parameters":[
								{'Name':'Fault flags', 'type':'uint32', 'units':'', 'size':4}, //top-level fault flags
								{'Name':'Spare', 'type':'uint32', 'units':'', 'size':4},

								{'Name':'Fault flags 1', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Laser error packet count 1', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'First byte wrong 1', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Raw distance 1', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value 1', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 1', 'type':'uint32', 'units':'', 'size':4},

								{'Name':'Fault flags 2', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Laser error packet count 2', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'First byte wrong 2', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Raw distance 2', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value 2', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 2', 'type':'uint32', 'units':'', 'size':4},

								{'Name':'Fault flags 3', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Laser error packet count 3', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'First byte wrong 3', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Raw distance 3', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value 3', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 3', 'type':'uint32', 'units':'', 'size':4},


								{'Name':'Fault flags 4', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Laser error packet count 4', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'First byte wrong 4', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Raw distance 4', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value 4', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 4', 'type':'uint32', 'units':'', 'size':4},
				
								{'Name':'Fault flags 5', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Laser error packet count 5', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'First byte wrong 5', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Raw distance 5', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value 5', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 5', 'type':'uint32', 'units':'', 'size':4},
				
								{'Name':'Fault flags 6', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Laser error packet count 6', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'First byte wrong 6', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Raw distance 6', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value 6', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 6', 'type':'uint32', 'units':'', 'size':4},
				
								{'Name':'Fault flags 7', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Laser error packet count 7', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'First byte wrong 7', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Raw distance 7', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value 7', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 7', 'type':'uint32', 'units':'', 'size':4},

								{'Name':'Fault flags 8', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Laser error packet count 8', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'First byte wrong 8', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Raw distance 8', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value 8', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 8', 'type':'uint32', 'units':'', 'size':4},
				]
			},
			{
				"Name": "Forward Laser Distance Sensor",
				"ParameterPrefix": "ForwardLaser",
				"PacketType": 0x1201,
				"Parameters":[
								{'Name':'Fault flags', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Spare 0', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'Spare 1', 'type':'uint32', 'units':'', 'size':4},
								{'Name':'RAW value', 'type':'float32', 'units':'', 'size':4},
								{'Name':'Filtered value', 'type':'float32', 'units':'mm', 'size':4},
								{'Name':'Spare 3', 'type':'uint32', 'units':'', 'size':4},
				]
			},
			{
				"Name":"Flight Control - Laser Contrast 0",
				"ParameterPrefix":"LaserContrast0 ",
				"PacketType":0x1301,
				"Parameters":[
								{'Name':'System Fault Flags', 'type':'uint32', 'units':'', 'size': 4},
								{'Name':'Spare 0', 'type':'uint32', 'units':'', 'size': 4},
								{'Name':'Spare 1', 'type':'uint32', 'units':'', 'size': 4},
								{'Name':'Spare 2', 'type':'uint32', 'units':'', 'size': 4},
								{'Name':'Spare 3', 'type':'uint32', 'units':'', 'size': 4},

								{'Name':'Laser Fault Flags', 'type':'uint32', 'units':'', 'size': 4},

								{'Name':'Rising Count', 'type':'uint16', 'units':'', 'size': 2},
								{'Name':'Falling Count', 'type':'uint16', 'units':'', 'size': 2},

								//55 stripes
								{'Name':'Rise_00', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_01', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_02', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_03', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_04', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_05', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_06', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_07', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_08', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_09', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Rise_10', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_11', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_12', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_13', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_14', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_15', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_16', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_17', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_18', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_19', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Rise_20', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_21', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_22', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_23', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_24', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_25', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_26', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_27', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_28', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_29', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Rise_30', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_31', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_32', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_33', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_34', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_35', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_36', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_37', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_38', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_39', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Rise_40', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_41', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_42', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_43', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_44', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_45', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_46', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_47', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_48', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_49', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Rise_50', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_51', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_52', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Rise_53', 'type':'uint64', 'units':'ns', 'size': 8},

								//55 stripes
								{'Name':'Fall_00', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_01', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_02', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_03', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_04', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_05', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_06', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_07', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_08', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_09', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Fall_10', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_11', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_12', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_13', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_14', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_15', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_16', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_17', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_18', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_19', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Fall_20', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_21', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_22', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_23', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_24', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_25', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_26', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_27', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_28', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_29', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Fall_30', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_31', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_32', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_33', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_34', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_35', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_36', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_37', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_38', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_39', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Fall_40', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_41', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_42', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_43', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_44', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_45', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_46', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_47', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_48', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_49', 'type':'uint64', 'units':'ns', 'size': 8},

								{'Name':'Fall_50', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_51', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_52', 'type':'uint64', 'units':'ns', 'size': 8},
								{'Name':'Fall_53', 'type':'uint64', 'units':'ns', 'size': 8},
						]
			},			
			
		]
}