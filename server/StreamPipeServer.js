var fakeDataStore = new Array();

for(var i = 0;i<1000;i++)
{	
	var fakeDataItem1 = {
		'name':'Value '+i,
		'stale':false,
		'value':20.023
	};

	fakeDataStore.push(fakeDataItem1);
}


module.exports = function (app, io)
{
	var dataStreamServer = io.of('/dataStreamServer');
	dataStreamServer.on('connection', function(socket){
		
		var dataStreamServer = io.of('/dataStreamServer');
	
		var requestedParams = new Array();
	
		var clientID = socket.id;
		
		var i = 0;
		
		console.log("StreamPipeServer: New client id " + socket.id);
		
		socket.on('request parameters', function(msg){
			console.log("StreamPipeServer: " + clientID + " send message: " + JSON.stringify(msg));
		});
		
		var clientReady = true;
		
		var updateTimer = setInterval(function(){
			//Wait for an acknowledge to send new data, otherwise we fill up the OS buffers and bad things happen
			if(clientReady){
				clientReady = false;
				socket.emit('new data burst',fakeDataStore, function(data) {clientReady = true;});
			}
			
			for(var i = 0;i<1000;i++)
			{
				fakeDataStore[i].value += i+1;
			}
			}, 33);
		
		socket.on('disconnect', function(){
			clearInterval(updateTimer);
		});
		
		
		
	});	
}


