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

			{
                "Name":"Battery A Temps",
                "ParameterPrefix":"Power Temperatures A ",
                "PacketType":0x3201,
                "Parameters":[
                                {'Name':'Number of Sensors', 'type':'uint16', 'units':'', 'size': 2},
                                {'Name':'Spare', 'type':'uint16', 'units':'', 'size': 2},
                                
                                {'Name':'1 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'2 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'3 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'4 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'5 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'6 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'7 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'8 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'9 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'10 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'11 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'12 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'13 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'14 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'15 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'16 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'17 Temp', 'type':'float32', 'units':'C', 'size': 4},
                                {'Name':'18 Temp', 'type':'float32', 'units':'C', 'size': 4},
                        ]
            },  
            
            
            {
                "Name":"Battery A Location Data",
                "ParameterPrefix":"Power Temperature ",
                "PacketType":0x3203,
                "Parameters":[
                                {'Name':'Number of Sensors', 'type':'uint16', 'units':'', 'size': 2},
                                {'Name':'Spare', 'type':'uint16', 'units':'', 'size': 2},
                
                                {'Name':'1 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'1 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'1 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'2 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'2 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'2 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'3 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'3 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'3 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'4 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'4 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'4 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'5 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'5 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'5 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'6 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'6 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'6 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'7 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'7 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'7 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'8 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'8 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'8 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'9 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'9 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'9 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'10 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'10 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'10 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'11 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'11 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'11 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'12 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'12 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'12 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'13 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'13 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'13 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'14 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'14 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'14 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'15 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'15 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'15 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'16 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'16 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'16 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'17 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'17 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'17 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                                
                                {'Name':'18 User Index', 'type':'uint16', 'units':'C', 'size': 2},
                                {'Name':'18 Resolution', 'type':'uint8', 'units':'C', 'size': 1},
                                {'Name':'18 Bus Index', 'type':'uint8', 'units':'C', 'size': 1},
                        ]
            },			
			
		]
}
