'use strict';
/*
* Groundstation backend
*-----------------------
*/

const app = require('./app');
const dgram = require('dgram');
var _timer;
var _room;
var updateClientWithDatalogs = true;
var listeningForUdp = false;

/*
* UDP data sender
*/
var SENDPORT = 9100; //3003; // This points to the Pod's UDP listener port
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
function UDPSafe_Tx_X4(sIP, iPort, u16PacketType, u32Block0, u32Block1)
{
	var u8Buffer = new Uint8Array(30);
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

function Numerical_To_U16(u16Value, Object)
{
	object[0] = 0x0A;
	object[1] = 0x0B;
	
}

/*
* UDP data receiver
*/
var udpPORT = 9100; //3002; // Groundsation's udp port
var udpHOST = '127.0.0.1';

var udpServer = dgram.createSocket('udp4');
udpServer = udpServer.bind(udpPORT, udpHOST);



const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

const io = require('socket.io')(server);
io.set('log level',1);

// socket.io demo
io.on('connection', function (socket) {
  socket.on('disconnect', function() {
    console.log('Server got disconnect!');
  });

  socket.in(_room).emit('server event', { foo: 'bar' });
  console.log("started listening")

  if(!listeningForUdp)
    startListening();

  function startListening(){
    listeningForUdp = true;
    udpServer.on('message', function (message, remote) {
        console.log("GROUNSTATION UDP - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);
        

        if(updateClientWithDatalogs)
        {
          socket.in(_room).emit('udp:event', {
            log: remote.address + ':' + remote.port +' - ' + message
          });
        }
    });
  }

  socket.on('forceDisconnect', function(){
    socket.disconnect();
  });

  //Xilinx Sim
	socket.on('XilinxSim:StartRun', function (data){ UDPSafe_Tx_X4("129.168.1.170", 9170, 0); });

	
	//flight controllers
	//enable stream of cal data 0x1001
	socket.on('FlightControl_Accel:StartStream', function (data){ UDPSafe_Tx_X4("127.0.0.1", 9100, 0x0100, 0x00000001, 0x00001001); });
	
  
  socket.on('stop:Pod', function (data) {
    sendMessageToPod('STOP');
  });
  
  socket.on('client event', function (data) {
    socket.broadcast.emit('update label', data);
  });

  socket.on('stop:dataLogs', function (data) {
    if(_timer)
    {
      clearInterval(_timer)
    }
    console.log(data);

    sendMessageToPod("DataLogs are no longer listening")
    updateClientWithDatalogs = false;
  });

  socket.on('join', function (data) {
      var name = data.name;
      _room = data.room;
      socket.join(_room);
      console.log(name + ' joined the group. '+ socket.id);
      socket.in(_room).emit('udp:event', {log: name + ' joined the group: ' + _room});
  });

  socket.on('start:dataLogs', function (data) {
    if(_timer)
    {
      clearInterval(_timer)
    }
    console.log(data);

    _timer = setInterval(function(){
        sendMessageToPod("Thanks Pod, message received")
    }, 2500);
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


