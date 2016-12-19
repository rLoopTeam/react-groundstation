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
function UDPSafe_Tx_Xilinx()
{
	var u8Buffer = new Uint8Array(23);
	var msgBuff = new Buffer(u8Buffer.buffer);
	
	//format the message
	
	//packet type = 0x5000
	//U16
	u8Buffer[0] = '50';
	u8Buffer[1] = '00';

	//length = 16bytes
	//u16
	u8Buffer[2] = '00';
	u8Buffer[3] = '10';
	
	//data
	//4 blocks of u32 for basic "control" type messages
	u8Buffer[4] = '00';
	u8Buffer[5] = '00';
	u8Buffer[6] = '00';
	u8Buffer[7] = '00';
	
	u8Buffer[8] = '00';
	u8Buffer[9] = '00';
	u8Buffer[10] = '00';
	u8Buffer[11] = '00';
	
	u8Buffer[12] = '00';
	u8Buffer[13] = '00';
	u8Buffer[14] = '00';
	u8Buffer[15] = '00';
	
	u8Buffer[16] = '00';
	u8Buffer[17] = '00';
	u8Buffer[18] = '00';
	u8Buffer[19] = '00';

	//crc
	//todo:
	u8Buffer[20] = '00';
	u8Buffer[21] = '00';
	
	
	var client = dgram.createSocket('udp4');
    client.send(msgBuff, 0, 22, 9170, SENDHOST, function(err, bytes)
	{
        if (err) throw err;
        console.log("SafeUDP - SENT: " +  SENDHOST + ':' + SENDPORT +' - ' + u8Buffer);
        client.close();
    });
	
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
	socket.on('XilinxSim:StartRun', function (data){ UDPSafe_Tx_Xilinx(); });

  
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