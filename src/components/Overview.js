import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import MultiSeriesChart from './charts/MultiSeriesChart.js';

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
			<div>remove elements. need the correct UI to go here ->
				<MultiSeriesChart 
					StreamingPageManager={this.state.streamManager} 
					parameters={['Accel 0 X Gs', 'Accel 0 Y Gs', 'Accel 0 Z Gs']}
					hideUnits='true'
					title="Accelerometer time-series"
					lineNames={["X Gs", "Y Gs", "Z Gs"]}
					yAxisLabel="Gs"
					xAxisLabel="Time(ms)"
					width={1000}
					height={400}
				/>
			</div>
		);
	}
}

export default Overview;

