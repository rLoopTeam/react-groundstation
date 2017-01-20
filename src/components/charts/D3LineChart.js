// first of course react!
import React, {Component} from 'react';
import rd3 from 'react-d3';
import GenericParameterDisplay from '../GenericParameterDisplay.js';

var LineChart = rd3.LineChart;

class D3LineChart extends GenericParameterDisplay{
    constructor(props){
        super(props)

        this.lineData = [
            {
                name: this.props.lineName,
                values: [{x: Date.now(), y: 0}],
                strokeWidth: 3,
                strokeDashArray: "5,5",
            },
        ];
    }

    componentDidMount() {
        setInterval(() => {
            var vals1 = this.lineData[0].values;
            if(vals1.length > 30)
                vals1.splice(0, 1);
                
            vals1.push({x: Date.now(), y: this.getFormattedValue()})
            this.forceUpdate()
        }, 100);
    }

    render()
    {
        return(
            <LineChart
                legend={true}
                data={this.lineData}
                width={this.props.width}
                height={400}
                viewBoxObject={{
                    x: 0,
                    y: 0,
                    width: this.props.width,
                    height: 400
                }}
                title={this.props.title}
                yAxisLabel={this.getUnits()}
                xAxisLabel="Elapsed Time (ms)"
                gridHorizontal={true}
                />
        );
    }
}

export default D3LineChart;