import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';

import io from 'socket.io-client';
let socket = io.connect('127.0.0.1:3000', {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});

class DAQ extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			streamManager: new StreamingPageManager(),
			command: 'DAQ',
		}		
	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	startAllLogging(data, e) {
		e.preventDefault();
		socket.emit('AllLogging:Start', data);
	}
	
	stopAllLogging(data, e) {
		e.preventDefault();
		socket.emit('AllLogging:Stop', data);
	}
	
	render(){
	    return (
		    <div className="Overview-content">
				<br /><br />
				<legend>All Local Logging</legend>
					<form className="form-inline">
						<div className="form-group">
							<button className="btn btn-success" onClick={this.startAllLogging.bind(this, {})}>Start</button>
							<button className="btn btn-danger" onClick={this.stopAllLogging.bind(this, {})}>Stop</button><br /><br />

						</div>
					</form>
					
				<legend>Stats</legend>
				<form className="form-inline">
					<div>Logged Full Accel Packets:</div>
					<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Packet DAQ Count 1003' hideUnits='true' readOnly='true'/>
				</form>

				<br></br>
				<br></br>				
			</div>
	    );
	}
}

export default DAQ;
