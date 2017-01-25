import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import _ from 'lodash';
import defer from 'defer-promise';

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
				status: '?',
			}, {
				name: 'BRAKES INIT ACTION',
				state: 0x0002,
				status: '?',
			}, {
				name: 'BRAKES INIT EXPECTED RESULT',
				state: 0x0003,
				status: '?',
			}, {
				name: 'BRAKE FULL EXTEND ACTION',
				state: 0x0004,
				status: '?',
			}, {
				name: 'BRAKE FULL EXTEND EXPECTED RESULT',
				state: 0x0005,
				status: '?',
			}, {
				name: 'BRAKE FULL RETRACT ACTION',
				state: 0x0006,
				status: '?',
			}, {
				name: 'BRAKE FULL RETRACT EXPECTED RESULT',
				state: 0x0007,
				status: '?',
			}, {
				name: 'COMPLETE',
				state: 0x0008,
				status: '?',
			}],

			// Added by this.scheduleNextTestResult
			//nextTestResult: defer()
		};

		this.scheduleNextTestResult(null);

		this.state.streamingPageManager.RequestPacketWithCallback(
			'Auto-sequence test',
			this.state.nextTestResult.resolve);

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
		this.state.nextTestResult = defer(); // manually resolved when the next packet arrives
		let nextTestResultDeadline = new Promise((resolve, reject) => {
			if (timeout) {
				setTimeout(reject, timeout);
			}
		})
		Promise.race([
			this.state.nextTestResult.promise,
			nextTestResultDeadline
		]).then(
			this.recordTestResult.bind(this),
			this.markAllPendingTestResultsAsFailed.bind(this)
		);
	}

	recordTestResult(newPacket) {
		var newPacketState = 0x0001;
		var newPacketStatus = '?';
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
			if (testResult.status === '?') {
				return _.assign({}, testResult, {
					status: 'Timeout',
				});
			} else {
				return testResult;
			}
		});
		this.setState(newComponentState);
	}

	getTestResults() {
		return _.orderBy(this.state.testResults, ['state']);
	}

	getTestResultClass(status) {
		return {
			'?': 'test-result-unknown',
			'Pass': 'test-result-passed',
			'Fail': 'test-result-failed',
			'Timeout': 'test-result-failed',
		}[status];
	}

	render() {
		return (
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
		);
	}

}

export default AutoSequence;
