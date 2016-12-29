import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class Stop extends Component {
	constructor(props) {
		super(props)
		this.state = {
			streamingControl: 'off'
		}
		this.streamingControl = [
			{
				selected: true, value: 'Off'
			},
			{
				selected: false, value: 'Off'
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

	render() {

	    return (
		    	<div className="Overview-content">
		    		<button className="btn-lg btn-danger" onClick={this.stopPod.bind(this)}>STOP</button>
		    		<button className="btn-lg btn-warning" onClick={this.podPower.bind(this)}>Power</button>
					
					<label for="streamingControl">Streaming Control</label>
					<select id="streamingControl" name="streamingControl" onChange={this.updatestreamingControl()} class="form-control">
						{this.streamingControl.map(function(elem, index){
							return <option key={ index } value={elem.value}> {elem.value} </option>;
						})}
					</select>
				</div>
	    );
	}
}

export default Stop;



