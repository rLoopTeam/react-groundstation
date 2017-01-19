// first of course react!
import React, {Component} from 'react';
// require `react-d3-core` for Chart component, which help us build a blank svg and chart title.
import {Chart} from 'react-d3-core';
// require `react-d3-basic` for Line chart component.
import {LineChart} from 'react-d3-basic';


class D3LineChart extends Component{
    constructor(props){
        super(props)

        this.chartData = [
            {
                date: new Date(),
                value1: parseInt(Math.random()*10, 10),
                value2: parseInt(Math.random()*10, 10),
            }
        ]

        this.width = 700;
            this.height = 300;
            this.margins = {left: 100, right: 100, top: 50, bottom: 50};
            this.title = "User sample";
            // chart series,
            // field: is what field your data want to be selected
            // name: the name of the field that display in legend
            // color: what color is the line
            this.chartSeries = [
                {
                    field: 'BMI',
                    name: 'BMI',
                    color: '#ff7f0e'
                }
            ];
            // your x accessor
            this.x = function(d) {
                return d.index;
            }
    }

    render()
    {
        return(
            <Chart
                title={this.title}
                width={this.width}
                height={this.height}
                margins={this.margins}
                >
                <LineChart
                    margins={this.margins}
                    title={this.title}
                    data={this.chartData}
                    width={this.width}
                    height={this.height}
                    chartSeries={this.chartSeries}
                    x={this.x}
                />
            </Chart>
        );
    }
}

export default D3LineChart;