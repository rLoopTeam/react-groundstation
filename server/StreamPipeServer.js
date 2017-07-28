class StreamPipeServer {
  constructor (app, io, rtDataStore) {
    let self = this;

    this.dataStreamServer = io.of('/dataStreamServer');
    this.requestedParams = {};

    this.dataStreamServer.on('connection', function (socket) {
      var clientID = socket.id;
      self.requestedParams[clientID] = [];

      console.log(`StreamPipeServer: New client id ${socket.id}`);

      socket.on('request parameters', function (msg) {
        console.log('StreamPipeServer: ' + clientID + ' requested: ' + JSON.stringify(msg));
        for (var y = 0; y < msg.length; y++) {
          self.addParameter(clientID, msg[y]);
        }
      });

      socket.on('request parameter', function (msg) {
        console.log('StreamPipeServer: ' + clientID + ' requested: ' + JSON.stringify(msg));
        self.addParameter(clientID, msg);
      });

      socket.on('stop parameter', function (msg) {
        console.log('StreamPipeServer: ' + clientID + ' stopping: ' + JSON.stringify(msg));
        self.removeParameter(clientID, msg);
      });

      socket.on('stop parameters', function (msg) {
        console.log('StreamPipeServer: ' + clientID + ' stopping: ' + JSON.stringify(msg));
        for (var y = 0; y < msg.length; y++) {
          self.removeParameter(clientID, msg[y]);
        }
      });

      var clientReady = true;
      rtDataStore.hasNewData.on('new_rtData', sendNewData);

      /**
       * @param {object} newDataPacket: See realtimeDataStore.insertDataPacket for more info.
       */
      function sendNewData (newDataPacket) {
        // Wait for an acknowledge to send new data, otherwise we fill up the OS buffers and bad things happen
        if (clientReady) {
          clientReady = false;

          var newData = {
            packet: newDataPacket,
            parameters: []
          };

          for (var i = 0, len = self.requestedParams[clientID].length; i < len; i++) {
            newData.parameters.push(rtDataStore.retrieveDataParameter(self.requestedParams[clientID][i]));
          }

          socket.emit('new data burst', newData, function (data) { clientReady = true; });
        }
      }

      socket.on('disconnect', function () {
        rtDataStore.hasNewData.removeListener('new_rtData', sendNewData);
      });
    });
  }

  addParameter (clientID, parameter) {
    if (this.requestedParams[clientID].indexOf(parameter) !== -1) {
      return;
    }

    if (typeof parameter === 'undefined' || parameter === null) {
      return;
    }

    this.requestedParams[clientID].push(parameter);
  }

  removeParameter (clientID, parameter) {
    let parameterIndex = this.requestedParams[clientID].indexOf(parameter);

    // Element not found.
    if (parameterIndex === -1) {
      return;
    }

    this.requestedParams[clientID].splice(parameterIndex, 1);
  }
}

module.exports = function (app, io, rtDataStore) {
  return new StreamPipeServer(app, io, rtDataStore);
};

