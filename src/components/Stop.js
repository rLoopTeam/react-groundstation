import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class Stop extends Component {
	constructor(props) {
		super(props)
		this.streamingControl = [
			{
				selected: true, value: 'Off'
			},
			{
				selected: false, value: 'On'
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
		socket.emit('power:Pod');
	}

	updatestreamingControl(e) {
		socket.emit('streamingControl', {status: e.target.value})
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
					<div className="form-group margin-top-20px">
						<label htmlFor="streamingControl">Streaming Control</label>
						<select id="streamingControl" name="streamingControl" onChange={this.updatestreamingControl.bind(this)} className="form-control">
							{this.streamingControl.map(function(elem, index){
								return <option key={ index } value={elem.value}> {elem.value} </option>;
							})}
						</select>
					</div>
				</div>
	    );
	}
}

export default Stop;



