import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import StreamingPageManager from '../StreamingPageManager.js';
import EnumStatusDisplay from './EnumStatusDisplay.js';
import ConfirmButton from './buttons/ConfirmButton.js';
import StateMachineControl from './StateMachineControl';

import { STATEMACHINE_STATES, STATEMACHINE_STATES_INT_INDEXED, STATEMACHINE_TRANSITIONS } from '../shared/constants';

import './StateMachine.css';

class StateMachine extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      currentState: 0,
      availableStates: []
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
      let availableStates = STATEMACHINE_TRANSITIONS[STATEMACHINE_STATES_INT_INDEXED[Number(parameterData.Value)]] || [];
      if (availableStates === this.state.availableStates) {
        return;
      }

      if (isNaN(parameterData.Value)) {
        this.setState({
          currentState: STATEMACHINE_STATES.UNKNOWN_STATE,
          availableStates: availableStates
        });
      }

      this.setState({
        currentState: Number(parameterData.Value),
        availableStates: availableStates
      });
    }
  }

  render () {
    var _this = this;

    return (
      <div>
        <div className='stateStatus'>
          <div className='stateBlock'>
            <span className='stateStatusText d-bold'>CURRENT STATE: </span>
            <EnumStatusDisplay StreamingPageManager={this.state.streamManager} parameter='FCU Mission State' hideUnits='true' inline={true} enumMap={STATEMACHINE_STATES_INT_INDEXED}/>
          </div>
        </div>
        <div className='margin-top-50px'/>
        <div className={'col-md-6 active_' + STATEMACHINE_STATES_INT_INDEXED[this.state.currentState]}>
          <Isvg src='/assets/stateDiagram.svg'/>
        </div>
        <div className='col-md-6'>
          <h2 className='d-block margin-none'>Manual Transitions</h2>
          <h3 className='d-block'>Available</h3>
          <StateMachineControl availableStates={this.state.availableStates} showAvailable={true} />
          <h3 className='d-block'>Unavailable</h3>
          <StateMachineControl availableStates={this.state.availableStates} showAvailable={false} />
        </div>
      </div>
    );
  }
}

export default StateMachine;
