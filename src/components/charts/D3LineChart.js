// first of course react!
import React, {Component} from 'react';
import rd3 from 'react-d3';

var LineChart = rd3.LineChart;

class D3LineChart extends Component{
    constructor(props){
        super(props)


        this.lineData = [
            {
                name: "series1",
                values: [{x: Date.now(), y: Math.random()*10}],
                strokeWidth: 3,
                strokeDashArray: "5,5",
            },
            {
                name: "series2",
                values: [{x: Date.now(), y: Math.random()*10}],
            }
        ];
    }

    componentDidMount() {
        setInterval(() => {
            var vals1 = this.lineData[0].values;
            var vals2 = this.lineData[1].values;
            if(vals1.length > 30)
                vals1.splice(0, 1);
            if(vals2.length > 30)
                vals2.splice(0, 1);
            vals1.push({x: Date.now(), y: Math.random()*10})
            vals2.push({x: Date.now(), y: Math.random()*10})
            this.forceUpdate()
        }, 100);
    }

    render()
    {
        return(
            <LineChart
                legend={true}
                data={this.lineData}
                width={1100}
                height={400}
                viewBoxObject={{
                    x: 0,
                    y: 0,
                    width: 1100,
                    height: 400
                }}
                title="Line Chart"
                yAxisLabel="Altitude"
                xAxisLabel="Elapsed Time (sec)"
                gridHorizontal={true}
                />
        );
    }
}

export default D3LineChart;