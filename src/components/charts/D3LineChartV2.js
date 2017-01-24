// first of course react!
import React, {Component} from 'react';
import rd3 from 'react-d3';
import ReactHighcharts from 'react-highcharts';
import GenericParameterDisplay from '../GenericParameterDisplay.js';

var LineChart = rd3.LineChart;

class D3LineChartV2 extends GenericParameterDisplay{
    constructor(props){
        super(props)
        
        const self = this;

        this.state = {
            stale: false,
            values: Array(this.props.parameters).fill(0),
            units: ''
        }

        this.config = {
            chart: {
                events: {
                    load: function () {
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = 20;
                            var series = self.chart.series;
                            if (self.chart) {
                                for (var i = 0; i < series.length; i++) {
                                    series[i].addPoint([x, y + (Math.random()*5)], true, true);
                                }
                            }
                            else {
                                console.log("No chart")
                            }
                        }, 250);
                    }
                }
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'G force'
                },
                // plotLines: [{
                //     value: 0,
                //     width: 1,
                //     color: '#808080'
                // },
                // {
                //     value: 0,
                //     width: 1,
                //     color: '#808080'
                // },
                // {
                //     value: 0,
                //     width: 1,
                //     color: '#808080'
                // }]
            },
            // create series array from the parameters
            series: this.props.parameters.map(function(parametername){
                return {
                    name: parametername,
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }
            })
        }

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
        // setInterval(() => {
        //     for(var i = 0; i < self.props.parameters.length; i++) 
        //     {
        //         //var vals1 = self.state.config.series[i].data;
        //         var newState = Object.assign({}, this.state)
        //         newState.config.series[i].data;
        //         if(newState.config.series[i].data.length > 30)
        //             newState.config.series[i].data.splice(0, 1); 
        //         newState.config.series[i].data.push(self.state.values[i]);
        //         console.log(newState)
        //         self.setState(newState)
        //         //self.state.config.series[i].data = vals1;
        //     }
            
        //     //self.forceUpdate()
        // }, 500);
    }

    dataCallback(parameterData, i){     
        if(this._isMounted) {
            const newState = Object.assign({}, this.state);
            newState.values[i] = parameterData.Value;
            newState.stale = parameterData.IsStale;
            newState.units = parameterData.Units;
            //this.setState(newState);
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

D3LineChartV2.propTypes = {
    id: React.PropTypes.string.isRequired
}
export default D3LineChartV2;