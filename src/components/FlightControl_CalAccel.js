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

class FlightControl_CalAccel extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			streamManager: new StreamingPageManager(),
			command: 'FlightControl_Accel',
		}		
	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}

	accelStartStream_CalData(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:StartStream_CalData');
	}
	accelStartStream_FullData(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:StartStream_FullData');
	}
	accelStopStream(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:StopStream');
	}
	
	accelFineZero(data, e) {
		e.preventDefault();
		//data.accel, data.axis
		socket.emit('FlightControl_Accel:FineZero', data);
	}
	accelAutoZero(data, e) {
		e.preventDefault();
		//data.accel, data.axis
		socket.emit('FlightControl_Accel:AutoZero', data);
	}
	
	render(){
	    return (
		    <div className="Overview-content">
			
				<legend>Streaming Control</legend>
					<form className="form-inline">
						<div className="form-group">
							<button type="button" className="btn btn-success" onClick={this.accelStartStream_CalData}  style={{margin:10}}>Start Cal Stream</button>
							<button type="button" className="btn btn-success" onClick={this.accelStartStream_FullData} style={{margin:10}}>Start Full Stream</button>
							<button type="button" className="btn btn-danger" onClick={this.accelStopStream} style={{margin:10}}>Stop Stream</button>
								
						</div>
					</form>
			
				<legend>Accelerometer Calibration</legend>
					
				<div className="row margin-bottom-20px">
					<form className="form-inline col-xs-4">
						<div className="form-group">
								<label htmlFor="a0_x">A0:X-Axis</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 0 X Raw' hideUnits='true' readOnly='true'/>
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 0, axis: 0})}>Fine Zero</button>
							</div>
						</div>
					</form>

					<form className="form-inline col-xs-4">
						<div className="form-group">
							<label htmlFor="a0_y">A0:Y-Axis</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 0 Y Raw' hideUnits='true' readOnly='true'/>
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 0, axis: 1})}>Fine Zero</button>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">
							<label htmlFor="a0_z">A0:Z-Axis</label>
							<div>	
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 0 Z Raw' hideUnits='true' readOnly='true'/>
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 0, axis: 2})}>Fine Zero</button>
								<button className="btn btn-danger" onClick={this.accelAutoZero.bind(this, {accel: 0, axis: 2})}>Auto Zero</button>
							</div>
						</div>
					</form>
				</div>
						
				<div className="row">
					<form className="form-inline col-xs-4">
						<div className="form-group">
							
								<label htmlFor="a1_x">A1:X-Axis</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 X Raw' hideUnits='true' readOnly='true'/>
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 1, axis: 0})}>Fine Zero</button>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">					
							<label htmlFor="a1_y">A1:Y-Axis</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Y Raw' hideUnits='true' readOnly='true'/>
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 1, axis: 1})}>Fine Zero</button>
							</div>
						</div>
					</form>

					<form className="form-inline col-xs-4">
						<div className="form-group">	
							<label htmlFor="a1_z">A1:Z-Axis</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Z Raw' hideUnits='true' readOnly='true'/>
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 1, axis: 2})}>Fine Zero</button>
								<button className="btn btn-danger" onClick={this.accelAutoZero.bind(this, {accel: 1, axis: 2})}>Auto Zero</button>
							</div>
						</div>
					</form>
				</div>
			
				<br></br>
				<br></br>
			
				<legend>Device Status</legend>
				<div className="row">
					<form className="form-inline col-xs-4">
						<div className="form-group">
							
							<label htmlFor="a0_flags">A0:Flags</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 0 Flags' hideUnits='true' hex='true' hexType={32} readOnly='true'/>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">
							
							<label htmlFor="a1_flags">A1:Flags</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Flags' hideUnits='true' hex='true' hexType={32} readOnly='true'/>
							</div>
						</div>
					</form>	
				</div>
				
				<div className="row">
					<form className="form-inline col-xs-4">
						<div className="form-group">
							
							<label htmlFor="last_crc">Last CRC</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Packet Last CRC 1003' hideUnits='true' hex='true' readOnly='true'/>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">
							
							<label htmlFor="packet_count">Packet Count</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Packet Rx Count 1003' hideUnits='true' readOnly='true'/>
							</div>
						</div>
					</form>	
				</div>
				
				<br></br>
				<br></br>
			
				<legend>Development DAQ</legend>
					<form className="form-inline">
						<div className="form-group">
							<button className="btn btn-success" onClick={this.accelStartStream_CalData}>Start DAQ</button>
							<button className="btn btn-danger" onClick={this.accelStopStream}>Stop DAQ</button>
								
						</div>
					</form>
				<br></br>
				<br></br>				
			</div>
	    );
	}
}

export default FlightControl_CalAccel;
