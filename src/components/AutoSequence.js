import React, { Component } from 'react';
import ConfirmButton from './buttons/ConfirmButton.js';
import StreamingPageManager from '../StreamingPageManager.js';
import _ from 'lodash';
import defer from 'defer-promise';

import io from 'socket.io-client';
let socket = io.connect('127.0.0.1:3000', {
	reconnection: true,
	reconnectionDelay: 1000,
	reconnectionDelayMax : 5000,
	reconnectionAttempts: Infinity
});

// Max milliseconds between any two test results
// (before we give up on all remaining test results).
const TEST_TIMEOUT = 10000;

class AutoSequence extends Component {

	constructor(props) {
		super(props);

		this.state = { // keyed by FCU state ID (stringified int)
			streamingPageManager: new StreamingPageManager(),

			testResults: [{
				name: 'IDLE',
				state: 0x0001,
				status: 'Pending',
			}, {
				name: 'BRAKES INIT ACTION',
				state: 0x0002,
				status: 'Pending',
			}, {
				name: 'BRAKES INIT EXPECTED RESULT',
				state: 0x0003,
				status: 'Pending',
			}, {
				name: 'BRAKE FULL EXTEND ACTION',
				state: 0x0004,
				status: 'Pending',
			}, {
				name: 'BRAKE FULL EXTEND EXPECTED RESULT',
				state: 0x0005,
				status: 'Pending',
			}, {
				name: 'BRAKE FULL RETRACT ACTION',
				state: 0x0006,
				status: 'Pending',
			}, {
				name: 'BRAKE FULL RETRACT EXPECTED RESULT',
				state: 0x0007,
				status: 'Pending',
			}, {
				name: 'COMPLETE',
				state: 0x0008,
				status: 'Pending',
			}],

			// Added by this.scheduleNextTestResult
			//nextTestResult: defer()
		};

		this.scheduleNextTestResult(null);

		this.state.streamingPageManager.RequestPacketWithCallback(
			'Auto-sequence test',
			// We can't directly pass this.state.nextTestResult.resolve because we want to use the *current* value
			// of this.state.nextTestResult, even if that state property has been reassigned.
			(testResult) => {
				this.state.nextTestResult.resolve(testResult);
			});

		//this._isMounted = true;
	}

	componentWillUnmount() {
		// TODO
		//this._isMounted = false;
		this.state.streamingPageManager.destroy();
	}

	/**
	 * @param {number|null} timeout: Time period (ms) in which the next test result must appear
	 *                               or else we'll give up on all pending tests.
	 */
	scheduleNextTestResult(timeout) {
		var nextTestResult = defer(); // manually resolved when the next packet arrives
		let nextTestResultDeadline = new Promise((resolve, reject) => {
			if (timeout) {
				setTimeout(reject, timeout);
			}
		})
		Promise.race([
			nextTestResult.promise,
			nextTestResultDeadline
		]).then(
			this.recordTestResult.bind(this),
			this.markAllPendingTestResultsAsFailed.bind(this)
		);

		this.setState({
			nextTestResult: nextTestResult,
		});
	}

	recordTestResult(newPacket) {
		var newPacketState = 0x0001;
		var newPacketStatus = 'Pending';
		newPacket.parameters.forEach(function(parameter) {
			if (parameter.name === 'Auto-test State') {
				newPacketState = parameter.value;
			}
			if (parameter.name === 'Auto-test Status') {
				newPacketStatus = !!parameter.value ? 'Pass' : 'Fail';
			}
		});

		var newComponentState = _.cloneDeep(this.state);
		newComponentState.testResults = this.state.testResults.map(function(testResult) {
			if (testResult.state === newPacketState) {
				return _.assign({}, testResult, {
					status: newPacketStatus,
				});
			} else {
				return testResult;
			}
		});
		this.setState(newComponentState);

		this.scheduleNextTestResult(TEST_TIMEOUT);
	}

	markAllPendingTestResultsAsFailed() {
		var newComponentState = _.cloneDeep(this.state);
		newComponentState.testResults = this.state.testResults.map(function(testResult) {
			if (testResult.status === 'Pending') {
				return _.assign({}, testResult, {
					status: 'Timeout',
				});
			} else {
				return testResult;
			}
		});
		this.setState(newComponentState);
	}

	sendStartCommand() {
		socket.emit('AutoSequenceTest:Start');
	}

	sendSkipCommand() {
		socket.emit('AutoSequenceTest:Skip');
	}

	sendKillCommand() {
		socket.emit('AutoSequenceTest:Kill');
	}

	sendRestartCommand() {
		socket.emit('AutoSequenceTest:Restart');
	}

	getTestResults() {
		return _.orderBy(this.state.testResults, ['state']);
	}

	getTestResultClass(status) {
		return {
			'Pending': 'test-result-pending',
			'Pass': 'test-result-passed',
			'Fail': 'test-result-failed',
			'Timeout': 'test-result-failed',
		}[status];
	}

	render() {
		return (
			<div>
				<button type="button" className="btn btn-success" onClick={this.sendStartCommand}>Start</button>
				<button type="button" className="btn btn-success" onClick={this.sendRestartCommand}>Restart</button>
				<ConfirmButton className="btn btn-danger" delay={2000} action={this.sendSkipCommand}>Skip</ConfirmButton>
				<ConfirmButton className="btn btn-danger" delay={2000} action={this.sendKillCommand}>Kill</ConfirmButton>

				<table className='test-results'><tbody>{
					this.getTestResults().map(function(testResult) {
						return <tr
								key={testResult.state}
								className={this.getTestResultClass(testResult.status)}
								>
							<td>{testResult.name}</td>
							<td>{testResult.status}</td>
						</tr>
					}.bind(this))
				}</tbody></table>
			</div>
		);
	}

}

export default AutoSequence;
