import React, { PureComponent } from 'react';
import ClickActionButton from './buttons/ClickActionButton.js';
import { STATEMACHINE_STATES, STATEMACHINE_COMMANDS } from '../shared/constants';

import createSocket from '../shared/socket';

let socket = createSocket();

// Assuming 1s latency over the 10s unlock time.
const STATE_LOCK_TIMEOUT = 9000;

class StateMachineControl extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      unlocked: []
    };

    this.timeouts = {};

    // Binded functions so that we do not create new functions on every render.
    this.doUnlock = this.doUnlock.bind(this);
    this.doExecute = this.doExecute.bind(this);
    this.commandsMap = this.commandsMap.bind(this);
  }

  updateLockState (action, index) {
    /**
     * Updater function that updates the unlocked controls on the client side.
     * We have to update states by copying the array with slice() and manipulate the copy
     * because of the way JS treats arrays and React's comparasion logic.
     */
    let newState = this.state.unlocked.slice();
    if (action === 'unlock') {
      // Push the state onto the state list if it does not exists.
      if (newState.indexOf(index) === -1) {
        newState.push(index);
      }

      // Set a timer to remove the index if an execute is not called.
      if (this.timeouts[index]) {
        clearTimeout(this.timeouts[index]);
      }

      this.timeouts[index] = setTimeout(() => {
        this.updateLockState('timeout', index);
      }, STATE_LOCK_TIMEOUT);
    } else if (action === 'execute' || action === 'timeout') {
      let stateIndex = newState.indexOf(index);
      if (stateIndex === -1) {
        return;
      }

      newState.splice(stateIndex, 1);
    }

    this.setState({
      unlocked: newState
    });
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

  doUnlock (buttonProps) {
    this.doPodCommand('unlock', buttonProps.index);
    this.updateLockState('unlock', buttonProps.index);
  }

  doExecute (buttonProps) {
    this.doPodCommand('execute', buttonProps.index);
    this.updateLockState('execute', buttonProps.index);
  }

  commandsMap (item, index) {
    let extraClasses = [];
    let goButtonClasses = [];
    let disableGo = false;

    // Excludes NO_COMMAND from transitions.
    if (index < 1) {
      return null;
    } else if (this.props.availableStates.indexOf(item) !== -1) {
      extraClasses.push('available');
    } else {
      extraClasses.push('unavailable');
    }

    if (this.state.unlocked.indexOf(index) === -1) {
      goButtonClasses.push('unavailable');
      disableGo = true;
    }

    let cleanName = item.replace('_', ' ').toUpperCase();
    return (
      <div className={'d-inline-block ' + extraClasses.join(' ')} key={'SwitchGroup_' + item}>
        <legend>{cleanName}</legend>
        <ClickActionButton className='btn btn-state ' index={index} action={this.doUnlock}>Set</ClickActionButton>
        <ClickActionButton className={'btn btn-state ' + goButtonClasses.join(' ')} index={index} action={this.doExecute} disabled={disableGo}>Go</ClickActionButton>
      </div>
    );
  }

  render () {
    return (
      <div className='stateBlock'>
        {STATEMACHINE_COMMANDS.map(this.commandsMap, this)}
      </div>
    );
  }
}

export default StateMachineControl;

