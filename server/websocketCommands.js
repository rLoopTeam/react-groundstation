
module.exports = function (io, udp, room, logger, podCommands, commConfig, daq, config, romIDScanner,poddaq, charger)
{
	var updateClientWithDatalogs = true;

	//flag used to allow/disallow Move Motor Raw command (EXTREAM DANGER WILL DAMAGE MAGNETS)
	var _brakeDevelopmentConfirmation = false;

	var _timer;

	var websocket = {};

	// socket.io demo
	io.on('connection', function (socket) {

	  /*
	  if(!udp.rx.listeningForUdp)
		startListening();*/

	  function startListening(){ // listen for udp packets
	  /*
		udp.rx.listeningForUdp = true;
		udp.rx.server().on('message', function (message, remote) {
			console.log("GROUNSTATION UDP - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);
			logger.log("debug", "GROUNSTATION UDP - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);

			if(updateClientWithDatalogs)
			{
			  socket.in('dataLogging').emit('udp:event', {
				log: remote.address + ':' + remote.port +' - ' + message
			  });
			}
		});*/
	  }

	  websocket.events = {

			'forceDisconnect': () => {

				socket.disconnect();

			},

			'XilinxSim:StartRun': (data) => {
				podCommands.XilinxSim_Start();
			},
			'XilinxSim:StopRun': (data) => {
				podCommands.XilinxSim_Stop();
			},
			'XilinxSim:Laser0_On': (data) => {
				podCommands.XilinxSim_Laser0On();
			},
			'XilinxSim:Laser0_Off': (data) => {
				podCommands.XilinxSim_Laser0Off();
			},
			'XilinxSim:Laser1_On': (data) => {
				podCommands.XilinxSim_Laser1On();
			},
			'XilinxSim:Laser1_Off': (data) => {
				podCommands.XilinxSim_Laser1Off();
			},
			'XilinxSim:Laser2_On': (data) => {
				podCommands.XilinxSim_Laser2On();
			},
			'XilinxSim:Laser2_Off': (data) => {
				podCommands.XilinxSim_Laser2Off();
			},


			'FlightControl_Brake:MoveMotorRAW': (data) => {

				// THIS IS EXTREAMLY DANGEROUS (WILL DAMAGE MAGNETS)

				podCommands.FCUBrake_MoveMotorRAW(data);

			},

			'FlightControl_Brake:MoveMotorIBeam': (data) => {

				// THIS IS EXTREAMLY DANGEROUS (WILL DAMAGE MAGNETS)

				podCommands.FCUBrake_MoveMotorIBeam(data);

			},


			'FlightControl_Brake:BeginInit': (data) => {

				// THIS IS EXTREAMLY DANGEROUS (WILL DAMAGE MAGNETS)

				podCommands.FCUBrake_BeginInit(data);

			},

			'FlightControl_Brake:SetZeroLeftBrake': () => {
				// THIS IS EXTREAMLY DANGEROUS (WILL DAMAGE MAGNETS)
				podCommands.FCUBrake_MLPSetZeroLeftBrake();
			},

			'FlightControl_Brake:SetZeroRightBrake': () => {
				// THIS IS EXTREAMLY DANGEROUS (WILL DAMAGE MAGNETS)
				podCommands.FCUBrake_MLPSetZeroRightBrake();
			},

			'FlightControl_Brake:SetSpanLeftBrake': () => {
				// THIS IS EXTREAMLY DANGEROUS (WILL DAMAGE MAGNETS)
				podCommands.FCUBrake_MLPSetSpanLeftBrake();
			},

			'FlightControl_Brake:SetSpanRightBrake': () => {
				// THIS IS EXTREAMLY DANGEROUS (WILL DAMAGE MAGNETS)
				podCommands.FCUBrake_MLPSetSpanRightBrake();
			},

			'FlightControl_Stepper:SetMaxAngularAccel': (data) => {
				podCommands.FCUStepper_SetMaxAngularAccel(data);
			},

			'FlightControl_Stepper:SetPicoMetersPerRev': (data) => {
				podCommands.FCUStepper_SetPicoMetersPerRev(data);
			},

			'FlightControl_Stepper:SetMicroStepReslution': (data) => {
				podCommands.FCUStepper_SetMicroStepResolution(data);
			},

			'FlightControl_Stepper:SetMaxRPM': (data) => {
				podCommands.FCUStepper_SetMaxRPM(data);
			},

			'FlightControl_Brake:DisableDevelopmentMode': () => {

				podCommands.FCUBrake_DisableDevelopmentMode();

			},

			'FlightControl_Brake:EnableDevelopmentMode': () => {

				// THIS IS VERY VERY DANGEROUS

				podCommands.FCUBrake_EnableDevelopmentMode();

			},

			'FlightControl_Brake:RequestDevelopmentMode': () => {

				podCommands.FCUBrake_RequestDevelopmentMode()

			},

			//accels
			'FlightControl_Accel:StartStream_CalData': () => {
				podCommands.FCUStreamingControlStart_AccelCalData()
			},
			'FlightControl_Accel:StartStream_FullData': () => {
				podCommands.FCUStreamingControlStart_AccelFullData()
			},
			'FlightControl_Accel:StartStream_Lasers': () => {
				podCommands.FCUStreamingControlStart_Lasers()
			},
			'FlightControl_Accel:StopStream': () => {
				podCommands.FCUStreamingControlStop_Accel()
			},
			'FlightControl_Accel:FineZero': (data) => {
				podCommands.FCUAccel_FineZero(data)
			},
			'FlightControl_Accel:AutoZero': (data) => {
				podCommands.FCUAccel_AutoZero(data)
			},
			'FlightControl:Stream_Brakes': (data) => {
				podCommands.FCUStreamingControlStart_Brakes();
			},
			'FlightControl:Stream_MotorsRaw': (data) => {
				podCommands.FCUStreamingControlStart_MotorsRaw();
			},

			//Contrast sensor streaming control
			'FlightControl_Contrast:StartStream': () => {
				podCommands.FCUContrast_StartStream()
			},
			'FlightControl_Contrast:StopStrean': () => {
				podCommands.FCUContrast_StopStream()
			},
			
			'PowerA:ChargeRelayOn':(data) => {
				podCommands.PowerAChargeRelayOn(data.status)
			},
			
			'PowerB:ChargeRelayOn':(data) => {
				podCommands.PowerBChargeRelayOn(data.status)
			},

			'Charger:LowCurrent':(data) => {
				charger.setMaxBatteryCurrent(1);
				charger.setBoostToFloatBatteryCurrent(1);
				charger.setFloatToBoostBatteryCurrent(1);
			},

			'Charger:ChargingCurrent':(data) => {
				charger.setMaxBatteryCurrent(14);
				charger.setBoostToFloatBatteryCurrent(14);
				charger.setFloatToBoostBatteryCurrent(14);
			},

		    //Hover Engines
            'FlightControl_Hover:Enable': () => {
                podCommands.FCUHover_Enable()
			},
            'FlightControl_Hover:Disable': () => {
                podCommands.FCUHover_Disable()
			},
            'FlightControl_Hover:EnableStaticHovering': () => {
                podCommands.FCUHover_EnableStaticHovering()
			},
            'FlightControl_Hover:ReleaseStaticHovering': () => {
                podCommands.FCUHover_ReleaseStaticHovering()
			},
            'FlightControl_Hover:EnableHEX': (data) => {
                podCommands.FCUHover_EnableHEX(data.hexName)
			},
            'FlightControl_Hover:DisableHEX': (data) => {
                podCommands.FCUHover_DisableHEX(data.hexName)
			},
			
            'FlightControl_Hover:SetHEXSpeed': (data) => {
                podCommands.FCUHover_SetHEXSpeed(data.hexName, data.hexSpeed)
			},
			
            'FlightControl_Hover:StartCooling': (data) => {
                podCommands.FCUHover_StartCooling(data.coolingName)
			},
            'FlightControl_Hover:StopCooling': (data) => {
                podCommands.FCUHover_StopCooling(data.coolingName)
			},
            'FlightControl_Hover:OpenSolenoid': (data) => {
                podCommands.FCUHover_OpenSolenoid(data.solenoidName)
			},


		    //Aux Propulsion
            'FlightControl_AuxProp:Enable': (data) => {
                podCommands.FCUAuxProp_Enable();
            },
            'FlightControl_AuxProp:Disable': (data) => {
                podCommands.FCUAuxProp_Disable();
            },
            'FlightControl_AuxProp:SetSpeed': (data) => {
                podCommands.FCUAuxProp_SetSpeed(data.speed);
            },


		    //Gimbals
            'FlightControl_Gimbal:StaticGimbaling': (data) => {
                podCommands.FCUGimbal_Static();
            },
            'FlightControl_Gimbal:FullBackwards': (data) => {
                podCommands.FCUGimbal_FullBackwards();
            },


			'PowerA:StreamingOff':(data) => {
				podCommands.PowerAStreamingOff();
			},
	
			'PowerA:StreamCurrentTemps':(data) => {
				podCommands.PowerAStreamCurrentTemps();
			},
	
			'PowerA:StreamTempLocations':(data) => {
				podCommands.PowerAStreamTempLocations();
			},

			'PowerB:StreamingOff':(data) => {
				podCommands.PowerBStreamingOff();
			},
	
			'PowerB:StreamCurrentTemps':(data) => {
				podCommands.PowerBStreamCurrentTemps();
			},
	
			'PowerB:StreamTempLocations':(data) => {
				podCommands.PowerBStreamTempLocations();
			},

			'PowerA:TempSensorROMIDScan':(data) => {
				romIDScanner.BeginScanA(data.numOfSensors);
			},

			'PowerB:TempSensorROMIDScan':(data) => {
				romIDScanner.BeginScanB(data.numOfSensors);
			},

			//These are BMS Streams
			'PowerA:RequestBMS':(data) => {
				podCommands.PowerARequestBMS();
			},
			'PowerB:RequestBMS':(data) => {
				podCommands.PowerBRequestBMS();
			},

			'PowerA:StartCharging':(data) => {
				podCommands.PowerAStartCharging();
			},
			'PowerA:StopCharging':(data) => {
				podCommands.PowerAStopCharging();
			},

			'PowerB:StartCharging':(data) => {
				podCommands.PowerBStartCharging();
			},
			'PowerB:StopCharging':(data) => {
				podCommands.PowerBStopCharging();
			},

			'PowerA:StartDischarging':(data) => {
				podCommands.PowerAStartDischarging(data);
			},
			'PowerA:StopDischarging':(data) => {
				podCommands.PowerAStopDischarging(data);
			},

			'PowerB:StartDischarging':(data) => {
				podCommands.PowerBStartDischarging(data);
			},
			'PowerB:StopDischarging':(data) => {
				podCommands.PowerBStopDischarging(data);
			},

			'PowerA:StopManualDischarging':(data) => {
				podCommands.PowerAStopAllManualDischarging(data);
			},
			'PowerB:StopManualDischarging':(data) => {
				podCommands.PowerBStopAllManualDischarging(data);
			},

            'PowerA:RequestCooling': (data) => {
                podCommands.PowerARequestCooling(data);
			},
            'PowerA:StartCooling': (data) => {
                podCommands.PowerAStartCooling(data);
			},

            'PowerB:RequestCooling': (data) => {
                podCommands.PowerBRequestCooling(data);
			},
            'PowerB:StartCooling': (data) => {
                podCommands.PowerBStartCooling(data);
			},

            'PowerA:StartRepressurizing': (data) => {
                podCommands.PowerAStartRepressurizing(data);
			},

            'PowerB:StartRepressurizing': (data) => {
                podCommands.PowerBStartRepressurizing(data);
			},

            'PowerA:TestSolenoidPin4': (data) => {
                podCommands.PowerATestSolenoidPin4(data);
			},
            'PowerA:TestSolenoidPin8': (data) => {
                podCommands.PowerATestSolenoidPin8(data);
			},
            'PowerA:TestSolenoidPin16': (data) => {
                podCommands.PowerATestSolenoidPin16(data);
			},
            'PowerA:TestSolenoidPin22': (data) => {
                podCommands.PowerATestSolenoidPin22(data);
			},
            'PowerA:TestSolenoidPin23': (data) => {
                podCommands.PowerATestSolenoidPin23(data);
			},

            'PowerB:TestSolenoidPin4': (data) => {
                podCommands.PowerBTestSolenoidPin4(data);
			},
            'PowerB:TestSolenoidPin8': (data) => {
                podCommands.PowerBTestSolenoidPin8(data);
			},
            'PowerB:TestSolenoidPin16': (data) => {
                podCommands.PowerBTestSolenoidPin16(data);
			},
            'PowerB:TestSolenoidPin22': (data) => {
                podCommands.PowerBTestSolenoidPin22(data);
			},
            'PowerB:TestSolenoidPin23': (data) => {
                podCommands.PowerBTestSolenoidPin23(data);
			},

			'PowerA:LatchRelay':(data) => {
				podCommands.PowerAPowerLatch(data);
			},

			'PowerB:LatchRelay':(data) => {
				podCommands.PowerBPowerLatch(data);
			},

			'PowerA:ToPowerB':(data) => {
				podCommands.PowerAToPowerB();
			},

			'PowerB:ToPowerA':(data) => {
				podCommands.PowerBToPowerA();
			},

			'PodSafe':() => {
				podCommands.PodSafePowerNodeA();
				podCommands.PodSafePowerNodeB();
			},

			'ForcePreRunPhase':() => {
				podCommands.ForcePreRunPhase();
			},

			'AllLogging:Start': function(data){

				console.log("Starting local logging.");
				daq.isLogging = true;
				poddaq.isLogging = true;

			},'AllLogging:Stop': function(data){

				console.log("Stopping local logging.");
				daq.isLogging = false;
				poddaq.isLogging = false;
			},

			'client event': (data) => {

				socket.broadcast.emit('update label', data);

			},

			'start:dataLogs': (data) => {

				if(_timer)
				{

					clearInterval(_timer)

				}

				_timer = setInterval(() => {

					udp.tx.sendMessage("Thanks Pod, message received")

				}, 2500);

				updateClientWithDatalogs = true;

			},

			'stop:dataLogs': (data) => {

				if(_timer)
				{

				clearInterval(_timer)

				}

				udp.tx.sendMessage("DataLogs are no longer listening")

				updateClientWithDatalogs = false;

			},

			'power:Pod': () => {

				podCommands.FCUPod_Off();

			},

			'power:Latch': (data) => {

				podCommands.FCUPod_PowerLatch(data);

			},

			'stop:Pod': () => {

				podCommands.FCUPod_Stop();

			},

			'join': (data) => {

				var name = data.name;

				room[data.room] = data.room; //add name of room to the list of rooms

				socket.join(room[data.room]);

				console.log(name + ' joined the group. '+ socket.id);

				socket.in(room[data.room]).emit('udp:event', {log: name + ' joined the group: ' + room[data.room]});

			},

			'sendParameter': (data) => {

				podCommands.SendParameter(data);

			},

			'setIpAndPort': (data) => {

				udp.rx.updateConnectionData(data).then(() => {

				console.log('udp starting to listen again')

				if(!udp.rx.listeningForUdp)

					startListening()

				})

				udp.tx.sendMessage(JSON.stringify(data))

			},

			'lgu:positionChange': (data) => {

                podCommands.LGU_PositionChange(data.liftName, data.liftDirection)

			},

			'lgu:speedChange': (data) => {

				podCommands.LGU_SpeedChange(data.liftName, data.liftSpeed)

			},

            'AutoSequenceTest:Start': (data) => {
                podCommands.AutoSequenceTest_Start();
            },
            'AutoSequenceTest:Skip': (data) => {
                podCommands.AutoSequenceTest_Skip();
            },
            'AutoSequenceTest:Kill': (data) => {
                podCommands.AutoSequenceTest_Kill();
            },
            'AutoSequenceTest:Restart': (data) => {
                podCommands.AutoSequenceTest_Restart();
            },


			'disconnect': () => {

				console.log('Server got disconnected!');

			},

			'commConfig:req': (data) => {

				socket.in(room.commConfig).emit('commConfig:res', commConfig);

			},

            'update_commConfig': (data) => {

			    //console.log('data: %O', data); //DEBUG
                config.writeCommConfig(data);
            },

            'GS_Heartbeat': () => {
            	podCommands.GS_Heartbeat();
            }


	  }


	  for (const event in websocket.events){

		  socket.on (event, (data) => {

			websocket.events[event](data);

		  })

	  }

	});

};