import React, { Component } from 'react';
import { socket } from 'socket.io';

class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			parameter: 123.4,
			log:"some large amount of text"
		}
	}
	sendParameter(e, index, type, value) {
		e.preventDefault();
		socket.on('server event', function (data) {
	        console.log(data);
	        socket.emit('client event', { socket: 'io' });
	    });

		// $.ajax({
		//     type: 'POST',
		//     url: '/sendParameter',
		//     data: data
		//   })
		//   .done(function(data) {
		//     self.clearForm()
		//   })
		//   .fail(function(jqXhr) {
		//     console.log('failed to register');
		//   });
		console.log("Parameter sent")
	}
	setIpAndPort(e, ip, port) {
		e.preventDefault();
		// $.ajax({
		//     type: 'POST',
		//     url: '/set',
		//     data: data
		//   })
		//   .done(function(data) {
		//     self.clearForm()
		//   })
		//   .fail(function(jqXhr) {
		//     console.log('failed to register');
		//   });
		console.log("IP and port set")
	}

	render() {
	    return (
		    	<div className="Overview-content">
			      	<h1>Overview</h1>
			      	<form className="section col-sm-12" onSubmit={this.setIpAndPort.bind(this)}>
			      		<div className="form-group col-sm-4">
							<label>
								IP:
								<input className="form-control" type="text" name="ip" />
							</label>
							<label>
								Port:
								<input className="form-control" type="text" name="port" />
							</label>
							<input className="btn btn-primary" type="submit" value="Save" />
						</div>
					</form>
					<div className="section">
						Parameter received from Pod: {this.state.parameter}
					</div>
					<form className="section col-sm-12" onSubmit={this.sendParameter.bind(this)}>
			      		<div className="form-group col-sm-4">
							<label>Parameter</label>
							<label>
								Index:
								<input className="form-control" type="text" name="parameter" />
							</label>
							<label>
								Type:
								<input className="form-control" type="text" name="type" />
							</label>
							<label>
								Value:
								<input className="form-control" type="text" name="type" />
							</label>
							<input className="btn btn-primary" type="submit" value="Send parameter" />
						</div>
					</form>
					<div className="col-sm-12">
						<div className="section col-sm-4">
							Data logging: 
							<textarea className="logging-field" value={this.state.log}></textarea>
						</div>
					</div>
			 {/*1. Set source IP and Port numbers
				2. Rx and display one value
				3. A button to set a value
				4. A text box or similar to change a value
				5. Data logging.*/}
				</div>
	    );
	}
}

export default Overview;

