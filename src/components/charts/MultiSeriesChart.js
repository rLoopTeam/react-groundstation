import React, { Component } from 'react';
import d3 from 'd3';
import {LineChart} from 'react-d3-basic';
// import {Chart, Svg, Grid, Title, Legend, Xaxis, Yaxis} from 'react-d3-core';

class MultiSeriesChart extends Component {
	constructor(props) {
		super(props)
		const self = this;
		
		var _index = 0;
		this.lineData = [];

		this.dataCallback = this.dataCallback.bind(this);
		
		for (var i = 0; i < this.props.parameters.length; i++) {
			(function(index){
				self.props.StreamingPageManager.RequestParameterWithCallback(self.props.parameters[index], function(data){
					self.dataCallback(data, index)
				});
			})(i)
			this.lineData.push({
				index: this.state._index,
                name: this.props.lineNames[i],
                values: [{index: 0, x: 0, y: 0}],
                strokeWidth: 3,
                strokeDashArray: "5,5",
            });
		}

		this.state = {
			stale: false,
			values: Array(this.props.parameters).fill(0),
			units: '',
			_index: 0;
		}


		var new_Index = this.state._index++;
		this.setState({_index: new_Index);
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
		var width=960,
			height=500,
			margins={top: 20, right: 50, bottom: 20, left: 50},
			id="test-chart",
			svgClassName="test-chart-class",
			titleClassName="test-chart-title-class",
			gridAxisClassName="test-grid-class",
			y=(d) => {
				return d.index;
			},
			yDomain=d3.extent(this.lineData, y),
			yRange=[height - margins.top - margins.bottom, -20],
			yScale='linear',
			x=function(d) {
				return d.index;
			},
			xDomain=d3.extent(this.lineData, x),
			xRange=[0, width - margins.left - margins.right],
			xScale='linear',
			xLabel="Month",
			yLabel="day",
			legendClassName="test-legend-class",
			legendPosition='left',
			legendOffset=90;

		var title="test chart lib"





		return (
			// <Chart
			// 	title={title}
			// 	width={width}
			// 	height={height}
			// 	margins={margins}
			// 	id={id+"-Chart"}
			// 	svgClassName={svgClassName}
			// 	titleClassName={titleClassName}
			// 	data={this.lineData}
			// >
			// 	<Title
			// 		title={title}
			// 		titleClassName={titleClassName}
			// 	/>

			// 	<Legend
			// 		width={width}
			// 		height={height}
			// 		margins={margins}
			// 		legendClassName={legendClassName}
			// 		legendPosition={legendPosition}
			// 		legendOffset={legendOffset}
			// 		chartSeries ={this.lineData}
			// 	/>




			// 	<Svg width={width} height={height}>
			// 		<Grid
			// 			width={width}
			// 			height={height}
			// 			margins={margins}
			// 			type={'y'}
			// 			gridAxisClassName={gridAxisClassName}
			// 			y={y}
			// 			yDomain={yDomain}
			// 			yRange={yRange}
			// 			yScale={yScale}
			// 			xScale={xScale}
			// 		/>
			// 		<Grid
			// 			width={width}
			// 			height={height}
			// 			margins={margins}
			// 			type={'x'}
			// 			gridAxisClassName={gridAxisClassName}
			// 			x={x}
			// 			xDomain={xDomain}
			// 			xRange={xRange}
			// 			yScale={yScale}
			// 			xScale={xScale}
			// 		/>
			// 	</Svg>

			// 	<Xaxis
			// 		width={width}
			// 		height={height}
			// 		margins={margins}
			// 		x={x}
			// 		xDomain={xDomain}
			// 		xRange ={xRange}
			// 		xScale={xScale}
			// 		xLabel={xLabel}
			// 	/>
				
			// 	<Yaxis
			// 		width={width}
			// 		height={height}
			// 		margins={margins}
			// 		y={y}
			// 		yDomain={yDomain}
			// 		yRange ={yRange}
			// 		yScale={yScale}
			// 		yLabel={yLabel}
			// 	/>
			// </Chart>
			<div>



				<LineChart
            		legend={true}
	                data={this.lineData}
					chartSeries ={this.lineData}
	                width={this.props.width}
	                height={this.props.height}
	                // viewBoxObject={{
	                //     x: 0,
	                //     y: 0,
	                //     width: this.props.width,
	                //     height: 400
	                // }}
	                title={this.props.title}
	                yAxisLabel={this.props.yAxisLabel}
	                yRange={[-20,20]}
	                xAxisLabel={this.props.xAxisLabel}
	                gridHorizontal={true}
	                margin={{top: 10, bottom: 50, left: 50, right: 10}}
					x= {x}
	                />
			</div>
		);
	}
} 

MultiSeriesChart.propTypes = {
	hideUnits: React.PropTypes.oneOf(['true']),
};

export default MultiSeriesChart;

