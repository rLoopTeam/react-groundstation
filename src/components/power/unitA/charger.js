import React, {Component} from 'react';
import GenericParameterLabel from '../../GenericParameterLabel.js';
import StreamingPageManager from '../../../StreamingPageManager.js';
import config from '../../../../config/commConfig';

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
*   PowerA_Charger class
*/       

class PowerA_Charger extends Component {
	constructor(props) {
		super(props)

		this.state = {
			streamManager: new StreamingPageManager(),
			command: 'PowerA_Charger',
		}
	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	PowerAChargeRelayOn(data, e) {
		e.preventDefault();
		socket.emit('PowerA:ChargeRelayOn', data);
	}
	
	PowerAChargeRelayOff(data, e) {
		e.preventDefault();
		socket.emit('PowerA:ChargeRelayOff', data);
	}
	
	render(){
        var _this = this,
            _className = "col-xs-1_5 text-center",
			_showKeys = true,
            _keyCount = 0;

	    return (
		    <div className="Overview-content">
				<legend>Charge Relay</legend>
					<form className="form-inline">
						<div className="form-group">
							<button className="btn btn-success" onClick={this.PowerAChargeRelayOn.bind(this, {})}>Relay On</button>
							<button className="btn btn-danger" onClick={this.PowerAChargeRelayOff.bind(this, {})}>Relay Off</button><br /><br />
						</div>
					</form>
					<br />
					<legend>Charger Status</legend>
					<form className="form-inline">
						<div className="form-group">
							<div>Charger Voltage:<GenericParameterLabel StreamingPageManager={_this.state.streamManager} parameter='Charger Voltage'/></div><br />
							<div>Charger Battery Voltage:<GenericParameterLabel StreamingPageManager={_this.state.streamManager} parameter='Charger Current To Batt'/></div><br />
							<div>Charger Current:<GenericParameterLabel StreamingPageManager={_this.state.streamManager} parameter='Charger Input AC'/></div><br />
							<div>Charger Cabinet Temperature:<GenericParameterLabel StreamingPageManager={_this.state.streamManager} parameter='Charger Cabinet Temp'/></div><br />
							<div>Alarms:<GenericParameterLabel StreamingPageManager={_this.state.streamManager} parameter='Charger Faults'/></div><br />
						</div>
					</form>
					<legend>Charger Control</legend>
			</div>
	    );
	}
}

export default PowerA_Charger;

