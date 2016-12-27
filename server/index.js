'use strict';
/*
* Groundstation backend
*-----------------------
*/
const commConfig = require('../config/commConfig');
const app = require('./app');
const udptx = require('./udp/tx');
const udprx = require('./udp/rx');
var udp = {
  tx: udptx,
  rx: udprx
}
var _timer;
var room = {
  dataLogging: 'dataLogging'
};
var updateClientWithDatalogs = true;

/*------------
BIT CONVERSION
------------*/

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

//convert a U16
function Numerical_To_U16(u16Value, Object)
{
	object[0] = 0x0A;
	object[1] = 0x0B;
	
}


/*------------
    SERVER
------------*/
const PORT = process.env.PORT || commConfig.Appserver.port;
const env = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

const io = require('socket.io')(server);



/*------------
  WEBSOCKETS
------------*/
// socket.io demo
io.on('connection', function (socket) {

  console.log("started listening")

  if(!udp.rx.listeningForUdp)
    startListening();

  function startListening(){
    udp.rx.listeningForUdp = true;
    udp.rx.server().on('message', function (message, remote) {
        console.log("GROUNSTATION UDP - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);
        

        if(updateClientWithDatalogs)
        {
          socket.in('dataLogging').emit('udp:event', {
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
    udp.tx.sendMessage('STOP');
  });
  
  socket.on('client event', function (data) {
    socket.broadcast.emit('update label', data);
  });
  
  socket.on('start:dataLogs', function (data) {
    if(_timer)
    {
      clearInterval(_timer)
    }

    _timer = setInterval(function(){
        udp.tx.sendMessage("Thanks Pod, message received")
    }, 2500);
    updateClientWithDatalogs = true;
  });

  socket.on('stop:dataLogs', function (data) {
    if(_timer)
    {
      clearInterval(_timer)
    }

    udp.tx.sendMessage("DataLogs are no longer listening")
    updateClientWithDatalogs = false;
  });

  socket.on('join', function (data) {
      var name = data.name;
      room[data.room] = data.room; //add name of room to the list of rooms
      socket.join(room[data.room]);
      console.log(name + ' joined the group. '+ socket.id);
      socket.in(room[data.room]).emit('udp:event', {log: name + ' joined the group: ' + room[data.room]});
  });

  socket.on('sendParameter', function (data) {
    udp.tx.sendMessage(JSON.stringify(data))
  });

  socket.on('setIpAndPort', function (data) {
    udp.rx.updateConnectionData(data).then(() => {
      console.log('udp starting to listen again')
      if(!udp.rx.listeningForUdp)
          startListening()
    })

    udp.tx.sendMessage(JSON.stringify(data))
  });

  socket.on('disconnect', function() {
    console.log('Server got disconnected!');
  });
});


