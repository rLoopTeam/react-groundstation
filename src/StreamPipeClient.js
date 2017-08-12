import createSocket from './shared/socket';

class DataStreamClient {

  constructor (newPacketCallback) {
    this.value = 0;
    this.RequestedParameters = [];
    this.newPacketCallback = newPacketCallback;

    this.initialRequest = this.initialRequest.bind(this);
    this.handleStoppedBurst = this.handleStoppedBurst.bind(this);
    this.handleDataBurst = this.handleDataBurst.bind(this);

    this.socket = createSocket('dataStream', '/dataStreamServer');
    this.openSocket();
  }

  RequestParameter (parameter) {
    if (typeof parameter === 'undefined' || parameter === null || !parameter) {
      return;
    }

    this.RequestedParameters.push(parameter);
    if (this.socket.connected) {
      this.socket.emit('request parameter', parameter);
    }
  }

  stopParameter (parameter) {
    if (typeof parameter === 'undefined' || parameter === null || !parameter) {
      return;
    }

    let parameterIndex = this.RequestedParameters.indexOf(parameter);
    if (parameter === -1) {
      return;
    }

    this.RequestedParameters.splice(parameterIndex, 1);
    if (this.socket.connected) {
      this.socket.emit('stop parameter', parameter);
    }
  }

  stopParameters (parameters) {
    for (let parameter of parameters) {
      this.stopParameter(parameter);
    }
  }

  initialRequest () {
    this.socket.emit('request parameters', this.RequestedParameters);
  }

  handleDataBurst (msg, fn) {
    this.newPacketCallback(msg);
    fn('');
  }

  handleStoppedBurst (msg) {
    if (this.RequestedParameters.indexOf(msg) === -1) {
      return;
    }

    console.warn(`${msg} was stopped but we're still listening to it.`);
    this.socket.emit('request parameter', msg);
  }

  /**
   * Opens a socket.
   * This doesn't actually open a socket because of the single shared "dataStream" socket.
   * Instead, this adds our handlers to the socket.
   */
  openSocket () {
    this.socket.on('stopped burst', this.handleStoppedBurst);
    this.socket.on('new data burst', this.handleDataBurst);
    this.socket.on('connect', this.initialRequest);
  }

  /**
   * "Closes" the socket.
   * This doesn't actually close the socket because of the single shared "dataStream" socket.
   * Instead, this removes our handlers on the socket.
   *
   * @param {Object} Pre/Post socket closing flags.
   * @param {boolean} options.clearParameters Clears all parameters this client is listening to.
   */
  closeSocket (options) {
    // This is stopped first so we do not relisten to our stopped parameters.
    this.socket.removeListener('stopped burst', this.handleStoppedBurst);

    if (options.clearParameters) {
      this.socket.emit('stop parameters', this.RequestedParameters);
      this.RequestedParameters = [];
    }

    this.socket.removeListener('new data burst', this.handleDataBurst);
    this.socket.removeListener('connection', this.initialRequest);
  }
}

export default DataStreamClient;
