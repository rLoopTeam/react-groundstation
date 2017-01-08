const makeSafeUDPPackage = require('./makeSafeUDPPackage');

module.exports = function(udp){
    
    //flag allow/disallow the use of FCUBrake_MoveMotorRAW which is 
    //extreamly dangerous and will damage the magnets

    var _brakeDevelopmentConfirmation = false;

        function LGU_PositionChange(liftName, liftDirection) {
            console.log("Name:" + liftName + " Direction:" + liftDirection)
            //udp.tx.transmitPodCommand('????', 0x0000, 0x000000, 0x0, 0x0, 0x0) //TODO
        }

        function LGU_SpeedChange(liftName, liftSpeed) {
            console.log("Name:" + liftName + " Speed:" + liftSpeed)
            //udp.tx.transmitPodCommand('????', 0x0000, 0x000000, 0x0, 0x0, 0x0) //TODO
        }

        function setBrakeDevelopmentMode(value){
            console.log("podcommands: set eddv mode", value)
            //this is used as a flag to allow/disallow the use of FCUBrake_MoveMotorRAW which is 
            //extreamly dangerous and will damage the magnets

            _brakeDevelopmentConfirmation = value;

        }

        function FCUBrake_DisableDevelopmentMode(){

            this.setBrakeDevelopmentMode(false);


            // using 0x000000 value to disable development mode (any value other than 0x01293847 will disable this setting)

            udp.tx.transmitPodCommand('Flight Control', 0x1400, 0x000000, 0x0, 0x0, 0x0); 

        }

        function FCUBrake_EnableDevelopmentMode(){

            // THIS IS VERY VERY DANGEROUS 


            this.setBrakeDevelopmentMode(true);

            udp.tx.transmitPodCommand('Flight Control', 0x1400, 0x01293847, 0x0, 0x0, 0x0); 
        }
        
        function FCUBrake_RequestDevelopmentMode() {

            //udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x00000001, 0x00001003, 0x0, 0x0); 
            console.log("SEND 'REQUESTDEVELOPMENTMODE'");

        }

        function FCUBrake_MoveMotorRAW(data){
            console.log("move motor", data)
            // THIS IS VERY VERY DANGEROUS 


            // data.command (0 = Left, 1 = Right, 2 = Both)

            // data.position (microns)

            if(_brakeDevelopmentConfirmation)
            {

                udp.tx.transmitPodCommand('Flight Control', 0x1401, data.command, data.position, 0x0, 0x0); 

            }
        }

        function FCUStreamingControlStart_AccelCalData() {

            udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x00000001, 0x00001001, 0x0, 0x0); 

        }
        
        function FCUStreamingControlStart_AccelFullData() {

            udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x00000001, 0x00001003, 0x0, 0x0); 

        }


        function FCUStreamingControlStop_Accel() {

            udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x00000000, 0x00000000, 0x0, 0x0); 

        }
		
		//Accel control
        function FCUAccel_FineZero(data) {
			udp.tx.transmitPodCommand('Flight Control', 0x1005, data.accel, data.axis, 0x0, 0x0); 
        }
        function FCUAccel_AutoZero(data) {
            udp.tx.transmitPodCommand('Flight Control', 0x1004, data.accel, 0x00000000, 0x0, 0x0); 
        }

		
		//contrast sensors
        function FCUContrast_StartStream() {
            udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x01, 0x1301, 0x0, 0x0); 
        }
        function FCUContrast_StopStream() {
            udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x00, 0x00000000, 0x0, 0x0); 
        }
				
        //Hover Engines
        function FCUHover_Enable() {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_Disable() {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_EnableStaticHovering() {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_ReleaseStaticHovering() {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_EnableHEX(hexName) {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_DisableHEX(hexName) {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_SetHEXSpeed(hewName, hexSpeed) {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_StartCooling(coolingName) {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_StopCooling(coolingName) {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUHover_OpenSolenoid(solenoidName) {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }

        function XilinxSim_Start() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x5000, 0x1, 0x0, 0x0, 0x0); 
        }
        function XilinxSim_Stop() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x5000, 0x0, 0x0, 0x0, 0x0); 
        }
        function XilinxSim_Laser0On() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x5001, 0x0, 0x1, 0x0, 0x0); 
        }
        function XilinxSim_Laser0Off() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x5001, 0x0, 0x0, 0x0, 0x0); 
        }
        function XilinxSim_Laser1On() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x5001, 0x1, 0x1, 0x0, 0x0); 
        }
        function XilinxSim_Laser1Off() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x5001, 0x1, 0x0, 0x0, 0x0); 
        }
        function XilinxSim_Laser2On() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x5001, 0x2, 0x1, 0x0, 0x0); 
        }
        function XilinxSim_Laser2Off() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x5001, 0x2, 0x0, 0x0, 0x0); 
        }

        

    return{
		/*
        PodOff: () => {
            udp.tx.sendMessage("PodOff")
        },
        PodStop: () => {
            udp.tx.sendMessage("PodStop")
        },
        PowerStreamingControl: (command) => {
            udp.tx.sendMessage(command)
        },*/

        LGU_PositionChange,
        LGU_SpeedChange,

        setBrakeDevelopmentMode,
        FCUBrake_DisableDevelopmentMode,
        FCUBrake_EnableDevelopmentMode,
        FCUBrake_MoveMotorRAW,
        FCUBrake_RequestDevelopmentMode,	
        FCUStreamingControlStart_AccelCalData,
        FCUStreamingControlStart_AccelFullData, 
		FCUStreamingControlStop_Accel,	
        FCUAccel_FineZero,		
        FCUAccel_AutoZero,

		FCUContrast_StartStream,
		FCUContrast_StopStream,

        FCUHover_Enable,
        FCUHover_Disable,
        FCUHover_EnableStaticHovering,
        FCUHover_ReleaseStaticHovering,
        FCUHover_EnableHEX,
        FCUHover_DisableHEX,
        FCUHover_SetHEXSpeed,
        FCUHover_StartCooling,
        FCUHover_StopCooling,
        FCUHover_OpenSolenoid,


        XilinxSim_Start,
        XilinxSim_Stop,
		XilinxSim_Laser0On,
		XilinxSim_Laser0Off,
		XilinxSim_Laser1On,
		XilinxSim_Laser1Off,
		XilinxSim_Laser2On,
		XilinxSim_Laser2Off
    }
}