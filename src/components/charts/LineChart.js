// first of course react!
import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import GenericParameterDisplay from '../GenericParameterDisplay.js';

class LineChart extends GenericParameterDisplay{
    constructor(props){
        super(props)
        
        const self = this;

        // this object gets update with the data from the pod
        this.latestValues = {
            stale: false,
            values: Array(this.props.parameters.length).fill(Array(this.props.totalPoints).fill(0)),
            units: '',
            startTime: (new Date).getTime()
        }

        // this is the Highcharts config object that defines the series, render options etc
        this.config = {
            title: {
                text: this.props.title
            },
            chart: {
                animation: false,
                events: {
                    // this function gets called on Load, and sets up an interval that updates the chart itself based on the "latestValues" object
                    load: function () {
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = 20;
                            var series = self.chart.series;
                            if (self.chart) {
                                for (var i = 0; i < series.length; i++) {
                                    //series[i].addPoint([x, self.latestValues.values[i]], false, true, false);
                                    series[i].addPoint([x, y + (Math.random()*5)], false, true, false);
                                }
                                self.chart.redraw()
                            }
                            else {
                                console.log("No chart")
                            }
                        }, 250);
                    }
                }
            },
            xAxis: {
                title: {
                    text: this.props.xAxisLabel
                },
                //type: 'datetime',
                tickPixelInterval: 150,
                labels: {
                formatter: function() {
                    return (this.value - self.latestValues.startTime)/1000;
                }
            },
            },
            yAxis: {
                title: {
                    text: this.props.yAxisLabel
                }
            },
            plotOptions: {
                series:{
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
           // create series array from the parameters
            series: this.props.parameters.map(function(parametername){
                return {
                    name: parametername,
                    data: (function () {
                        // generate an array of initial data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = self.props.totalPoints*-1; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: 0
                            });
                        }
                        return data;
                    }())
                }
            }),
        }

        // sets up the StreamingPage manager for each parameter we want to display
        for (var i = 0; i < this.props.parameters.length; i++) {
            (function(index){
                self.props.StreamingPageManager.RequestParameterWithCallback(self.props.parameters[index], function(data){
                    self.dataCallback(data, index)
                });
            })(i)
        }
    }
    
    componentDidMount() {
        const self = this;
        self.chart = self.refs[self.props.id+"_chart"].getChart();
    }

    dataCallback(parameterData, i){     
        // update the latestValues object with values from the pod
        if(this._isMounted) {
            this.latestValues.values[i] = parameterData.Value;
            this.latestValues.stale = parameterData.IsStale;
            this.latestValues.units = parameterData.Units;
        }
    }

    render()
    {
        return(
            <ReactHighcharts 
                config={this.config} 
                ref={this.props.id + "_chart"} />
        );
    }
}

LineChart.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    xAxisLabel: React.PropTypes.string.isRequired,
    yAxisLabel: React.PropTypes.string.isRequired,
    parameters: React.PropTypes.array.isRequired,
    totalPoints: React.PropTypes.number.isRequired,
}
export default LineChart;