// first of course react!
import React from 'react';
import ReactHighcharts from 'react-highcharts';
import GenericParameterDisplay from '../GenericParameterDisplay.js';

class LineChart extends GenericParameterDisplay {
  constructor (props) {
    super(props);

    const self = this;

    // this object gets update with the data from the pod
    this.latestValue = {};
    this.startTime = (new Date()).getTime();

    this.defaultValue = {
      stale: false,
      value: 0,
      units: '',
      startTime: (new Date()).getTime()
    };

    this.dataTimer = setInterval(function () {
      var currentTime = (new Date()).getTime(); // current time
      var series = self.chart.series;

      if (self.chart && series) {
        for (var i = 0; i < series.length; i++) {
          let shift = series[i].data.length > self.props.totalPoints;
          let latestValue = self.latestValue[series[i].name];

          // Update the highchart with real parameter data.
          series[i].addPoint([currentTime, latestValue.value], false, shift, false);

          // Chart background: #FF3300 (red) if stale, #FFFFFF (white) if not.
          self.chart.chartBackground.css({
            color: latestValue.stale === true ? '#FF3300' : '#FFFFFF'
          });
        }
        self.chart.redraw();
      } else {
        console.log('No chart');
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
        animation: false
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: this.props.xAxisLabel
        },
        // type: 'datetime',
        tickPixelInterval: 150,
        labels: {
          formatter: function () {
            return (this.value - self.startTime) / 1000;
          }
        }
      },
      yAxis: {
        title: {
          text: this.props.yAxisLabel
        }
      },
      plotOptions: {
        series: {
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
      series: this.props.parameters.map(function (parametername) {
        return {
          name: parametername,
          data: []
        };
      })
    };

    // sets up the StreamingPage manager for each parameter we want to display
    for (var i = 0; i < this.props.parameters.length; i++) {
      (function (index) {
        self.latestValue[self.props.parameters[index]] = {
          stale: false,
          value: 0,
          units: ''
        };
        self.props.StreamingPageManager.RequestParameterWithCallback(self.props.parameters[index], function (data) {
          self.dataCallback(data, index);
        });
      })(i);
    }
  }

  componentDidMount () {
    const self = this;
    self.chart = self.refs[self.props.id + '_chart'].getChart();
  }

  componentWillUnmount () {
    const self = this;
    clearInterval(self.dataTimer);
  }

  dataCallback (parameterData, i) {
    // update the latestValues object with values from the pod
    if (this._isMounted) {
      this.latestValue[parameterData.Name].value = parameterData.Value;
      this.latestValue[parameterData.Name].stale = parameterData.IsStale;
      this.latestValue[parameterData.Name].units = parameterData.Units;
    }
  }

  render () {
    return (
      <ReactHighcharts
          config={this.config}
          ref={this.props.id + '_chart'} />
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
  updateRate: React.PropTypes.number
};
export default LineChart;
