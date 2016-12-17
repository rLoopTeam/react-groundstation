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

		socket.on('server event', function (data) {
	        console.log(data);
	        socket.emit('client event', { socket: 'io connected' });
	    });
	}

	stopPod(e) {
		e.preventDefault();
		socket.emit('stop:Pod');
	}

	render() {

	    return (
		    	<div className="Overview-content">
		    		<button className="btn-lg btn-danger" onClick={this.stopPod.bind(this)}>STOP</button>
				</div>
	    );
	}
}

export default Stop;

