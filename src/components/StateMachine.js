import React, { PureComponent } from 'react';
import Isvg from 'react-inlinesvg';
import StreamingPageManager from '../StreamingPageManager.js';
import EnumStatusDisplay from './EnumStatusDisplay.js';
import StateMachineControl from './StateMachineControl';

import { STATEMACHINE_STATES, STATEMACHINE_STATES_INT_INDEXED, STATEMACHINE_TRANSITIONS } from '../shared/constants';

import './StateMachine.scss';

class StateMachine extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      currentState: 0,
      availableStates: []
    };

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
          <div className='stateBlock currentState'>
            <EnumStatusDisplay StreamingPageManager={this.state.streamManager} parameter='FCU Mission State' hideUnits='true' inline={true} enumMap={STATEMACHINE_STATES_INT_INDEXED} color='#FFF'/>
          </div>
          <StateMachineControl availableStates={this.state.availableStates} />
        </div>
        <div className='margin-top-50px'/>
        <div className={'col-md-12 active_' + STATEMACHINE_STATES_INT_INDEXED[this.state.currentState]}>
          <Isvg src='/assets/stateDiagram.svg'/>
        </div>
      </div>
    );
  }
}

export default StateMachine;
