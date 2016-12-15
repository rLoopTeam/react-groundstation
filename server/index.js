'use strict';

const app = require('./app');
const server = require('http').createServer();
const io = require('socket.io')(server);

// socket.io demo
io.on('connection', function (socket) {
  socket.emit('server event', { foo: 'bar' });
  socket.on('client event', function (data) {
    console.log(data);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
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