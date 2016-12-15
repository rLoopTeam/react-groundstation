'use strict';

const app = require('./app');
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

const io = require('socket.io')(server);


// socket.io demo
io.on('connection', function (socket) {
  socket.emit('server event', { foo: 'bar' });

  socket.on('client event', function (data) {
    socket.broadcast.emit('update label', data);
  });

  socket.on('sendParameter', function (data) {
    console.log(data);
  });

  socket.on('setIpAndPort', function (data) {
    console.log(data);
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