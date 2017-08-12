import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import config from '../../config/commConfig';

import createSocket from '../shared/socket';

let socket = createSocket();

class PowerNodeConfig extends Component {
  constructor (props) {
    super(props);
    this.render = this.render;

    this.state = {
      streamManager: new StreamingPageManager()
    };
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  PowerAToPowerB (data, e) {
    socket.emit('PowerA:ToPowerB');
  }

  PowerBToPowerA (data, e) {
    socket.emit('PowerB:ToPowerA');
  }

  render () {
    var _this = this;
    var buttonClasses = 'btn btn-primary ' + ((this.state.developmentMode) ? '' : 'disabled');

    let borderStyle = {border: '2px solid black', borderRadius: '10px', padding: '10px', width: '50%'};

    return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                    <legend>Pack Personality Config</legend>
                    <button type="button" className="btn btn-success" onClick={this.PowerAToPowerB.bind(this, {})} style={{margin: 10}}>Power A To Power B</button><br />
                    <button type="button" className="btn btn-success" onClick={this.PowerBToPowerA.bind(this, {})} style={{margin: 10}}>Power B To Power A</button>
                    </div>
                </div>
            </div>
    );
  }
}

export default PowerNodeConfig;

