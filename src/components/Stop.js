import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class Stop extends Component {
	constructor(props) {
		super(props)
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
					<div className="row">
						<div className="col-sm-2">
							<button className="btn-lg btn-danger" onClick={this.stopPod.bind(this)}>STOP</button>
						</div>
						<div className="col-sm-2">
							<button className="btn-lg btn-warning" onClick={this.podPower.bind(this)}>Power</button>
						</div>
					</div>
				</div>
	    );
	}
}

export default Stop;



