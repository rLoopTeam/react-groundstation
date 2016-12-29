module.exports = function(udp){
    return{
        PodOff: () => {
            udp.tx.sendMessage("PodOff")
        },
        PodStop: () => {
            udp.tx.sendMessage("PodStop")
        },
        StreamingControl: (command) => {
            udp.tx.sendMessage(command)
        }
    }
}