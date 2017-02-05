import io from 'socket.io-client';

class DataStreamClient {

  constructor (newPacketCallback) {
    this.value = 0;
    this.RequestedParameters = [];

    this.connected = false;

    this.socket = io('/dataStreamServer', {'forceNew': true});

    this.socket.on('connect', function () {
      this.connected = true;

      this.socket.emit('request parameters', this.RequestedParameters);

      this.socket.on('new data burst', function (msg, fn) {
        newPacketCallback(msg);
        fn('');
      });

      this.socket.on('disconnect', function () { this.connected = false; });
    }.bind(this));
  }

  RequestParameter (parameter) {
    this.RequestedParameters.push(parameter);
    if (this.connected)		{
      this.socket.emit('request parameter', parameter);
    }
  }
}

export default DataStreamClient;
