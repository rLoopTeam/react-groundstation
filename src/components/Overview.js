import React, { Component } from 'react';
import BatteryManagementSystem from './BatteryManagementSystem';


class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			parameter: {index: 2, value: 123.4},
			log:"some large amount of text 2",
			batteryManagementSystem: [
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
				{"temperatureA":21,"temperatureB":21,"voltage":12.1},
			],
			batteryManagementSystemByIndex: {

			}
		}
	}
	sendParameter(e, index, type, value) {
		e.preventDefault();
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
		console.log(BatteryManagementSystem)
	    return (
		    	<div className="Overview-content">
			      	<h1>Overview</h1>
			      	<h2>Setup IP address and port</h2>
			      	<form className="section col-sm-12" onSubmit={this.setIpAndPort.bind(this)}>
			      		<div className="form-group col-sm-4">
							<label>
								
								<input className="form-control" type="text" name="ip" />
							</label>
							<label>
								Port:
								<input className="form-control" type="text" name="port" />
							</label>
							<input className="btn btn-primary" type="submit" value="Save" />
						</div>
					</form>

					<h2>Specific parameter received from pod</h2>
					<div className="section">
						Parameter received from Pod: Index: {this.state.parameter.index}, Value: {this.state.parameter.value}
					</div>
					
					<h2>Send parameter to pod</h2>
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
					<h2>Raw telemetry</h2>
					<div className="col-sm-12">
						<div className="section col-sm-4">
							Data logging: 
							<textarea className="logging-field" value={this.state.log}></textarea>
						</div>
					</div>

					<h2>Rendering large amount of data</h2>
					<div className="col-sm-12">
						<BatteryManagementSystem refreshInterval="100" data={this.state.batteryManagementSystem} />
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

