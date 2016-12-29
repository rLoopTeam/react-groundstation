import React, { Component } from 'react';
import io from 'socket.io-client';
var socket;

class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ip: '127.0.0.1',
			port: 9100,
			socketIp: '127.0.0.1',
			socketPort: 3000,
			parameterIndex: 0,
			parameterType: 0,
			parameterValue: 0,
			elapsed: 0,
			start: Date.now(),
			updateRate: 2500,
			dataLogs:[]
		}


		this._isMounted = true;
	}

	newSocketConnection(host, port, serverName){
		socket = io.connect(host+':'+port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});
		
		var _this = this;

		socket.on('connect', function() {
			console.log('Client now connected!')
			
			//join pubsub group
			socket.emit('join', {name: 'overviewLogs', room: 'dataLogging'});

			//start datalogging
			socket.emit('start:dataLogs');

			socket.on('udp:event', function (data) {
				console.log(data);
				_this.timer = setInterval(
					function(){
						if(_this._isMounted)
							_this.setState({elapsed: new Date() - _this.state.start})
					}, 50
				);
				
				if(_this._isMounted){
					_this.setState({ 
						dataLogs: [data.log].concat(_this.state.dataLogs)
					});
				}
			});
		});

		socket.on('disconnected', function() {
			console.log('Client got disconnected!')
			console.log('Opening new connection')

			if(serverName === 'one')
				this.startServerTwo()
			if(serverName === 'two')
				this.startServerOne()
		});
	}

	startServerOne() {
		this.newSocketConnection(this.state.socketIp, this.state.socketPort, 'one')
	}

	startServerTwo() {
		this.newSocketConnection(this.state.socketIp, this.state.socketPort, 'two')
	}

	componentWillMount() {
        this.startServerOne()
	}

	componentWillUnmount(){

		this._isMounted = false;
        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:
		socket.emit('forceDisconnect');
		socket.close(()=>{
			clearInterval(this.timer);
		})
    }

	sendParameter(e) {
		e.preventDefault();
		socket.emit('sendParameter', { index: this.state.parameterIndex, type: this.state.parameterType, value: this.state.parameterValue });
	}
	setIpAndPort(e) {
		e.preventDefault();
		socket.emit('setIpAndPort', { ip: this.state.ip,  port: this.state.port });
		if (socket) socket.disconnect();//this server will bounce
        this.startServerOne()
	}

	handleIpChange(e){
		if(this._isMounted)
			this.setState({ip: e.target.value})
	}

	handlePortChange(e){
		if(this._isMounted)
			this.setState({port: e.target.value})
	}

	handleParameterIndexChange(e){
		if(this._isMounted)
			this.setState({parameterIndex: e.target.value})
	}

	handleParameterTypeChange(e){
		if(this._isMounted)
			this.setState({parameterType: e.target.value})
	}

	handleParameterValueChange(e){
		if(this._isMounted)
			this.setState({parameterValue: e.target.value})
	}

	toggleDatalogging(e){
		var _this = this;

		if(e.target.value === 'Stop')
		{
			console.log(this.timer)
			if(_this._isMounted)
				this.setState({dataLogging: false});
	        clearInterval(this.timer);
			socket.emit('stop:dataLogs');
		}
		else if (e.target.value === 'Start')
		{
			if(_this._isMounted)
				this.setState({dataLogging: true});
			socket.emit('start:dataLogs');
		}
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
				      		<fieldset>
				      			<legend>UDP Listening Settings</legend>
								<label>
									IP:
									<input className="form-control" type="text" name="ip" value={this.state.ip} onChange={this.handleIpChange.bind(this)} />
								</label>
								<label>
									Port:
									<input className="form-control" type="text" name="port" value={this.state.port} onChange={this.handlePortChange.bind(this)} />
								</label>
								<input className="btn btn-primary" type="submit" value="Save" onClick={this.setIpAndPort.bind(this)} />
							</fieldset>
						</div>
					</form>
					<form className="section col-sm-12" onSubmit={this.sendParameter.bind(this)}>
			      		<div className="form-group col-sm-4">
							<label>Parameter</label>
							<label>
								Index:
								<input className="form-control" type="text" name="index" value={this.state.parameterIndex} onChange={this.handleParameterIndexChange.bind(this)} />
							</label>
							<label>
								Type:
								<input className="form-control" type="text" name="type" value={this.state.parameterType} onChange={this.handleParameterTypeChange.bind(this)} />
							</label>
							<label>
								Value:
								<input className="form-control" type="text" name="value" value={this.state.parameterValue} onChange={this.handleParameterValueChange.bind(this)} />
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
							<div className="form-group">
								<input type="button" className="btn btn-danger col-xs-4" onClick={this.toggleDatalogging.bind(this)} value="Stop" />
								<input type="button" className="btn btn-success col-xs-offset-2 col-xs-4" onClick={this.toggleDatalogging.bind(this)} value="Start" />
							</div>
							<ul className="list-group margin-bottom-40px height-300 overflow-x-auto col-xs-12">
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

