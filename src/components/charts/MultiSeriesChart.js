import React, { Component } from 'react';
import RTChart from 'react-rt-chart';

class MultiSeriesChart extends Component {
	constructor(props) {
		super(props)
		const self = this;

		this.state = {
			stale: false,
			values: Array(this.props.parameters).fill(0),
			units: ''
		}
		
		var _index = 0;
		this.lineData = [];

		this.dataCallback = this.dataCallback.bind(this);
		
		for (var i = 0; i < this.props.parameters.length; i++) {
			(function(index){
				self.props.StreamingPageManager.RequestParameterWithCallback(self.props.parameters[index], function(data){
					self.dataCallback(data, index)
				});
			})(i)

			this.lineData["date"] = new Date();
			this.lineData[this.props.lineNames[i]] = 0;
		}


		this._isMounted = true;

	}
	componentDidMount() {
		setInterval(() => {
			for (var i = 0; i < this.props.parameters.length; i++) {
				this.lineData["date"] = new Date();
	            if (this.state.values[i] != undefined)
					this.lineData[this.props.lineNames[i]] = this.state.values[i];
				
			}

            this.forceUpdate()
        }, 100);
	}
	componentWillUnmount() {
		this._isMounted = false;
		this.props.StreamingPageManager.destroy();
	}
	
	dataCallback(parameterData, i){		
		if(this._isMounted) {
			const newState = Object.assign({}, this.state);
			
			newState.values[i] = parameterData.Value;
			newState.stale = parameterData.IsStale;
			newState.units = parameterData.Units;

			this.setState(newState);
		}
	}
	
	isReadOnly() {
		return (this.props.readOnly)?'readOnly':false;
	}
	
	getUnits() {
		return (this.props.hideUnits === 'true')?'':this.state.units;
	}

	render() {

        var chart = {
            axis: {
                x: {  },
                y: {  },
				
            },
			legend: {
				position: 'right'
			},
            point: {
                show: true
            }
        };


		//set y min and max range
		if(this.props.yRange)
		{
			chart.axis.y['min'] = this.props.yRange[0];
			chart.axis.y['max'] = this.props.yRange[1];
		}

		//set x label
		if(this.props.xAxisLabel)
		{
			chart.axis.x['label'] = {
				text: this.props.xAxisLabel,
				position: 'outer-center'
			}
		}

		//set y label
		if(this.props.yAxisLabel)
		{
			chart.axis.y['label'] = {
				text: this.props.yAxisLabel,
                position: 'outer-middle'
			}
		}

		var fields = Object.keys(this.lineData).map(function (data) { 
			return data;
		});


		return (
			<RTChart
                chart={chart}
                fields={fields}
                data={this.lineData} />
		);
	}
} 

MultiSeriesChart.propTypes = {
	hideUnits: React.PropTypes.oneOf(['true']),
};

export default MultiSeriesChart;

