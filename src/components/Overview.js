import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import LineChart from './charts/LineChart.js';

class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			streamManager: new StreamingPageManager()
		}
	}

	componentWillMount() {
	}

	componentWillUnmount(){

    }


	render() {

	    return (
			<div>
				<LineChart 
					id="AccelerometerChart0"
					StreamingPageManager={this.state.streamManager} 
					parameters={['Accel 0 X Gs', 'Accel 0 Y Gs', 'Accel 0 Z Gs']}
					hideUnits='true'
					title="Accelerometer time-series"
					lineNames={['X Gs', 'Y Gs', 'Z Gs']}
					yRange={[-20, 20]}
					yAxisLabel="Gs"
					xAxisLabel="Time"
				/>
			</div>
		);
	}
}

export default Overview;

