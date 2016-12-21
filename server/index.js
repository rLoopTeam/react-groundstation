'use strict';
/*
* Groundstation backend
*-----------------------
*/

const app = require('./app');
const dgram = require('dgram');
var updateClientWithDatalogs = true;
var listeningForUdp = false;

/*
* UDP data sender
*/
var SENDPORT = 3003; // This points to the Pod's UDP listener port
var SENDHOST = '127.0.0.1';

function sendMessageToPod(messageStr){
    var message = new Buffer(messageStr);
    var client = dgram.createSocket('udp4');
    client.send(message, 0, message.length, SENDPORT, SENDHOST, function(err, bytes) {
        if (err) throw err;
        console.log("GROUNSTATION UDP - SENT: " +  SENDHOST + ':' + SENDPORT +' - ' + message);
        client.close();
    });
}

//Function to send a SafetyUDP packet to the Xilinx simulation board
function UDPSafe_Tx_X4(sIP, iPort)
{
	var u8Buffer = new Uint8Array(26);
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
	u8Buffer[4] = 0x00;
	u8Buffer[5] = 0x50;

	//length = 16bytes
	//u16
	//todo: calls something like: u8Buffer[6] = Numerical_To_U16(16);
	u8Buffer[6] = 0x00;
	u8Buffer[7] = 0x10;
	
	//data
	//4 blocks of u32 for basic "control" type messages
	//todo: calls something like: u8Buffer[8] = Numerical_To_U32(1);
	//block 0 = 0x00000001 = switch on run
	u8Buffer[8] = 0x01;
	u8Buffer[9] = 0x00;
	u8Buffer[10] = 0x00;
	u8Buffer[11] = 0x00;
	
	u8Buffer[12] = 0x00;
	u8Buffer[13] = 0x00;
	u8Buffer[14] = 0x00;
	u8Buffer[15] = 0x00;
	
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
	//0x470C
	u8Buffer[24] = 0x0C;
	u8Buffer[25] = 0x47;
	
	
	var client = dgram.createSocket('udp4');
	//port 9170 and 192.168.1.170 are just the test hardware, probably better to
	//make this part of the SafeUDP call so as we can target different hardware.
    client.send(msgBuff, 0, 26, iPort, sIP, function(err, bytes)
	{
        if (err) throw err;
        console.log("SafeUDP - SENT: " +  sIP + ':' + iPort +' - ' + u8Buffer);
        client.close();
    });
	
}

//convert a U32
function Numerical_To_U32 (u32Value)
{
    arr = new Uint8Array([
         (u32Value & 0xff000000) >> 24,
         (u32Value & 0x00ff0000) >> 16,
         (u32Value & 0x0000ff00) >> 8,
         (u32Value & 0x000000ff)
    ]);
    return arr.buffer;
}

/*
* UDP data receiver
*/
var udpPORT = 3002; // Groundsation's udp port
var udpHOST = '127.0.0.1';

var udpServer = dgram.createSocket('udp4');
udpServer = udpServer.bind(udpPORT, udpHOST);



const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

const io = require('socket.io')(server);


// socket.io demo
io.on('connection', function (socket) {
  socket.emit('server event', { foo: 'bar' });

  if(!listeningForUdp)
    startListening();

  function startListening(){
    listeningForUdp = true;
    udpServer.on('message', function (message, remote) {
        console.log("GROUNSTATION UDP - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);
        sendMessageToPod("Thanks Pod, message received")

        if(updateClientWithDatalogs)
        {
          socket.emit('udp event', {
            log: remote.address + ':' + remote.port +' - ' + message
          });
        }
    });
  }

  //Xilinx Sim
	socket.on('XilinxSim:StartRun', function (data){ UDPSafe_Tx_X4("129.168.1.170", 9170); });

	
	//flight controllers
	socket.on('FlightControl_Accel:StartStream', function (data){ UDPSafe_Tx_X4("192.168.1.99", 9700); });
	
  
  socket.on('stop:Pod', function (data) {
    sendMessageToPod('STOP');
  });
  
  socket.on('client event', function (data) {
    socket.broadcast.emit('update label', data);
  });

  socket.on('stop:dataLogs', function () {
    updateClientWithDatalogs = false;
  });

  socket.on('start:dataLogs', function () {
    updateClientWithDatalogs = true;
  });

  socket.on('sendParameter', function (data) {
    sendMessageToPod(JSON.stringify(data))
  });

  socket.on('setIpAndPort', function (data) {
    udpPORT = data.port;
    udpHOST = data.ip;
    udpServer.close(function(){
      listeningForUdp = false;
      udpServer = dgram.createSocket('udp4');
      udpServer = udpServer.bind(udpPORT, udpHOST);
      if(!listeningForUdp)
        startListening()
    });

    sendMessageToPod(JSON.stringify(data))
  });
});





// Always return the main index.html, so react-router render the route in the client
app.get('/websocketTest', function(req, res) {
	console.log('/websocketTest')
});

app.post('/sendParameter', function(req, res){
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('sendParameter');
});

app.post('/setIpAndPort', function(req, res){
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('setIpAndPort');
});


