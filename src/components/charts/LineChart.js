// first of course react!
import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import GenericParameterDisplay from '../GenericParameterDisplay.js';

class LineChart extends GenericParameterDisplay{
    constructor(props){
        super(props)
        
        const self = this;
    
        // this object gets update with the data from the pod
        this.latestValue = {
            stale: false,
            value: 0,
            units: '',
            startTime: (new Date).getTime()
        }

        this.dataTimer = setInterval(function () {
            var x = (new Date()).getTime(), // current time
                y = 20;
            var series = self.chart.series;
            if (self.chart && series) {
                for (var i = 0; i < series.length; i++) {
                    var shift = series[i].data.length > self.props.totalPoints;

                    if (self.latestValue.stale == true) {
                        // Update the highchart with real parameter data.
                        series[i].addPoint([x, self.latestValue.value], false, shift, false);
                        self.chart.chartBackground.css({
                            color: '#FF3300',
                        });
                    } else {
                        // Update the highchart with real parameter data.
                        series[i].addPoint([x, self.latestValue.value], false, shift, false);
                        // FOR TESTING ONLY: update the highchart with fake data specified in this file.
                        //series[i].addPoint([x, y + (Math.random()*5)], false, shift, false);

                        self.chart.chartBackground.css({
                            color: '#FFFFFF',
                        });
                    }
                }
                self.chart.redraw()
            }
            else {
                console.log("No chart")
            }
        }, this.props.updateRate || 250);

        // this is the Highcharts config object that defines the series, render options etc
        this.config = {
            title: {
                text: this.props.title
            },
            chart: {
                width: this.props.width || null,
                height: this.props.height || null,
                animation: false,
                events: {
                    // this function gets called on Load, and sets up an interval that updates the chart itself based on the "latestValue" object
                    load: function () {
                        this.dataTimer;
                    }
                }
            },
            credits: {
                enabled: false
            },
            xAxis: {
                title: {
                    text: this.props.xAxisLabel
                },
                //type: 'datetime',
                tickPixelInterval: 150,
                labels: {
                formatter: function() {
                    return (this.value - self.latestValue.startTime)/1000;
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
                    data: []
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

    componentWillUnmount() {
        const self = this
        clearInterval(self.dataTimer)
    }

    dataCallback(parameterData, i){
        // update the latestValues object with values from the pod
        if(this._isMounted) {
            this.latestValue.values = parameterData.Value;
            this.latestValue.stale = parameterData.IsStale;
            this.latestValue.units = parameterData.Units;
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
    updateRate: React.PropTypes.number,
}
export default LineChart;