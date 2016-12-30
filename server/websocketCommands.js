
module.exports = function (io, udp, room, logger, podCommands)
{
	var updateClientWithDatalogs = true;
	var _timer;
	
	// socket.io demo
	io.on('connection', function (socket) {

	  console.log("started listening")

	  if(!udp.rx.listeningForUdp)
		startListening();

	  function startListening(){ // listen for udp packets
		udp.rx.listeningForUdp = true;
		udp.rx.server().on('message', function (message, remote) {
			console.log("GROUNSTATION UDP - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);
			logger.log("debug", "GROUNSTATION UDP - RECEIVED: " + remote.address + ':' + remote.port +' - ' + message);

			if(updateClientWithDatalogs)
			{
			  socket.in('dataLogging').emit('udp:event', {
				log: remote.address + ':' + remote.port +' - ' + message
			  });
			}
		});
	  }

	  var websocket = {};
	  websocket.events = {
		'forceDisconnect': function(){
		  socket.disconnect();
		},
		'XilinxSim:StartRun': function (data){ 
			podCommands.XilinxSimStart();
		},
		'FlightControl_Accel:StartStream': function (){ 
			podCommands.FCUStreamingControlStart()
		},
		'power:streamingControl': function(data){
			//data.status == on/off
			podCommands.PowerStreamingControl(data.status)
		},
		'stop:Pod': function (data) {
			podCommands.PodStop();
		},
		'client event': function (data) {
		  socket.broadcast.emit('update label', data);
		},
		'start:dataLogs': function (data) {
		  if(_timer)
		  {
			clearInterval(_timer)
		  }

		  _timer = setInterval(function(){
			  udp.tx.sendMessage("Thanks Pod, message received")
		  }, 2500);
		  updateClientWithDatalogs = true;
		},
		'stop:dataLogs': function (data) {
		  if(_timer)
		  {
			clearInterval(_timer)
		  }

		  udp.tx.sendMessage("DataLogs are no longer listening")
		  updateClientWithDatalogs = false;
		},
		'power:Pod': function(){
			podCommands.PodOff()
		},
		'join': function (data) {
			var name = data.name;
			room[data.room] = data.room; //add name of room to the list of rooms
			socket.join(room[data.room]);
			console.log(name + ' joined the group. '+ socket.id);
			socket.in(room[data.room]).emit('udp:event', {log: name + ' joined the group: ' + room[data.room]});
		},
		'sendParameter': function (data) {
			podCommands.SendParameter(data);
		},
		'setIpAndPort': function (data) {
		  udp.rx.updateConnectionData(data).then(() => {
			console.log('udp starting to listen again')
			if(!udp.rx.listeningForUdp)
				startListening()
		  })

		  udp.tx.sendMessage(JSON.stringify(data))
		},
		'lgu:positionChange': function(data){
		  udp.tx.sendMessage(JSON.stringify(data))
		},
		'lgu:speedChange': function(data){
		  udp.tx.sendMessage(JSON.stringify(data))
		},
		'disconnect': function() {
		  console.log('Server got disconnected!');
		}
	  }

	  for (const event in websocket.events){
		  socket.on (event, (data)=> {
			websocket.events[event](data);
		  })
	  }
	});
};