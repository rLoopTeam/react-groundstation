import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import EnumStatusDisplay from './EnumStatusDisplay.js';
import ConfirmButton from './buttons/ConfirmButton.js';

import createSocket from '../shared/socket';

import './StateMachine.css';

let socket = createSocket();

const STATEMACHINE_STATES = {
  UNKNOWN_STATE: '?',
  NO_COMMAND: 0,
  IDLE: 1,
  TEST_MODE: 2,
  DRIVE: 3,
  ARMED_WAIT: 4,
  FLIGHT_PREP: 5,
  READY: 6,
  ACCEL: 7,
  COAST_INTERLOCK: 8,
  BRAKE: 9,
  SPINDOWN: 10
};

const STATEMACHINE_STATES_INT_INDEXED = {
  '?': 'UNKNOWN_STATE',
  0: 'NO_COMMAND',
  1: 'IDLE',
  2: 'TEST_MODE',
  3: 'DRIVE',
  4: 'ARMED_WAIT',
  5: 'FLIGHT_PREP',
  6: 'READY',
  7: 'ACCEL',
  8: 'COAST_INTERLOCK',
  9: 'BRAKE',
  10: 'SPINDOWN'
};

const STATEMACHINE_TRANSITIONS = {
  'IDLE': [
    'TEST_MODE',
    'DRIVE',
    'ARMED_WAIT'
  ],
  'TEST_MODE': [
    'IDLE'
  ],
  'DRIVE': [
    'IDLE'
  ],
  'ARMED_WAIT': [
    'IDLE',
    'FLIGHT_PREP'
  ],
  'FLIGHT_PREP': [
    'ARMED_WAIT',
    'READY'
  ],
  'READY': [
    'FLIGHT_PREP'
  ]
};

class StateMachine extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      currentState: 0
    };

    this.availableStates = [];
    this.dataCallback = this.dataCallback.bind(this);
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
    this.state.streamManager.RequestParameterWithCallback('FCU Mission State', this.dataCallback);
  }

  componentWillUnmount () {
    this._isMounted = false;
    this.state.streamManager.destroy();
  }

  dataCallback (parameterData) {
    if (this._isMounted) {
      if (
        parameterData.Value === this.state.currentState &&
        Number(parameterData.Value) === this.state.currentState
      ) {
        return;
      }

      if (isNaN(parameterData.Value)) {
        this.setState({currentState: STATEMACHINE_STATES.UNKNOWN_STATE});
      } else {
        this.setState({currentState: Number(parameterData.Value)});
      }
    }
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

    this.availableStates = STATEMACHINE_TRANSITIONS[STATEMACHINE_STATES_INT_INDEXED[this.state.currentState]] || [];

    return (
      <div>
        <div className='col-md-4'>
          <h2>State Machine</h2>
          <label htmlFor="a0_x">Current State</label>
          <EnumStatusDisplay StreamingPageManager={this.state.streamManager} parameter='FCU Mission State' hideUnits='true' readOnly='true' enumMap={STATEMACHINE_STATES_INT_INDEXED}/>
        </div>
        <div className='col-md-12'>
          <h2 className='d-block'>Manual Transitions</h2>
          <h3 className='d-block'>Available</h3>
          {Object.keys(STATEMACHINE_STATES).map(function (item, index) {
            if (this.availableStates.indexOf(item) === -1) {
              return;
            }
            let cleanName = item.replace('_', ' ').toLowerCase();
            let stateIndex = STATEMACHINE_STATES[item];
            return (
              <div className='form-group stateswitches' key={'SwitchGroup_' + item}>
                <ConfirmButton delay={2000} className="btn btn-warning" action={this.doPodCommand.bind(this, 'unlock', stateIndex)}>Unlock - {cleanName}</ConfirmButton>
                <ConfirmButton delay={2000} className="btn btn-danger" action={this.doPodCommand.bind(this, 'execute', stateIndex)}>Execute - {cleanName}</ConfirmButton>
              </div>
            );
          }, this)}
          <h3 className='d-block'>Unavailable</h3>
          {Object.keys(STATEMACHINE_STATES).map(function (item, index) {
            if (this.availableStates.indexOf(item) !== -1) {
              return;
            }
            let cleanName = item.replace('_', ' ').toLowerCase();
            let stateIndex = STATEMACHINE_STATES[item];
            return (
              <div className='form-group stateswitches' key={'SwitchGroup_' + item}>
                <ConfirmButton delay={2000} className="btn btn-warning" action={this.doPodCommand.bind(this, 'unlock', stateIndex)}>Unlock - {cleanName}</ConfirmButton>
                <ConfirmButton delay={2000} className="btn btn-danger" action={this.doPodCommand.bind(this, 'execute', stateIndex)}>Execute - {cleanName}</ConfirmButton>
              </div>
            );
          }, this)}
        </div>
      </div>
    );
  }
}

export default StateMachine;
