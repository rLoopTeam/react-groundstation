
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

class StreamPipeServer
{
	constructor(app,io, rtDataStore)
	{
			var dataStreamServer = io.of('/dataStreamServer');
			dataStreamServer.on('connection', function(socket){
		
				var dataStreamServer = io.of('/dataStreamServer');
			
				var requestedParams = new Array();
			
				var clientID = socket.id;
				
				var i = 0;
				
				console.log("StreamPipeServer: New client id " + socket.id);
				
				socket.on('request parameters', function(msg){
					console.log("StreamPipeServer: " + clientID + " requested: " + JSON.stringify(msg));
					for(var y = 0; y<msg.length;y++)
					{
						requestedParams.push(msg[y]);
					}
				});

				socket.on('request parameter', function(msg){
					console.log("StreamPipeServer: " + clientID + " requested: " + JSON.stringify(msg));
					requestedParams.push(msg);
				});
				
				var clientReady = true;
				
				//add event listener (ensure that there is only once instance of this)
				//if(!rtDataStore.hasNewData.listenerCount("new_rtData"))
				//{
					//when no others have been created
					addNewEventListener()
			//	}
			//	else
			//	{
					// clean up all listeners to ensure we have just the one we need
					// we might need to refine this. (i am not 100% sure on the reprecussions of doing this)
				//	rtDataStore.hasNewData.removeAllListeners('new_rtData')
			//		addNewEventListener()
			//	}

				function addNewEventListener () {
					rtDataStore.hasNewData.on('new_rtData', sendNewData);
				}

				function sendNewData() { 
					//Wait for an acknowledge to send new data, otherwise we fill up the OS buffers and bad things happen
					if(clientReady){
						clientReady = false;

						var newData = [];
					
						for(var i = 0, len = requestedParams.length;i<len;i++){
							newData.push(rtDataStore.retrieveDataParameter(requestedParams[i]));
						}

						socket.emit('new data burst',newData, function(data) {clientReady = true;});
					}
				}
				
				socket.on('disconnect', function(){
					// clearInterval(updateTimer);
				});		
			});	
	}
}

module.exports = function (app, io, rtDataStore)
{
	return new StreamPipeServer(app, io, rtDataStore);
}


