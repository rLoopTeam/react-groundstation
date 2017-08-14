import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';

import createSocket from '../shared/socket';
let socket = createSocket();

class HealthCheck extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      command: 'HC'
    };
  }
  render () {
    return (
        <div className="Overview-content">
        <br />Test markup<br />
        <legend>TEST TEST TEST</legend>
          <div className="form-group">
              <p>Hello from the UK</p>
            </div>

        <legend>Stats</legend>
        <form className="form-inline">
          <div>Test page creation</div>
        </form>
      </div>
    );
  }
}
export default HealthCheck;
