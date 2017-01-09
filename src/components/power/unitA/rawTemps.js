import React, {Component} from 'react';
import GenericParameterLabel from '../../GenericParameterLabel.js';
import StreamingPageManager from '../../../StreamingPageManager.js';
import config from '../../../../config/commConfig';
import jquery from 'jquery';
import DataListRow from './DataListRow';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket = io.connect(ip + ':' + port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});



/*
*   PowerA_RawTemperatures class
*/       

class PowerA_RawTemperatures extends Component {
	constructor(props) {
		super(props)

		this.state = {
			streamManager: new StreamingPageManager(),
			command: 'PowerA_RawTemperatures',
		}

	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	PowerAStreamingOff(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StreamingOff', data);
	}
	
	PowerAStreamCurrentTemps(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StreamCurrentTemps', data);
	}
	
	PowerAStreamTempLocations(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StreamTempLocations', data);
	}
	
	render(){
  //       var _this = this,
  //           _className = "col-xs-1_5 text-center",
		// 	_showKeys = true,
  //           _keyCount = 0;

		// var rows = [];
		// for(var i = 0;i<20;i++)
		// {
		// 	rows.push(<tr key={"row"+i}><td>{i} C</td><td>12345</td><td>10</td><td>8</td></tr>)
		// }
			
		let allDataTemp = [
		  {id: 1, temp: 170, userField: 134, resolution: 10, busID: 10},
		  {id: 2, temp: 160, userField: 114, resolution: 30, busID: 8},
		  {id: 3, temp: 140, userField: 104, resolution: 60, busID: 6},
		  {id: 4, temp: 170, userField: 134, resolution: 10, busID: 10},
		  {id: 5, temp: 160, userField: 114, resolution: 30, busID: 8},
		  {id: 6, temp: 140, userField: 104, resolution: 60, busID: 6}, 
		  {id: 7, temp: 170, userField: 134, resolution: 10, busID: 10},
		  {id: 8, temp: 160, userField: 114, resolution: 30, busID: 8},
		  {id: 9, temp: 140, userField: 104, resolution: 60, busID: 6},
		]
	  const inlineBlock = {display: "inline-block"};
	  const scroll = {
	    height: "200px",
	    display: "inline-block",
	    overflowY:"scroll"
	   };
    return (
			<div>
			<legend>Power Node A - Stream Control</legend>
				<form className="form-inline">
					<div className="form-group">
						<button className="btn btn-success" onClick={this.PowerAStreamingOff.bind(this, {})} style={{margin:10}}>Stream Off</button>
						<button className="btn btn-success" onClick={this.PowerAStreamCurrentTemps.bind(this, {})} style={{margin:10}}>Stream Temperatures</button>   
						<button className="btn btn-success" onClick={this.PowerAStreamTempLocations.bind(this, {})} style={{margin:10}}>Stream Sensor Locations</button>   
						<br /><br />
					</div>
				</form>

				<table className="table table-bordered" style={inlineBlock}>
				  <thead>
				    <tr>
				      <th>id</th>
				      <th>Temperature</th>
				      <th>User Field</th>
				      <th>Resolution</th>
				      <th>BusID</th>
				    </tr>
				  </thead>
				  <tbody style={scroll}>
				    {allDataTemp.map(dataTemp => 
				      <DataListRow  key={dataTemp.id} tempData={dataTemp}/>
				    )}
				  </tbody>
				</table>
				</div>
    );
	}
}

export default PowerA_RawTemperatures;
