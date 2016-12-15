import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ip: '127.0.0.1',
			port: 8080,
			parameterIndex: 0,
			parameterType: 0,
			parameterValue: 0,
			log:"some large amount of text"
		}
	}

	componentDidMount() {
		socket.on('server event', function (data) {
	        console.log(data);
	        socket.emit('client event', { socket: 'io connected' });
	    });
	}

	sendParameter(e) {
		e.preventDefault();
		
		socket.emit('sendParameter', { index: this.state.parameterIndex, type: this.state.parameterType, value: this.state.parameterValue });
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
	setIpAndPort(e) {
		e.preventDefault();
		socket.emit('setIpAndPort', { ip: this.state.ip,  port: this.state.port });
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

	handleIpChange(e){
		this.setState({ip: e.target.value})
	}

	handlePortChange(e){
		this.setState({port: e.target.value})
	}

	handleParameterIndexChange(e){
		this.setState({parameterIndex: e.target.value})
	}

	handleParameterTypeChange(e){
		this.setState({parameterType: e.target.value})
	}

	handleParameterValueChange(e){
		this.setState({parameterValue: e.target.value})
	}

	render() {
	    return (
		    	<div className="Overview-content">
			      	<h1>Overview</h1>
			      	<form className="section col-sm-12">
			      		<div className="form-group col-sm-4">
							<label>
								IP:
								<input className="form-control" type="text" name="ip" onChange={this.handleIpChange.bind(this)} />
							</label>
							<label>
								Port:
								<input className="form-control" type="text" name="port" onChange={this.handlePortChange.bind(this)} />
							</label>
							<input className="btn btn-primary" type="submit" value="Save" onClick={this.setIpAndPort.bind(this)} />
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
								<input className="form-control" type="text" name="index" onChange={this.handleParameterIndexChange.bind(this)} />
							</label>
							<label>
								Type:
								<input className="form-control" type="text" name="type" onChange={this.handleParameterTypeChange.bind(this)} />
							</label>
							<label>
								Value:
								<input className="form-control" type="text" name="type" onChange={this.handleParameterValueChange.bind(this)} />
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

