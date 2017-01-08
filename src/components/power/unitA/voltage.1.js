import React, {Component} from 'react';
import GenericParameterLabel from './GenericParameterLabel.js';
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
*   PowerA_Voltage class
*/       

class PowerA_Voltage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			streamManager: new StreamingPageManager(),
			command: 'PowerA_Voltage',
		}

        this.labels = [
            {label: "A", value: "A"},
            {label: "B", value: "B"},
            {label: "C", value: "C"},
            {label: "D", value: "D"},
            {label: "E", value: "E"},
            {label: "F", value: "F"},
            {label: "Balancing", value: "Balancing"},
            {label: "voltage", value: "voltage"},
        ]
	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	render(){
        <GenericParameterLabel 
            StreamingPageManager={_this.state.streamManager} 
            parameter="Power Temperatures A 1 Temp"/>
	}
}

export default PowerA_Voltage;

