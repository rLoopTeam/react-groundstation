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
			}
		]
}