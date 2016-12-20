import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class FlightControl_Accel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			command: 'FlightControl_Accel'
		}
	}

	componentDidMount() {
        var _this = this;

		socket.on('server event', function (data) {
	        console.log(data);
	        socket.emit('client event', { socket: 'io connected' });
	    });
	}

	accelStartStream(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:StartStream');
	}
	accelStopStream(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:StopStream');
	}
	
	accelZeroX0(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:ZeroX0');
	}
	accelZeroY0(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:ZeroY0');
	}	
	accelZeroZ0(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:ZeroZ0');
	}
	
	accelCoarse0(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:Coarse0');
	}
	
	accelZeroX1(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:ZeroX1');
	}
	accelZeroY1(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:ZeroY1');
	}	
	accelZeroZ1(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:ZeroZ1');
	}
	
	accelCoarse1(e) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:Coarse1');
	}
	
	
	render(){

	    return (
		    <div className="Overview-content">
			
				<legend>Streaming Control</legend>
				<form className="form-inline">
					<div className="form-group">
						<button className="btn btn-success" onClick={this.accelStartStream.bind(this)}>Start Stream</button>
						<button className="btn btn-danger" onClick={this.accelStopStream.bind(this)}>Stop Stream</button>
							
					</div>
				</form>
			
				<br></br>
				<br></br>
			
				<legend>Accelerometer Calibration</legend>
				<form className="form-inline">
					<div className="form-group">
						<div>
							<label for="a0_x">A0:X-Axis</label>
							<input type="text" className="form-control" name="a0_x" value={0} readonly />
							<button type="submit" className="btn btn-primary" onClick={this.accelZeroX0.bind(this)}>Fine Zero</button>
												
							<label for="a0_y">A0:Y-Axis</label>
							<input type="text" className="form-control" name="a0_y" value={0} readonly />
							<button type="submit" className="btn btn-primary" onClick={this.accelZeroY0.bind(this)}>Fine Zero</button>
							
							<label for="a0_z">A0:Z-Axis</label>
							<input type="text" className="form-control" name="a0_z" value={0} readonly />
							<button type="submit" className="btn btn-primary" onClick={this.accelZeroZ0.bind(this)}>Fine Zero</button>
							
							<button type="submit" className="btn btn-danger" onClick={this.accelCoarse0.bind(this)}>Coarse Zero</button>
						</div>
						
						<br></br>
						
						<div>
							<label for="a1_x">A1:X-Axis</label>
							<input type="text" className="form-control" name="a1_x" value={0} readonly />
							<button type="submit" className="btn btn-primary" onClick={this.accelZeroX1.bind(this)}>Fine Zero</button>
												
							<label for="a1_y">A1:Y-Axis</label>
							<input type="text" className="form-control" name="a1_y" value={0} readonly />
							<button type="submit" className="btn btn-primary" onClick={this.accelZeroY1.bind(this)}>Fine Zero</button>
							
							<label for="a1_z">A1:Z-Axis</label>
							<input type="text" className="form-control" name="a1_z" value={0} readonly />
							<button type="submit" className="btn btn-primary" onClick={this.accelZeroZ1.bind(this)}>Fine Zero</button>
							
							<button type="submit" className="btn btn-danger" onClick={this.accelCoarse1.bind(this)}>Coarse Zero</button>

						</div>
						
					</div>
				</form>
			
				<br></br>
				<br></br>
			
				<legend>Device Status</legend>
			
				
			</div>
	    );
	}
}

export default FlightControl_Accel;

