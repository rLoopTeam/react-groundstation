import React, {Component} from 'react';
import GenericParameterLabel from '../../GenericParameterLabel.js';
import StreamingPageManager from '../../../StreamingPageManager.js';
import config from '../../../../config/commConfig';
import jquery from 'jquery';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket = io.connect(ip + ':' + port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});



/*
*   PowerA_RawTemperatures class
*/       

class PowerA_RawTemperatures extends Component {
	constructor(props) {
		super(props)

		this.state = {
			streamManager: new StreamingPageManager(),
			command: 'PowerA_RawTemperatures',
		}

	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	PowerAStreamingOff(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StreamingOff', data);
	}
	
	PowerAStreamCurrentTemps(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StreamCurrentTemps', data);
	}
	
	PowerAStreamTempLocations(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StreamTempLocations', data);
	}
	
	render(){
        var _this = this,
            _className = "col-xs-1_5 text-center",
			_showKeys = true,
            _keyCount = 0;

		var rows = [];
		for(var i = 0;i<20;i++)
		{
			rows.push(<tr key={"row"+i}><td>{i} C</td><td>12345</td><td>10</td><td>8</td></tr>)
		}
			
	    return (
				<div>
				<legend>Power Node A - Stream Control</legend>
					<form className="form-inline">
						<div className="form-group">
							<button className="btn btn-success" onClick={this.PowerAStreamingOff.bind(this, {})} style={{margin:10}}>Stream Off</button>
							<button className="btn btn-success" onClick={this.PowerAStreamCurrentTemps.bind(this, {})} style={{margin:10}}>Stream Temperatures</button>   
							<button className="btn btn-success" onClick={this.PowerAStreamTempLocations.bind(this, {})} style={{margin:10}}>Stream Sensor Locations</button>   
							<br /><br />
						</div>
					</form>

					<table className="scroll">
					<thead><tr>
						<th>Temperature</th><th>User Field</th><th>Resolution</th><th>BusID</th>
					</tr></thead>
					<tbody>
					{rows}
					</tbody></table>

				</div>
	    );
	}
}

export default PowerA_RawTemperatures;
