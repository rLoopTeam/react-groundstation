import React, { Component } from 'react';
import { Link } from 'react-router';
import InfoPanel from '../InfoPanel';

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
		          <Link className="navbar-brand" to="/">Ground Station</Link>
		        </div>
		        <div id="navbar" className="navbar-collapse collapse">
		          <ul className="nav navbar-nav">
		            <li className="overview"><Link to="/">Overview</Link></li>
		            <li className="dropdown">
		              <Link to="/powerA" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Power A <span className="caret"></span></Link>
		              <ul className="dropdown-menu">
		                <li><Link to="/powerAVoltage">Voltage</Link></li>
		                <li><Link to="/powerACharger">Charger</Link></li>
		                <li><Link to="/powerABMS1">BMS 1</Link></li>
		                <li><Link to="/powerABMS2">BMS 2</Link></li>
		                <li><Link to="/powerABMS3">BMS 3</Link></li>
		              </ul>
		            </li>
		            <li className="dropdown">
		              <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Power B <span className="caret"></span></Link>
		              <ul className="dropdown-menu">
		                <li><Link to="/powerBVoltage">Voltage</Link></li>
		                <li><Link to="/powerB">Charger</Link></li>
		                <li><Link to="/powerBBMS1">BMS 1</Link></li>
		                <li><Link to="/powerBBMS2">BMS 2</Link></li>
		                <li><Link to="/powerBBMS3">BMS 3</Link></li>
		              </ul>
		            </li>
		            <li><Link to="/lcu">LCU</Link></li>
		            <li><Link to="/lgu">LGU</Link></li>
		            <li><Link to="/stop">STOP</Link></li>

					<li className="dropdown">
		              <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Flight Control<span className="caret"></span></Link>
		              <ul className="dropdown-menu">
						<li><Link to="/flightcontrol_accel">Accelerometers</Link></li>
		              </ul>
		            </li>
					
		            <li className="dropdown">
		              <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Extras<span className="caret"></span></Link>
		              <ul className="dropdown-menu">
						<li><Link to="/xilinxsim">Xilinx Sim</Link></li>
		              </ul>
		            </li>
					
					<li className="streamExample"><Link to="/datasubexample">Data Stream Example</Link></li>
					<li className="commConfig"><Link to="/commConfig">Communication Configuration</Link></li>
					
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



