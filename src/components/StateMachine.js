import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import ConfirmButton from './buttons/ConfirmButton.js';

import createSocket from '../shared/socket';

import './StateMachine.css';

let socket = createSocket();

class StateMachine extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager()
    };

    this.pod_commands = [
      'no_command',
      'idle',
      'test_mode',
      'drive',
      'flight_prep',
      'armed_wait',
      'ready'
    ];
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  doPodCommand (action, command) {
    if (action !== 'unlock' && action !== 'execute') {
      console.error(`Unknown pod action command. ${action}`);
      return;
    }

    socket.emit('FlightControl:GenPodCommand', {
      action: action,
      command: command
    });
  }

  render () {
    var _this = this;

    return (
      <div>
        <div className='col-md-4'>
          <h2>State Machine</h2>
          <label htmlFor="a0_x">Current State</label>
          <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='State Machine State' hideUnits='true' readOnly='true'/>
        </div>
        <div className='col-md-12'>
          <h2 className='d-block'>Manual Control</h2>
          {this.pod_commands.map(function (item, index) {
            let cleanName = item.replace('_', ' ');
            return (
              <div className='form-group stateswitches' key={'SwitchGroup_' + item}>
                <ConfirmButton delay={2000} className="btn btn-warning" action={this.doPodCommand.bind(this, 'unlock', index)}>Unlock - {cleanName}</ConfirmButton>
                <ConfirmButton delay={2000} className="btn btn-danger" action={this.doPodCommand.bind(this, 'execute', index)}>Execute - {cleanName}</ConfirmButton>
              </div>
            );
          }, this)}
        </div>
      </div>
    );
  }
}

export default StateMachine;
