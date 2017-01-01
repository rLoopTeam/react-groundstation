import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import GenericParameterInput from './GenericParameterInput.js';

import io from 'socket.io-client';
let socket = io.connect('127.0.0.1:3000', {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});

class FlightControl_Accel extends Component {
	constructor(props) {
		super(props)
		this.dataCallback = this.dataCallback.bind(this);

		
		this.state = {
			streamManager: new StreamingPageManager(),
			command: 'FlightControl_Accel',
			accelerometer0: {
				flags: "N/A",
				x: 0,
				y: 0,
				z: 0
			},
			accelerometer1: {
				flags: "N/A",
				x: 0,
				y: 0,
				z: 0
			}
		}
		
		this.state.streamManager.RequestParameterWithCallback('Accel 0 X Raw', this.dataCallback);
		this.state.streamManager.RequestParameterWithCallback('Accel 0 Y Raw', this.dataCallback);
		this.state.streamManager.RequestParameterWithCallback('Accel 0 Z Raw', this.dataCallback);
		this.state.streamManager.RequestParameterWithCallback('Accel 1 X Raw', this.dataCallback);
		this.state.streamManager.RequestParameterWithCallback('Accel 1 Y Raw', this.dataCallback);
		this.state.streamManager.RequestParameterWithCallback('Accel 1 Z Raw', this.dataCallback);
		
		
	}
	
	componentDidMount() {
        var _this = this;
		
		socket.on('connect', function() {
			console.log('Client now connected!')

			socket.on('FlightControl_Accel:telemetry', function(data){
				var _accelerometer0 = this.state.accelerometer0;
				var _accelerometer1 = this.state.accelerometer1;

				_accelerometer0.x = data._accelerometer0.x;
				_accelerometer0.y = data._accelerometer0.y;
				_accelerometer0.z = data._accelerometer0.z;
				
				_accelerometer1.x = data._accelerometer1.x;
				_accelerometer1.y = data._accelerometer1.y;
				_accelerometer1.z = data._accelerometer1.z;
				

				this.setState({
					_accelerometer0: _accelerometer0, 
					_accelerometer1: _accelerometer1
				});

				console.log(data);
			})
		});
		
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
	
	dataCallback(parameterData){
		var accelerometer0 = {x:this.state.accelerometer0.x,y:this.state.accelerometer0.y,z:this.state.accelerometer0.z};
		var accelerometer1 = {x:this.state.accelerometer1.x,y:this.state.accelerometer1.y,z:this.state.accelerometer1.z};

		if(this._isMounted){
			switch(parameterData.Name){
				case 'Accel 0 X Raw': accelerometer0.x = parameterData.Value; this.setState({accelerometer0: accelerometer0}); break;
				case 'Accel 0 Y Raw': accelerometer0.y = parameterData.Value; this.setState({accelerometer0: accelerometer0}); break;
				case 'Accel 0 Z Raw': accelerometer0.z = parameterData.Value; this.setState({accelerometer0: accelerometer0}); break;
				case 'Accel 1 X Raw': accelerometer1.x = parameterData.Value; this.setState({accelerometer1: accelerometer1}); break;
				case 'Accel 1 Y Raw': accelerometer1.y = parameterData.Value; this.setState({accelerometer1: accelerometer1}); break;
				case 'Accel 1 Z Raw': accelerometer1.z = parameterData.Value; this.setState({accelerometer1: accelerometer1}); break;
			}
			
		}
	}

	render(){

	    return (
		    <div className="Overview-content">
			
				<legend>Streaming Control</legend>
					<form className="form-inline">
						<div className="form-group">
							<button type="button" className="btn btn-success" onClick={this.accelStartStream_CalData}>Start Stream</button>
							<button type="button" className="btn btn-danger" onClick={this.accelStopStream}>Stop Stream</button>
								
						</div>
					</form>
			
					{ /*
				<table width='100%'><tbody>
				<tr>
					<td>
					<legend>Accel 1 Live</legend>
					<div>Rxed:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Packet Stat 1003'/></div><br />
					<div>Flags:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 Flags' hex='true'/></div><br />
					<div>X Raw:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 X Raw' /></div><br />
					<div>Y Raw:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 Y Raw' /></div><br />
					<div>Z Raw:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 Z Raw' /></div><br />
					<div>X Gs:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 X Gs' /></div><br />
					<div>Y Gs:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 Y Gs' /></div><br />
					<div>Z Gs:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 Z Gs' /></div><br />
					<div>Roll:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 Roll' /></div><br />
					<div>Pitch:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 0 Pitch' /></div><br />
					</td><td>
					<legend>Accel 2 Live</legend>
					<div>Flags:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 Flags' hex='true'/></div><br />
					<div>X Raw:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 X Raw' /></div><br />
					<div>Y Raw:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 Y Raw' /></div><br />
					<div>Z Raw:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 Z Raw' /></div><br />
					<div>X Gs:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 X Gs' /></div><br />
					<div>Y Gs:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 Y Gs' /></div><br />
					<div>Z Gs:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 Z Gs' /></div><br />
					<div>Roll:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 Roll' /></div><br />
					<div>Pitch:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 Pitch' /></div><br />
					</td>
				</tr></tbody>
				</table>
					*/ }
							
				<legend>Accelerometer Calibration</legend>
					
				<div className="row margin-bottom-20px">
					<form className="form-inline col-xs-4">
						<div className="form-group">
								<label htmlFor="a0_x">A0:X-Axis</label>
							<div>
								<input type="text" className="form-control" id="a0_x" name="a0_x"  value={this.state.accelerometer0.x} readOnly />
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 0, axis: 0})}>Fine Zero</button>
							</div>
						</div>
					</form>

					<form className="form-inline col-xs-4">
						<div className="form-group">
							<label htmlFor="a0_y">A0:Y-Axis</label>
							<div>
								<input type="text" className="form-control" id="a0_y" name="a0_y" value={this.state.accelerometer0.y} readOnly />
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 0, axis: 1})}>Fine Zero</button>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">
							<label htmlFor="a0_z">A0:Z-Axis</label>
							<div>	
								<input type="text" className="form-control" id="a0_z" name="a0_z" value={this.state.accelerometer0.z} readOnly />
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
								<input type="text" className="form-control" id="a1_x" name="a1_x" value={this.state.accelerometer1.x} readOnly />
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 1, axis: 0})}>Fine Zero</button>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">					
							<label htmlFor="a1_y">A1:Y-Axis</label>
							<div>
								<input type="text" className="form-control" id="a1_y" name="a1_y" value={this.state.accelerometer1.y} readOnly />
								<button className="btn btn-primary" onClick={this.accelFineZero.bind(this, {accel: 1, axis: 1})}>Fine Zero</button>
							</div>
						</div>
					</form>

					<form className="form-inline col-xs-4">
						<div className="form-group">	
							<label htmlFor="a1_z">A1:Z-Axis</label>
							<div>
								<input type="text" className="form-control" id="a1_z" name="a1_z" value={this.state.accelerometer1.z} readOnly />
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
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 0 Flags' hex='true' readOnly='true'/>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">
							
							<label htmlFor="a1_flags">A1:Flags</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Flags' hex='true' readOnly='true'/>
							</div>
						</div>
					</form>	
				</div>
				
				<div className="row">
					<form className="form-inline col-xs-4">
						<div className="form-group">
							
							<label htmlFor="last_crc">Last CRC</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Packet Last CRC 1003' hex='true' readOnly='true'/>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">
							
							<label htmlFor="packet_count">Packet Count</label>
							<div>
								<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Packet Rx Count 1003' readOnly='true'/>
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

export default FlightControl_Accel;






// WEBPACK FOOTER //
// ./src/components/FlightControl_Accel.js


// WEBPACK FOOTER //
// ./src/components/FlightControl_Accel.js


// WEBPACK FOOTER //
// ./src/components/FlightControl_Accel.js


// WEBPACK FOOTER //
// ./src/components/FlightControl_Accel.js


// WEBPACK FOOTER //
// ./src/components/FlightControl_Accel.js


// WEBPACK FOOTER //
// ./src/components/FlightControl_Accel.js


// WEBPACK FOOTER //
// ./src/components/FlightControl_Accel.js


// WEBPACK FOOTER //
// ./src/components/FlightControl_Accel.js