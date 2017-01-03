import React, { Component } from 'react';
import { Link } from 'react-router';
import InfoPanel from '../InfoPanel';

class MainLayout extends Component {
	constructor(){
		super()

		this.links = [
			{
				name: "Overview", location: "/"
			},
			{
				name: "Power A", location: "/powerA", children: [
					{name: "Voltage", location: "/powerAVoltage"},
					{name: "Charger", location: "/powerACharger"},
					{name: "BMS 1", location: "/powerABMS1"},
					{name: "BMS 2", location: "/powerABMS2"},
					{name: "BMS 3", location: "/powerABMS3"},
				]
			},
			{
				name: "Power B", location: "/powerB", children: [
					{name: "Voltage", location: "/powerBVoltage"},
					{name: "Charger", location: "/powerBCharger"},
					{name: "BMS 1", location: "/powerBBMS1"},
					{name: "BMS 2", location: "/powerBBMS2"},
					{name: "BMS 3", location: "/powerBBMS3"},
				]
			},
			{
				name: "LCU", location: "/lcu"
			},
			{
				name: "LGU", location: "/lgu"
			},
			{
				name: "STOP", location: "/stop"
			},
			{
				name: "Flight Control", location: "/flightControl", children: [
					{name: "Accelerometers", location: "/flightcontrol_accel"},
					{name: "Brakes", location: "/brakes"},
				]
			},
			{
				name: "Extras", location: "/extras", children: [
					{name: "Xilinx Sim", location: "/xilinxsim"},
				]
			},
			{
				name: "Config", location: "/config", children: [
					{name: "Comms", location: "/commConfig"},
				]
			},
		];
	}

	render() {
	    return (
        <div className="container-fluid">
	      	<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="col-xs-12">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/">Ground Station</Link>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							{
								this.links.map(function(item, index){
									if(item.children){
										return (
											<li key={index} className="dropdown">
												<Link to={item.location} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{item.name}<span className="caret"></span></Link>
												<ul className="dropdown-menu">
													{
														item.children.map(function(child, chIndex){
															return(
																<li key={chIndex}><Link to={child.location}>{child.name}</Link></li>
															);
														})
													}
												</ul>
											</li>
										);
									}
									else{
										return(
											<li key={index}><Link to={item.location}>{item.name}</Link></li>
										);
									}
								})
							}
						</ul>
					</div>
				</div>
			</nav>
			<div className="row">
				<div className="col-xs-12">
					{this.props.children}
				</div>
			</div>

			<div className="row">
				<div className="col-xs-12">
						<InfoPanel />
				</div>
	        </div>
		</div>
	    );
	}
}

export default MainLayout;



