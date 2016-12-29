import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class Stop extends Component {
	constructor(props) {
		super(props)
		this.state = {
			command: 'stop'
		}
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
		socket.emit('power:Pod');
	}

	render() {

	    return (
		    	<div className="Overview-content">
		    		<button className="btn-lg btn-danger" onClick={this.stopPod.bind(this)}>STOP</button>
		    		<button className="btn-lg btn-warning" onClick={this.podPower.bind(this)}>Power</button>
				</div>
	    );
	}
}

export default Stop;



