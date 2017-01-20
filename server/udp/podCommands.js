const makeSafeUDPPackage = require('./makeSafeUDPPackage');
const bin = require('./binary');
var chalk = require('chalk');//using this to show messages in color

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

        function FCUPod_Off(){

            // udp.tx.transmitPodCommand('Flight Control', 0x0001, 0x1234ABCD, 0x0, 0x0, 0x0); 

            console.log(chalk.red('we need to add this command. we need the packet type'));
            
        }

        function FCUPod_Stop(){

            udp.tx.transmitPodCommand('Flight Control', 0x0001, 0x1234ABCD, 0x0, 0x0, 0x0); 

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
            console.log("move motor raw ", data)
            // THIS IS VERY VERY DANGEROUS 


            // data.command (0 = Left, 1 = Right, 2 = Both)

            // data.position (microns)

            if(_brakeDevelopmentConfirmation)
            {

                udp.tx.transmitPodCommand('Flight Control', 0x1401, data.command, data.position, 0x0, 0x0); 

            }
        }

        function FCUBrake_MoveMotorIBeam(data){
            console.log("move motor i-beam", data)
            // THIS IS VERY VERY DANGEROUS 
            // data.position (mm)

            if(_brakeDevelopmentConfirmation)
            {
                //sending floats in annoying but this is how to do it
                var bytes= bin.float32ToBytes( data.position);
                udp.tx.transmitPodCommand('Flight Control', 0x1403, bin.bytesToUint32(bytes[0],bytes[1],bytes[2],bytes[3],false), 0x0, 0x0, 0x0); 

            }
        }

        function FCUBrake_BeginInit(data){
            console.log("Brakes: Begin Init", data)
            // THIS IS VERY VERY DANGEROUS 

            if(_brakeDevelopmentConfirmation)
            {
                udp.tx.transmitPodCommand('Flight Control', 0x1408, 0x98765432, 0x0, 0x0, 0x0); 

            }
        }

        function FCUBrake_MLPSetZeroLeftBrake(){
            console.log("Brakes: Set Zero Left Brake")
            // THIS IS VERY VERY DANGEROUS 

            if(_brakeDevelopmentConfirmation)
            {
                udp.tx.transmitPodCommand('Flight Control', 0x1409, 0x55660123, 0x0, 0x0, 0x0); 

            }
        }

        function FCUBrake_MLPSetZeroRightBrake(){
            console.log("Brakes: Set Zero Right Brake")
            // THIS IS VERY VERY DANGEROUS 

            if(_brakeDevelopmentConfirmation)
            {
                udp.tx.transmitPodCommand('Flight Control', 0x1409, 0x55660123, 0x01, 0x0, 0x0); 

            }
        }


        function FCUBrake_MLPSetSpanLeftBrake(){
            console.log("Brakes: Set Span Left Brake")
            // THIS IS VERY VERY DANGEROUS 

            if(_brakeDevelopmentConfirmation)
            {
                udp.tx.transmitPodCommand('Flight Control', 0x1409, 0x55660123, 0x0, 0x1, 0x0); 

            }
        }

        function FCUBrake_MLPSetSpanRightBrake(){
            console.log("Brakes: Set Span Right Brake")
            // THIS IS VERY VERY DANGEROUS 

            if(_brakeDevelopmentConfirmation)
            {
                udp.tx.transmitPodCommand('Flight Control', 0x1409, 0x55660123, 0x01, 0x1, 0x0); 

            }
        }

        function FCUStepper_SetMaxAngularAccel(data){
            //data.brake 0 = Left, 1 = right
            //data.value

            console.log("Setting Max Angular Accel");
            udp.tx.transmitPodCommand('Flight Control', 0x1404,0x0,data.brake,data.value,0x0);
        }

        function FCUStepper_SetPicoMetersPerRev(data){
            //data.brake 0 = Left, 1 = right
            //data.value

            console.log("Setting Picometers per revolution");
            udp.tx.transmitPodCommand('Flight Control', 0x1404,0x1,data.brake,data.value,0x0);
        }

        function FCUStepper_SetMaxRPM(data){
            //data.brake 0 = Left, 1 = right
            //data.value

            console.log("Setting MAX RPM");
            udp.tx.transmitPodCommand('Flight Control', 0x1404,0x2,data.brake,data.value,0x0);
        }

        function FCUStepper_SetMicroStepResolution(data){
            //data.brake 0 = Left, 1 = right
            //data.value

            console.log("Setting Micro Step Resolution");
            udp.tx.transmitPodCommand('Flight Control', 0x1404,0x3,data.brake,data.value,0x0);
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

        function FCUStreamingControlStart_Brakes() {
            udp.tx.transmitPodCommand('Flight Control',0x0100, 0x01, 0x1402,0x0,0x0);
        }
		
        function FCUStreamingControlStart_MotorsRaw() {
            udp.tx.transmitPodCommand('Flight Control',0x0100, 0x01, 0x1406,0x0,0x0);
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
		
		function PowerAStreamingOff(){
			udp.tx.transmitPodCommand('Power Node A', 0x3010, 0x00, 0x00000000, 0x0, 0x0); 
		}

        function PowerARequestBMS(){
            udp.tx.transmitPodCommand('Power Node A', 0x3010, 0x01, 0x3401, 0x0, 0x0); 
        }

        function PowerAChargeRelayOff() {
            udp.tx.transmitPodCommand('Power Node A', 0x3100, 0x00, 0x00000000, 0x0, 0x0); 
        }

        function PowerAChargeRelayOn() {
            udp.tx.transmitPodCommand('Power Node A', 0x3100, 0x01, 0x00000000, 0x0, 0x0); 
        }

		function PowerAStreamCurrentTemps(){
			udp.tx.transmitPodCommand('Power Node A', 0x3010, 0x01, 0x3201, 0x0, 0x0); 
		}
		
		function PowerAStreamTempLocations(){
			udp.tx.transmitPodCommand('Power Node A', 0x3010, 0x01, 0x3203, 0x0, 0x0); 
		}

        function PowerARequestRomID(index){
            udp.tx.transmitPodCommand('Power Node A',0x3204, index,0x0,0x0,0x0);
        }

        function PowerBRequestRomID(index){
            udp.tx.transmitPodCommand('Power Node B',0x3204, index,0x0,0x0,0x0);
        }

        function PowerAStartCharging(){
            udp.tx.transmitPodCommand('Power Node A',0x3020, 0x11229988,0x01,0x0,0x0);
        }

        function PowerAStopCharging(){
            udp.tx.transmitPodCommand('Power Node A',0x3020, 0x11229988,0x0,0x0,0x0);
        }

        function PowerBStartCharging(){
            udp.tx.transmitPodCommand('Power Node B',0x3020, 0x11229988,0x01,0x0,0x0);
        }

        function PowerBStopCharging(){
            udp.tx.transmitPodCommand('Power Node B',0x3020, 0x11229988,0x0,0x0,0x0);
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
        function FCUHover_SetHEXSpeed(hexName, hexSpeed) {
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


        //Aux Propulsion
        function FCUAuxProp_Enable() {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUAuxProp_Disable() {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUAuxProp_SetSpeed(speed) {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }


        //Gimbal
        function FCUGimbal_Static() {
            udp.tx.transmitPodCommand('Flight Control', 0x0000, 0x00, 0x00000000, 0x0, 0x0); //TODO
        }
        function FCUGimbal_FullBackwards() {
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

        function AutoSequenceTest_Start() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x1900, 0x01, 0x0, 0x0, 0x0);
        }
        function AutoSequenceTest_Skip() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x1900, 0x02, 0x0, 0x0, 0x0);
        }
        function AutoSequenceTest_Kill() {
            udp.tx.transmitPodCommand('Xilinx Sim', 0x1900, 0x03, 0x0, 0x0, 0x0);
        }


    return{
        LGU_PositionChange,
        LGU_SpeedChange,

        FCUPod_Off,
        FCUPod_Stop,

        setBrakeDevelopmentMode,
        FCUBrake_DisableDevelopmentMode,
        FCUBrake_EnableDevelopmentMode,
        FCUBrake_MoveMotorRAW,
        FCUBrake_MoveMotorIBeam,
        FCUBrake_BeginInit,
        FCUBrake_MLPSetZeroLeftBrake,
        FCUBrake_MLPSetZeroRightBrake,
        FCUBrake_MLPSetSpanLeftBrake,
        FCUBrake_MLPSetSpanRightBrake,
        FCUStepper_SetMaxAngularAccel,
        FCUStepper_SetPicoMetersPerRev,
        FCUStepper_SetMaxRPM,
        FCUStepper_SetMicroStepResolution,
        FCUBrake_RequestDevelopmentMode,	
        FCUStreamingControlStart_AccelCalData,
        FCUStreamingControlStart_AccelFullData, 
		FCUStreamingControlStop_Accel,
        FCUStreamingControlStart_Brakes,
        FCUStreamingControlStart_MotorsRaw,
        FCUAccel_FineZero,		
        FCUAccel_AutoZero,

		FCUContrast_StartStream,
		FCUContrast_StopStream,	
		
        PowerAChargeRelayOff,
        PowerAChargeRelayOn,
        PowerAStreamingOff,
        PowerAStreamCurrentTemps,
        PowerAStreamTempLocations,
        PowerARequestRomID,
        PowerBRequestRomID,
        PowerAStartCharging,
        PowerAStopCharging,
        PowerBStartCharging,
        PowerBStopCharging,
        PowerARequestBMS,
		

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

        FCUAuxProp_Enable,
        FCUAuxProp_Disable,
        FCUAuxProp_SetSpeed,

        FCUGimbal_Static,
        FCUGimbal_FullBackwards,


        XilinxSim_Start,
        XilinxSim_Stop,
		XilinxSim_Laser0On,
		XilinxSim_Laser0Off,
		XilinxSim_Laser1On,
		XilinxSim_Laser1Off,
		XilinxSim_Laser2On,
		XilinxSim_Laser2Off,

        AutoSequenceTest_Start,
        AutoSequenceTest_Skip,
        AutoSequenceTest_Kill
    }
}
