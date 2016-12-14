import React, { Component } from 'react';

class MainLayout extends Component {
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
		          <a className="navbar-brand" href="#">Ground Station</a>
		        </div>
		        <div id="navbar" className="navbar-collapse collapse">
		          <ul className="nav navbar-nav">
		            <li className="overview"><a href="#">Overview</a></li>
		            <li className="dropdown">
		              <a href="#powerA" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Power A <span className="caret"></span></a>
		              <ul className="dropdown-menu">
		                <li><a href="#powerAVoltage">Voltage</a></li>
		                <li><a href="#powerACharger">Charger</a></li>
		                <li><a href="#powerABMS1">BMS 1</a></li>
		                <li><a href="#powerABMS2">BMS 2</a></li>
		                <li><a href="#powerABMS3">BMS 3</a></li>
		              </ul>
		            </li>
		            <li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Power B <span className="caret"></span></a>
		              <ul className="dropdown-menu">
		                <li><a href="#powerBVoltage">Voltage</a></li>
		                <li><a href="#powerB">Charger</a></li>
		                <li><a href="#powerBBMS1">BMS 1</a></li>
		                <li><a href="#powerBBMS2">BMS 2</a></li>
		                <li><a href="#powerBBMS3">BMS 3</a></li>
		              </ul>
		            </li>
		            <li><a href="#lcu">LCU</a></li>
		          </ul>
		        </div>
		      </div>
		    </nav>
		    <div className="col-xs-12">
		        {this.props.children}
	        </div>
        </div>
	    );
	}
}

export default MainLayout;



