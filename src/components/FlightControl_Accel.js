import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io.connect('127.0.0.1:9100', {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});

class FlightControl_Accel extends Component {
	constructor(props) {
		super(props)
		this.state = {
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
	
	accelZero(e, acc, axis) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:Zero', {acc, axis});
	}
	accelCoarse(e, acc, axis) {
		e.preventDefault();
		socket.emit('FlightControl_Accel:Coarse', {acc, axis});
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
					
				<div className="row margin-bottom-20px">
					<form className="form-inline col-xs-4">
						<div className="form-group">
								<label htmlFor="a0_x">A0:X-Axis</label>
							<div>
								<input type="text" className="form-control" id="a0_x" name="a0_x" value={this.state.accelerometer0.x} readOnly />
								<button type="submit" className="btn btn-primary" onClick={this.accelZero.bind(this)}>Fine Zero</button>
							</div>
						</div>
					</form>

					<form className="form-inline col-xs-4">
						<div className="form-group">
							<label htmlFor="a0_y">A0:Y-Axis</label>
							<div>
								<input type="text" className="form-control" id="a0_y" name="a0_y" value={this.state.accelerometer0.y} readOnly />
								<button type="submit" className="btn btn-primary" onClick={this.accelZero.bind(this)}>Fine Zero</button>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">
							<label htmlFor="a0_z">A0:Z-Axis</label>
							<div>	
								<input type="text" className="form-control" id="a0_z" name="a0_z" value={this.state.accelerometer0.z} readOnly />
								<button type="submit" className="btn btn-primary" onClick={this.accelZero.bind(this)}>Fine Zero</button>
								<button type="submit" className="btn btn-danger" onClick={this.accelCoarse.bind(this)}>Coarse Zero</button>
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
								<button type="submit" className="btn btn-primary" onClick={this.accelZero.bind(this)}>Fine Zero</button>
							</div>
						</div>
					</form>	

					<form className="form-inline col-xs-4">
						<div className="form-group">					
							<label htmlFor="a1_y">A1:Y-Axis</label>
							<div>
								<input type="text" className="form-control" id="a1_y" name="a1_y" value={this.state.accelerometer1.y} readOnly />
								<button type="submit" className="btn btn-primary" onClick={this.accelZero.bind(this)}>Fine Zero</button>
							</div>
						</div>
					</form>

					<form className="form-inline col-xs-4">
						<div className="form-group">	
							<label htmlFor="a1_z">A1:Z-Axis</label>
							<div>
								<input type="text" className="form-control" id="a1_z" name="a1_z" value={this.state.accelerometer1.z} readOnly />
								<button type="submit" className="btn btn-primary" onClick={this.accelZero.bind(this)}>Fine Zero</button>
								<button type="submit" className="btn btn-danger" onClick={this.accelCoarse.bind(this)}>Coarse Zero</button>
							</div>
						</div>
					</form>
				</div>
			
				<br></br>
				<br></br>
			
				<legend>Device Status</legend>
			
				
			</div>
	    );
	}
}

export default FlightControl_Accel;



