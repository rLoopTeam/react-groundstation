import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';

import io from 'socket.io-client';
let socket = io.connect('127.0.0.1:3000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
});

class FlightControl_Contrast extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      command: 'FlightControl_Contrast'
    };
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  FCUContrast_StartStream (e) {
    e.preventDefault();
    socket.emit('FlightControl_Contrast:StartStream');
  }
  FCUContrast_StopStream (e) {
    e.preventDefault();
    socket.emit('FlightControl_Contrast:StopStream');
  }

  render () {
      return (
        <div className="Overview-content">

        <legend>Contrast Sensor - Streaming</legend>
          <form className="form-inline">
            <div className="form-group">
              <button type="button" className="btn btn-success" onClick={this.FCUContrast_StartStream}>Start Stream</button>
              <button type="button" className="btn btn-danger" onClick={this.preventDefault}>Stop Stream</button>

            </div>
          </form>
      </div>
      );
  }
}

export default FlightControl_Contrast;
