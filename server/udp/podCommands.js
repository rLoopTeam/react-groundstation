module.exports = function(udp){
    return{
        PodOff: () => {
            udp.tx.sendMessage("PodOff")
        },
        PodStop: () => {
            udp.tx.sendMessage("PodStop")
        },
        PowerStreamingControl: (command) => {
            udp.tx.sendMessage(command)
        },
        FCUStreamingControlStart: () => {
		  udp.tx.UDPSafe_Tx_X4("127.0.0.1", 9100, 0x0100, 0x00000001, 0x00001001); 
        },
        XilinxSimStart: () => {
		  udp.tx.UDPSafe_Tx_X4("129.168.1.170", 9170, 0); 
        },
        SendParameter: (data) => {
		  udp.tx.sendMessage(JSON.stringify(data))
        }
    }
}