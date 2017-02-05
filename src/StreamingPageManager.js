import DataStreamClient from './StreamPipeClient.js';

class StreamingPageManager {

  constructor () {
    this.parameterCallbacks = [];
    this.packetCallbacks = [];

    this.newPacketCallback = this.newPacketCallback.bind(this);

    this.DataStreamClient = new DataStreamClient(this.newPacketCallback);
  }

  newPacketCallback (newData) {
    var parameterList = newData.parameters;
    for (var i = 0, len1 = this.parameterCallbacks.length; i < len1; i++) {
      var name = this.parameterCallbacks[i].parameter;
      for (var y = 0, len2 = parameterList.length; y < len2; y++)			{
        if (parameterList[y].Name === name) {
          this.parameterCallbacks[i].callback(parameterList[y]);
          break;
        }
      }
    }

    for (i = 0; i < this.packetCallbacks.length; i++) {
      if (newData.packet.packetName === this.packetCallbacks[i].packetName) {
        this.packetCallbacks[i].callback(newData.packet);
      }
    }
  }

  destroy () {

  }

	/**
	 * Allows a component to subscribe to an entire packet (by type) from the pod
	 * @param {string} packetName
	 * @param {function} callback
	 */
  RequestPacketWithCallback (packetName, callback) {
    this.packetCallbacks.push({packetName: packetName, callback: callback});
  }

	/**
	 * Allows a component to subscribe to a single packet parameter from the pod
	 * @param {string} parameter The
	 * @param {function} callback
	 */
  RequestParameterWithCallback (parameter, callback)	{
    this.parameterCallbacks.push({parameter: parameter, callback: callback});
    this.requestParameterFromServer(parameter);
  }

  requestParameterFromServer (parameter) {
    this.DataStreamClient.RequestParameter(parameter);
  }
}

export default StreamingPageManager;
