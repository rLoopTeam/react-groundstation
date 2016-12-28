const commConfig = require('../../config/commConfig');
const dgram = require('dgram');

/*
* UDP data sender
*/
// var txPort = 9100; //3003; // This points to the Pod's UDP listener port
// var txHost = '127.0.0.1';

var winston = require('winston');
var txPort = commConfig.PodRxPort;//send from server to pod on pod's receiving port
var txHost = commConfig.PodRxHost;//send from server to pod on pod's receiving host ip
var u8Buffer;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: 'winston_tx.log' }),
        new (winston.transports.File)({ filename: 'winston_all.log', name: 'file.all' })
    ]
});
logger.level = 'debug';

module.exports = {
    sendMessage: function (messageStr){
        var message = new Buffer(messageStr);
        var client = dgram.createSocket('udp4');
        client.send(message, 0, message.length, txPort, txHost, function(err, bytes) {
            if (err) throw err;
            console.log("GROUNSTATION UDP - SENT: " +  txHost + ':' + txPort +' - ' + message);
            logger.log("debug", "GROUNSTATION UDP - SENT: " +  txHost + ':' + txPort +' - ' + message);
            client.close();
        });
    },
    //public *maybe should be private since it is used by UDPSafe_Tx_X4
    sendSafeUDP: function(msgBuff, offset = 0, length = 26, iPort = 9170, sIP = '192.168.1.170') {
        var client = dgram.createSocket('udp4');
        //port 9170 and 192.168.1.170 are just the test hardware, probably better to
        //make this part of the SafeUDP call so as we can target different hardware.
        client.send(msgBuff, offset, length, iPort, sIP, function(err, bytes)
        {
            if (err) throw err;
            console.log("SafeUDP - SENT: " +  sIP + ':' + iPort +' - ' + u8Buffer);
            client.close();
        });
    },
    //Function to send a SafetyUDP packet to the Xilinx simulation board
    UDPSafe_Tx_X4: function (sIP, iPort, u16PacketType, u32Block0, u32Block1) {
        u8Buffer = new Uint8Array(30);
        var msgBuff = new Buffer(u8Buffer.buffer);
        
        //format the message
        
        //sequence number
        //need to increment this for each transmission
        u8Buffer[0] = 0x00;
        u8Buffer[1] = 0x00;
        u8Buffer[2] = 0x00;
        u8Buffer[3] = 0x00;
        
        //packet type = 0x5000
        //U16
        //todo: calls something like: u8Buffer[4] = Numerical_To_U16(0x5000);
        //Or pass in the packet type from a define.
        u8Buffer[4] = (u16PacketType & 0x00FF) >> 0;
        u8Buffer[5] = (u16PacketType & 0xFF00) >> 8;
        //0x50;

        //length = 16bytes
        //u16
        //todo: calls something like: u8Buffer[6] = Numerical_To_U16(16);
        u8Buffer[6] = 0x10;
        u8Buffer[7] = 0x00;
        
        //data
        //4 blocks of u32 for basic "control" type messages
        //todo: calls something like: u8Buffer[8] = Numerical_To_U32(1);
        //block 0 = 0x00000001 = switch on run
        u8Buffer[8] = (u32Block0 & 0x000000FF) >> 0;
        u8Buffer[9] = (u32Block0 & 0x0000FF00) >> 8;
        u8Buffer[10] = (u32Block0 & 0x00FF0000) >> 16;
        u8Buffer[11] = (u32Block0 & 0xFF000000) >> 24;
        
        u8Buffer[12] = (u32Block1 & 0x000000FF) >> 0;
        u8Buffer[13] = (u32Block1 & 0x0000FF00) >> 8;
        u8Buffer[14] = (u32Block1 & 0x00FF0000) >> 16;
        u8Buffer[15] = (u32Block1 & 0xFF000000) >> 24;
        
        u8Buffer[16] = 0x00;
        u8Buffer[17] = 0x00;
        u8Buffer[18] = 0x00;
        u8Buffer[19] = 0x00;
        
        u8Buffer[20] = 0x00;
        u8Buffer[21] = 0x00;
        u8Buffer[22] = 0x00;
        u8Buffer[23] = 0x00;

        //crc
        //todo: Compute this value.
        u8Buffer[24] = 0xF2;
        u8Buffer[25] = 0xAB;
        
        this.sendSafeUDP(msgBuff, 0, 26, iPort, sIP);
    }
}



