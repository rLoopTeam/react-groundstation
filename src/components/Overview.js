import React, { Component } from 'react';

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
		console.log("Parameter sent")
	}
	setIpAndPort(e, ip, port) {
		e.preventDefault();
		console.log("IP and port set")
	}

	render() {
	    return (
	    	<div className="Overview-content">
		      	<h1>Overview</h1>
		      	<form className="section" onSubmit={this.setIpAndPort.bind(this)}>
					<label>
						IP:
						<input type="text" name="ip" />
					</label>
					<label>
						Port:
						<input type="text" name="port" />
					</label>
					<input type="submit" value="Save" />
				</form>
				<div className="section">
					Parameter received from Pod: {this.state.parameter}
				</div>
				<form className="section" onSubmit={this.sendParameter.bind(this)}>
					<label>Parameter</label>
					<label>
						Index:
						<input type="text" name="parameter" />
					</label>
					<label>
						Type:
						<input type="text" name="type" />
					</label>
					<label>
						Value:
						<input type="text" name="type" />
					</label>
					<input type="submit" value="Send parameter" />
				</form>
				<div className="section">
					Data logging: 
					<textarea className="logging-field" value={this.state.log}></textarea>
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

