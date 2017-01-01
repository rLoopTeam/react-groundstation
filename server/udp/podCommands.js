const makeSafeUDPPackage = require('./makeSafeUDPPackage');

module.exports = function(udp){
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
		
        FCUStreamingControlStart_AccelCalData: () => {
		  udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x00000001, 0x00001001, 0x0, 0x0); 
        },
		
        FCUStreamingControlStart_AccelFullData: () => {
		  udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x00000001, 0x00001003, 0x0, 0x0); 
        },		
		
		FCUStreamingControlStop_Accel: () => {
		  udp.tx.transmitPodCommand('Flight Control', 0x0100, 0x00000000, 0x00000000, 0x0, 0x0); 
        },	
		
        XilinxSimStart: () => {
		  udp.tx.transmitPodCommand('Xilinx Sim', 0x0, 0x0, 0x0, 0x0, 0x0); 
        },
		
        FCUAccel_FineZero: (data) => {
			udp.tx.transmitPodCommand('Flight Control', 0x1005, data.accel, data.axis, 0x0, 0x0); 
        },
		
        FCUAccel_AutoZero: (data) => {
			udp.tx.transmitPodCommand('Flight Control', 0x1004, data.accel, 0x00000000, 0x0, 0x0); 
        }
    }
}