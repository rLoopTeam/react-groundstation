var fakeDataItem1 = {
	'name':'Value 1',
	'stale':false,
	'value':20.023
};
var fakeDataItem2 = {
	'name':'Value 2',
	'stale':false,
	'value':10000
};

var fakeDataStore = new Array();
fakeDataStore.push(fakeDataItem1);
fakeDataStore.push(fakeDataItem2);


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
		
		setInterval(function(){
			socket.emit('new data burst',fakeDataStore);
			fakeDataItem1.value++;
			fakeDataItem2.value++;
			}, 33);
		
	});	
}


