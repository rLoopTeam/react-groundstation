import React, { Component } from 'react';
import StreamingPageManager from '../../StreamingPageManager.js';
import GenericParameterLabel from '../GenericParameterLabel.js';
import config from '../../../config/commConfig';
import RTChart from 'react-rt-chart';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket;

class LineChart extends Component{
    constructor(props){
        super(props)

    }

    componentDidMount() {
        setInterval(() => this.forceUpdate(), 100);
    }

    getRandomValue(){
        return Math.random()*10;
    }
    
    render() {
        var chart = {
            axis: {
                y: { min: 0, max: 10 }
            },
            point: {
                show: false
            }
        };

        var flow = {
            duration: 200
        };

        var data = {
        date: new Date(),
        Car: this.getRandomValue(),
        Bus: this.getRandomValue()
        };
    
        return <RTChart
                // flow={flow}
                chart={chart}
                fields={['Car','Bus']}
                data={data} />
    }
}

export default LineChart;