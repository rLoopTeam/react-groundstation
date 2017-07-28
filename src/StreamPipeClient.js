import createSocket from './shared/socket';

class DataStreamClient {

  constructor (newPacketCallback) {
    this.value = 0;
    this.RequestedParameters = [];
    this.newPacketCallback = newPacketCallback;

    this.initialRequest = this.initialRequest.bind(this);
    this.handleDataBurst = this.handleDataBurst.bind(this);

    this.socket = createSocket('dataStream', '/dataStreamServer');
    this.openSocket();
  }

  RequestParameter (parameter) {
    this.RequestedParameters.push(parameter);
    if (this.socket.connected) {
      this.socket.emit('request parameter', parameter);
    }
  }

  initialRequest () {
    console.log('initials');
    this.socket.emit('request parameters', this.RequestedParameters);
  }

  handleDataBurst (msg, fn) {
    this.newPacketCallback(msg);
    fn('');
  }

  /**
   * Opens a socket.
   * This doesn't actually open a socket because of the single shared "dataStream" socket.
   * Instead, this adds our handlers to the socket.
   */
  openSocket () {
    this.socket.on('new data burst', this.handleDataBurst);
    this.socket.on('connect', this.initialRequest);
  }

  /**
   * "Closes" the socket.
   * This doesn't actually close the socket because of the single shared "dataStream" socket.
   * Instead, this removes our handlers on the socket.
   */
  closeSocket (options) {
    // Clears all parameters this client is listening to.
    // Use caution with this flag because it will also stop the parameter bursts for other clients.   
    if (options.clearParameters) {
      this.socket.emit('stop parameters', this.RequestedParameters);
      this.RequestedParameters = [];
    }
    this.socket.removeListener('new data burst', this.handleDataBurst);
    this.socket.removeListener('connection', this.initialRequest);
  }
}

export default DataStreamClient;
