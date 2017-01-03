const makeSafeUDPPackage = require('./makeSafeUDPPackage');

module.exports = function(udp){
    
    //flag allow/disallow the use of FCUBrake_MoveMotorRAW which is 
    //extreamly dangerous and will damage the magnets

    var _brakeDevelopmentConfirmation = false;


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
        
        function XilinxSimStart() {

            udp.tx.transmitPodCommand('Xilinx Sim', 0x0, 0x0, 0x0, 0x0, 0x0); 

        }
        
        function FCUAccel_FineZero(data) {

            udp.tx.transmitPodCommand('Flight Control', 0x1005, data.accel, data.axis, 0x0, 0x0); 

        }
        
        function FCUAccel_AutoZero(data) {

            udp.tx.transmitPodCommand('Flight Control', 0x1004, data.accel, 0x00000000, 0x0, 0x0); 

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

        setBrakeDevelopmentMode,
        FCUBrake_DisableDevelopmentMode,
        FCUBrake_EnableDevelopmentMode,
        FCUBrake_MoveMotorRAW,
        FCUStreamingControlStart_AccelCalData,
        FCUStreamingControlStart_AccelFullData,		
		FCUStreamingControlStop_Accel,	
        XilinxSimStart,
        FCUAccel_FineZero,		
        FCUAccel_AutoZero
    }
}