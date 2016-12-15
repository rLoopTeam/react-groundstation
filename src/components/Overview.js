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
			elapsed: 0,
			start: Date.now(),
			updateRate: 500,
			dataLogs:[]
		}
	}

	componentDidMount() {
        var _this = this;

		socket.on('server event', function (data) {
	        console.log(data);
	        socket.emit('client event', { socket: 'io connected' });
	    });

		socket.on('udp event', function (data) {
    		_this.timer = setInterval(
    			function(){
    				_this.setState({elapsed: new Date() - _this.state.start})
    			}, 50
			);

	        _this.setState({ 
			    dataLogs: [data.log].concat(_this.state.dataLogs),
			    updateRate: data.updateRate
			});
	    });
	}

	componentWillUnmount(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
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
		var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(2);  

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
							Data logging: <em>(most recent at top)</em> 
							<div>
							showing: {this.state.dataLogs.length}
							<br/>
							time: {seconds}s
							<br/>
							update rate: {this.state.updateRate}ms
							</div>
							<ul className="list-group margin-bottom-40px height-300 overflow-x-auto">
								{this.state.dataLogs.map(function(logItem, index){
					                return <li key={ index } className="list-group-item">{logItem}</li>;
				                })}
							</ul>
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

