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
        setInterval(() => this.forceUpdate(), 10);
    }

    getRandomValue(){
        return Math.random()*10;
    }
    
    render() {
        var chart = {
            axis: {
                y: { min: -20, max: 20 }
            },
            point: {
                show: false
            }
        };

        var flow = {
            duration: 200
        };

        var fields = ['Car','Bus'];

        var data = {
        date: new Date(),
        Car: this.getRandomValue(),
        Bus: this.getRandomValue()
        };
    
        return <RTChart
                // flow={flow}
                chart={chart}
                fields={fields}
                data={data} />
    }
}

export default LineChart;