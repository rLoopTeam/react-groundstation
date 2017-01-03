import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import config from '../../config/commConfig';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket = io.connect(ip + ':' + port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});

class Brakes extends Component {
	constructor(props) {
		super(props)
		this.render = this.render.bind(this);

		this.state = {
			streamManager: new StreamingPageManager()
		}

        this.labels = [
            {label: "Parking Brake", value: "Brake Parking"},
            {label: "Left Screw Pos", value: "Brake Left Screw Pos"},
            {label: "Right Screw Pos", value: "Brake Right Screw Pos"},
            {label: "Left Extend Limit", value: "Brake Left Extend Limit"},
            {label: "Right Extend Limit", value: "Brake Right Extend Limit"},
            {label: "Left Retract Limit", value: "Brake Left Retract Limit"},
            {label: "Right Retract Limit", value: "Brake Right Retract Limit"},
            {label: "FL I-Beam Dist", value: "Brake FL I-Beam Dist"},
            {label: "RL I-Beam Dist", value: "Brake RL I-Beam Dist"},
            {label: "FR I-Beam Dist", value: "Brake FR I-Beam Dist"},
            {label: "RR I-Beam Dist", value: "Brake RR I-Beam Dist"},
            {label: "Left MLP Raw", value: "Brake Left MLP Raw"},
            {label: "Right MLP Raw", value: "Brake Right MLP Raw"},
            {label: "Left MLP Scaled", value: "Brake Left MLP Scaled"},
            {label: "Right MLP Scaled", value: "Brake Right MLP Scaled"},
        ]
	}

    componentDidMount() {
        var _this = this;
        // socket.on('connect', function() {
		// 	console.log('Client now connected!')
        //     socket.emit('commConfig:req')

		// 	socket.on('commConfig:res', function(data){
        //         var commConfig = JSON.stringify(data, null, '    ')
        //         _this.setState({commConfig: commConfig})
		// 	})
		// });
    }

	render() {
		var _this = this;
	    return (
            <div>
                {
                    this.labels.map(function(item, index){
                        return(
                            <div>
                                {item.label}:
                                <GenericParameterLabel 
                                    StreamingPageManager={_this.state.streamManager} 
                                    parameter={item.value}/>
                            </div>
                        )
                    })
                }
                
            </div>
	    );
	}
}

export default Brakes;

