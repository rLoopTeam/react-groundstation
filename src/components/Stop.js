import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class Stop extends Component {
	constructor(props) {
		super(props)
		this.streamingControl = [
			{
				selected: true, value: false, title: 'Off'
			},
			{
				selected: false, value: true, title: 'On'
			}
		]
	}

	componentDidMount() {
        var _this = this;
	}

	stopPod(e) {
		e.preventDefault();
		socket.emit('stop:Pod');
	}

	podPower(e) {
		e.preventDefault();
		var _enterPodSafe = confirm('Are you sure you would like to enter pod safe mode? This could be CATASTROPHIC...');
		if(_enterPodSafe)
			socket.emit('power:Pod');
	}

	powerLatch(value, e) {
		e.preventDefault();
		var _value = value;

		socket.emit('power:Latch', {powerNode: _value});
	}

	render() {

	    return (
		    	<div className="col-xs-5 pull-right">
					<div className="col-sm-2 pull-right">
						<button className="btn btn-danger" onClick={this.stopPod.bind(this)}>STOP</button>
					</div>
					<div className="col-sm-3 pull-right">
						<button className="btn btn-warning" onClick={this.podPower.bind(this)}>Pod Safe</button>
					</div>
					<div className="dropup col-sm-4 pull-right">
						<button className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Power Latch
							<span className="caret"></span>
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
							<li><a href="#" onClick={this.powerLatch.bind(this, 0)}>Power Node A</a></li>
							<li><a href="#" onClick={this.powerLatch.bind(this, 1)}>Power Node B</a></li>
						</ul>
					</div>
				</div>
	    );
	}
}

export default Stop;

