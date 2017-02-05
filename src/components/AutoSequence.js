import React, { Component } from 'react';
import ConfirmButton from './buttons/ConfirmButton.js';
import StreamingPageManager from '../StreamingPageManager.js';
import _ from 'lodash';
import defer from 'defer-promise';

import io from 'socket.io-client';
let socket = io.connect('127.0.0.1:3000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
});

// Time period (ms) in which the next test result must appear,
// else we'll give up on all pending tests and marked them as timed out..
const TEST_TIMEOUT = 10000;

class AutoSequence extends Component {

  constructor (props) {
    super(props);

    this.state = { // keyed by FCU state ID (stringified int)
      streamingPageManager: new StreamingPageManager(),

      testResults: [{
        name: 'IDLE',
        state: 0x0001,
        status: 'Pending'
      }, {
        name: 'BRAKES INIT ACTION',
        state: 0x0002,
        status: 'Pending'
      }, {
        name: 'BRAKES INIT EXPECTED RESULT',
        state: 0x0003,
        status: 'Pending'
      }, {
        name: 'BRAKE FULL EXTEND ACTION',
        state: 0x0004,
        status: 'Pending'
      }, {
        name: 'BRAKE FULL EXTEND EXPECTED RESULT',
        state: 0x0005,
        status: 'Pending'
      }, {
        name: 'BRAKE FULL RETRACT ACTION',
        state: 0x0006,
        status: 'Pending'
      }, {
        name: 'BRAKE FULL RETRACT EXPECTED RESULT',
        state: 0x0007,
        status: 'Pending'
      }, {
      name: 'COMPLETE',
      state: 0x0008,
      status: 'Pending'
    }]

      // Added by this.scheduleNextTestResult
      // nextTestResult: defer()
    };

    this.state.streamingPageManager.RequestPacketWithCallback(
      'Auto-sequence test',
      // We can't directly pass this.state.nextTestResult.resolve because we want to use the *current* value
      // of this.state.nextTestResult, even if that state property has been reassigned.
      (testResult) => {
  if (this.state.nextTestResult) {
    this.state.nextTestResult.resolve(testResult);
  }
});

    // this._isMounted = true;
  }

  componentWillUnmount () {
    // TODO
    // this._isMounted = false;
    this.state.streamingPageManager.destroy();
  }

  scheduleNextTestResult () {
    var nextTestResult = defer(); // manually resolved when the next packet arrives
    let nextTestResultDeadline = new Promise((resolve, reject) => {
      setTimeout(reject, TEST_TIMEOUT);
    });
    Promise.race([
      nextTestResult.promise,
      nextTestResultDeadline
    ]).then(
      this.recordTestResult.bind(this),
      this.markAllPendingTestResultsAsFailed.bind(this)
    );

    this.setState({
      nextTestResult: nextTestResult
    });
  }

  recordTestResult (newPacket) {
    var newPacketState = 0x0001;
    var newPacketStatus = 'Pending';
    newPacket.parameters.forEach(function (parameter) {
      if (parameter.name === 'Auto-test State') {
        newPacketState = parameter.value;
      }
      if (parameter.name === 'Auto-test Status') {
        newPacketStatus = parameter.value ? 'Pass' : 'Fail';
      }
    });

    console.log('' + new Date() + ': got test result from state 0x' + newPacketState.toString(16));

    var newComponentState = _.cloneDeep(this.state);
    newComponentState.testResults = this.state.testResults.map(function (testResult) {
      if (testResult.state === newPacketState &&
        // Make sure we don't overwrite test results if the FCU/testGenerator sends repeated states,
        // or if tests were Started again after the timeout (and not Restarted, which would have reset all statuses).
        testResult.status === 'Pending') {
        return _.assign({}, testResult, {
          status: newPacketStatus
        });
      } else {
        return testResult;
      }
    });
    this.setState(newComponentState);

    this.scheduleNextTestResult();
  }

  markAllPendingTestResultsAsFailed () {
    var newComponentState = _.cloneDeep(this.state);
    newComponentState.testResults = this.state.testResults.map(function (testResult) {
      if (testResult.status === 'Pending') {
        return _.assign({}, testResult, {
          status: 'Timeout'
        });
      } else {
        return testResult;
      }
    });
    this.setState(newComponentState);

    console.log('' + new Date() + ': marked any/all pending test results as timed-out');
  }

  markAllTestResultsAsPending () {
    var newComponentState = _.cloneDeep(this.state);
    newComponentState.testResults = this.state.testResults.map(function (testResult) {
      return _.assign({}, testResult, {
        status: 'Pending'
      });
    });
    this.setState(newComponentState);

    console.log('' + new Date() + ': cleared all test results');
  }

  sendStartCommand () {
    socket.emit('AutoSequenceTest:Start');
    this.scheduleNextTestResult();
    console.log('' + new Date() + ': started tests');
  }

  sendSkipCommand () {
    socket.emit('AutoSequenceTest:Skip');
    console.log('' + new Date() + ': skipped tests');
  }

  sendKillCommand () {
    socket.emit('AutoSequenceTest:Kill');
    console.log('' + new Date() + ': killed pod');
  }

  sendRestartCommand () {
    socket.emit('AutoSequenceTest:Restart');
    this.markAllTestResultsAsPending();
    console.log('' + new Date() + ': restarted tests');
  }

  getTestResults () {
    return _.orderBy(this.state.testResults, ['state']);
  }

  getTestResultClass (status) {
    return {
      'Pending': 'test-result-pending',
      'Pass': 'test-result-passed',
      'Fail': 'test-result-failed',
      'Timeout': 'test-result-failed'
    }[status];
  }

  render () {
    return (
      <div>
        <button type="button" className="btn btn-success" onClick={this.sendStartCommand.bind(this)}>Start</button>
        <button type="button" className="btn btn-success" onClick={this.sendRestartCommand.bind(this)}>Restart</button>
        <ConfirmButton className="btn btn-danger" delay={2000} action={this.sendSkipCommand}>Skip</ConfirmButton>
        <ConfirmButton className="btn btn-danger" delay={2000} action={this.sendKillCommand}>Kill</ConfirmButton>

        <table className='test-results'><tbody>{
          this.getTestResults().map(function (testResult) {
  return <tr
                key={testResult.state}
                className={this.getTestResultClass(testResult.status)}
                >
              <td>{testResult.name}</td>
              <td>{testResult.status}</td>
            </tr>;
}.bind(this))
        }</tbody></table>
      </div>
    );
  }

}

export default AutoSequence;
