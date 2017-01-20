import React, { Component } from 'react';
import rd3 from 'react-d3';
var LineChart = rd3.LineChart;

class MultiSeriesChart extends Component {
	constructor(props) {
		super(props)
		const self = this;
		
		this.lineData = [];

		this.dataCallback = this.dataCallback.bind(this);
		
		for (var i = 0; i < this.props.parameters.length; i++) {
			(function(index){
				self.props.StreamingPageManager.RequestParameterWithCallback(self.props.parameters[index], function(data){
					self.dataCallback(data, index)
				});
			})(i)
			this.lineData.push({
                name: this.props.lineNames[i],
                values: [{x: Date.now(), y: 0}],
                strokeWidth: 3,
                strokeDashArray: "5,5",
            });
		}

		this.state = {
			stale: false,
			values: Array(this.props.parameters).fill(0),
			units: ''
		}
		this._isMounted = true;

	}
	componentDidMount() {
		setInterval(() => {
			for (var i = 0; i < this.props.parameters.length; i++) {
				var vals = this.lineData[i].values;
	            if(vals.length > 30)
	                vals.splice(0, 1);
	            if (this.state.values[i] != undefined)
	            	vals.push({x: Date.now(), y: this.state.values[i]})
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
			//console.log("test ", parameterData, i)
			newState.values[i] = parameterData.Value;
			newState.stale = parameterData.IsStale;
			newState.units = parameterData.Units;
			// {values: newStateValues, stale: parameterData.IsStale, units: parameterData.Units}
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
		// this.lineData[0].values.map(function(element){console.log("0", element)})
		// this.lineData[1].values.map(function(element){console.log("1", element)})
		return (
			<div>
				<LineChart
            		legend={true}
	                data={this.lineData}
	                width={this.props.width}
	                height={400}
	                // viewBoxObject={{
	                //     x: 0,
	                //     y: 0,
	                //     width: this.props.width,
	                //     height: 400
	                // }}
	                title={this.props.title}
	                yAxisLabel={this.props.yAxisLabel}
	                xAxisLabel={this.props.xAxisLabel}
	                gridHorizontal={true}
	                />
			</div>
		);
	}
} 

MultiSeriesChart.propTypes = {
	hideUnits: React.PropTypes.oneOf(['true']),
};

export default MultiSeriesChart;

