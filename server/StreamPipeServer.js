class StreamPipeServer {
  constructor (app, io, rtDataStore) {
    let self = this;

    this.dataStreamServer = io.of('/dataStreamServer');
    this.requestedParams = {};
    this.lastParams = {};

    this.dataStreamServer.on('connection', function (socket) {
      var clientID = socket.id;

      self.lastParams[clientID] = {};
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
        socket.emit('stopped burst', msg);
      });

      socket.on('stop parameters', function (msg) {
        console.log('StreamPipeServer: ' + clientID + ' stopping: ' + JSON.stringify(msg));
        for (var y = 0; y < msg.length; y++) {
          self.removeParameter(clientID, msg[y]);
          socket.emit('stopped burst', msg);
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
            let paramName = self.requestedParams[clientID][i];
            let paramData = rtDataStore.retrieveDataParameter(paramName);

            // Do not send what the client already has in their datastore.
            if (paramData.Value === self.lastParams[clientID][paramName]) {
              continue;
            }

            // Send and cache if they don't have it.
            newData.parameters.push(paramData);
            self.lastParams[clientID][paramName] = paramData.Value;
          }

          socket.emit('new data burst', newData, function (data) { clientReady = true; });
        }
      }

      socket.on('disconnect', function () {
        rtDataStore.hasNewData.removeListener('new_rtData', sendNewData);
        delete self.requestedParams[clientID];
        delete self.lastParams[clientID];
      });
    });
  }

  addParameter (clientID, parameter) {
    if (this.requestedParams[clientID].indexOf(parameter) !== -1) {
      return;
    }

    if (typeof parameter === 'undefined' || parameter === null || !parameter) {
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
    delete this.lastParams[clientID][parameter];
  }
}

module.exports = function (app, io, rtDataStore) {
  return new StreamPipeServer(app, io, rtDataStore);
};

