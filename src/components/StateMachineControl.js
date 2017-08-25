import React, { Component } from 'react';
import ConfirmButton from './buttons/ConfirmButton.js';
import { STATEMACHINE_STATES, STATEMACHINE_COMMANDS } from '../shared/constants';

import createSocket from '../shared/socket';

let socket = createSocket();

class StateMachineControl extends Component {
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
    return (<div>
      {STATEMACHINE_COMMANDS.map(function (item, index) {
        // Excludes NO_COMMAND from transitions.
        if (index < 1) {
          return;
        } else if (this.props.showAvailable && this.props.availableStates.indexOf(item) === -1) {
          return;
        } else if (!this.props.showAvailable && this.props.availableStates.indexOf(item) !== -1) {
          return;
        }

        let cleanName = item.replace('_', ' ').toLowerCase();
        return (
          <div className='form-group stateswitches' key={'SwitchGroup_' + item}>
            <ConfirmButton delay={2000} className="btn btn-warning" action={this.doPodCommand.bind(this, 'unlock', index)}>Unlock - {cleanName}</ConfirmButton>
            <ConfirmButton delay={2000} className="btn btn-danger" action={this.doPodCommand.bind(this, 'execute', index)}>Execute - {cleanName}</ConfirmButton>
          </div>
        );
      }, this)}
    </div>);
  }
}

export default StateMachineControl;

