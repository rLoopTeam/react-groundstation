import React, { Component } from 'react';
import GenericParameterInput from './GenericParameterInput.js';
import StreamingPageManager from '../StreamingPageManager.js';
import _ from 'lodash';

class AutoSequence extends Component {

	constructor(props) {
		super(props);

		this.state = { // keyed by FCU state ID (stringified int)
			streamingPageManager: new StreamingPageManager(),

			testResults: {
				0x0001: {
					name: 'IDLE',
					status: null,
				},
				0x0002: {
					name: 'BRAKES INIT ACTION',
					status: null,
				},
				0x0003: {
					name: 'BRAKES INIT EXPECTED RESULT',
					status: null,
				},
				0x0004: {
					name: 'BRAKE FULL EXTEND ACTION',
					status: null,
				},
				0x0005: {
					name: 'BRAKE FULL EXTEND EXPECTED RESULT',
					status: null,
				},
				0x0006: {
					name: 'BRAKE FULL RETRACT ACTION',
					status: null,
				},
				0x0007: {
					name: 'BRAKE FULL RETRACT EXPECTED RESULT',
					status: null,
				},
				0x0008: {
					name: 'COMPLETE',
					status: null,
				},
			},
		};

		this.state.streamingPageManager.RequestPacketWithCallback('Auto-sequence test', this.dataCallback.bind(this));
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.state.streamingPageManager.destroy();
	}

	dataCallback(fcuPacket){
		// TODO: fix this gating logic, assuming it's needed
		//if (this._isMounted) {
			var fcuState = 0x0001;
	        var fcuStatus = null;
			fcuPacket.parameters.forEach(function(parameter) {
				if (parameter.name === 'Auto-test State') {
					fcuState = parameter.value;
				}
				if (parameter.name === 'Auto-test Status') {
					fcuStatus = parameter.value;
				}
			});

			var newComponentState = _.cloneDeep(this.state);
			newComponentState.testResults[fcuState].status = fcuStatus;
			this.setState(newComponentState);
		//}
	}

	toJSON() {
		return JSON.stringify(this.state.testResults);
	}

	render() {
		return (
			<div>
				<p>All test results: </p> {this.toJSON()}

				<p>State:</p>
				<GenericParameterInput StreamingPageManager={this.state.streamingPageManager} parameter='Auto-test State' hideUnits='true' hex='true' readOnly='true'/>
				<p>Status:</p>
				<GenericParameterInput StreamingPageManager={this.state.streamingPageManager} parameter='Auto-test Status' hideUnits='true' hex='true' readOnly='true'/>
			</div>
		);
	}

}

export default AutoSequence;
