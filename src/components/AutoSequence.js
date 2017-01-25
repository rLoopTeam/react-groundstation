import React, { Component } from 'react';
import GenericParameterInput from './GenericParameterInput.js';
import StreamingPageManager from '../StreamingPageManager.js';
import _ from 'lodash';

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
		};

		this.state.streamingPageManager.RequestPacketWithCallback('Auto-sequence test', this.dataCallback.bind(this));
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.state.streamingPageManager.destroy();
	}

	dataCallback(newPacket){
		// TODO: fix this gating logic, assuming it's needed
		//if (this._isMounted) {
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
						status: newPacketStatus
					});
				} else {
					return testResult;
				}
			});
			this.setState(newComponentState);
		//}
	}

	getTestResults() {
		return _.orderBy(this.state.testResults, ['state']);
	}

	getTestResultClass(status) {
		return {
			'?': 'test-result-unknown',
			'Pass': 'test-result-passed',
			'Fail': 'test-result-failed',
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
