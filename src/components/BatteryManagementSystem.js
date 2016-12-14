import React, { Component } from 'react';

class BatteryManagementSystem extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: this.props.data
		}
	}

  	componentWillUnmount() {
    	clearTimeout(this.interval);
  	}

  	componentDidMount() {
  		this.tick();
  	}

	tick() {
		const self = this;
		this.setState({data: this.getUpdatedData()});
		setTimeout(this.tick.bind(self), this.props.refreshInterval);
	}

	getUpdatedData() {
		return this.props.data.map(function(element){
			return {temperatureA: element["temperatureA"] + (Math.random() * 10), 
					temperatureB: element["temperatureB"] + (Math.random() * 10), 
					voltage: element["voltage"] + (Math.random() * 10)};
		})
	}

	render() {
		var infolist = this.state.data.map(function(info, i) {
			return <tr key={i}><td>{i}</td><td>{info.temperatureA}</td><td>{info.temperatureB}</td><td>{info.voltage}</td></tr>
		});
	    return (
			<table className="battery-management-system table table-striped">
				<thead>
					<tr><th></th><th>Temperature A</th><th>Temperature B</th><th>Voltage</th></tr>
				</thead>
				<tbody>
				{infolist}
				</tbody>
			</table>
	    );
	}
}

export default BatteryManagementSystem;


