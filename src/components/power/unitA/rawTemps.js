import React, {Component} from 'react';
import StreamingPageManager from '../../../StreamingPageManager.js';
import config from '../../../../config/commConfig';
import jquery from 'jquery';
import DataStreamClient from '../../../StreamPipeClient.js';
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

		this.newPacketCallback = this.newPacketCallback.bind(this);
		this.requestParameterFromServer = this.requestParameterFromServer.bind(this);
		
		this.state = {
			command: 'PowerA_RawTemperatures',
			numberofSensors: 0
		}

		this.newPacketCallback  = this.newPacketCallback.bind(this);
		this.DataStreamClient = new DataStreamClient(this.newPacketCallback);
		this.requestParameterFromServer('Power A Temps Count');
		}
	
	requestParameterFromServer(parameter){
		this.DataStreamClient.RequestParameter(parameter);
	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	componentWillUnmount() {
		this._isMounted = false;
		this.state.StreamingPageManager.destroy();
	}
	
	newPacketCallback(parameterData){
		var field;
		var newState = {};

		for(var i = 0;i<parameterData.length;i++){
			
			if(this._isMounted){
				if(parameterData[i].Name === 'Power A Temps Count' && this.state.numberofSensors !== parameterData[i].Value){
					this.setState({numberofSensors: parameterData[i].Value});
					for(var x = 1;x<=parameterData[i].Value;x++){
						this.requestParameterFromServer('Power A Temps '+x+' Temperature');
						this.requestParameterFromServer('Power A Temps Loc '+x+' User Index');
						this.requestParameterFromServer('Power A Temps Loc '+x+' Resolution');
						this.requestParameterFromServer('Power A Temps Loc '+x+' Bus Index');
					}
				}

				if(parameterData[i].Name.substring(parameterData[i].Name.length-11,parameterData[i].Name.length) === "Temperature")
				{
					field = 'temperatureValues'+parameterData[i].Name.split(' ')[3];
					if(this.state[field] !== parameterData[i].Value){
						newState[field] = parameterData[i].Value;
					}
				}
				
				if(parameterData[i].Name.substring(parameterData[i].Name.length-10,parameterData[i].Name.length) === "User Index")
				{
					field = 'userIndex'+parameterData[i].Name.split(' ')[4];
					if(this.state[field] !== parameterData[i].Value){
						newState[field] = parameterData[i].Value;
					}
				}
				
				if(parameterData[i].Name.substring(parameterData[i].Name.length-10,parameterData[i].Name.length) === "Resolution")
				{
					field = 'resolution'+parameterData[i].Name.split(' ')[4];
					if(this.state[field] !== parameterData[i].Value){
						newState[field] = parameterData[i].Value;
					}
				}
				
				if(parameterData[i].Name.substring(parameterData[i].Name.length-9,parameterData[i].Name.length) === "Bus Index")
				{
					field = 'busIndex'+parameterData[i].Name.split(' ')[4];
					if(this.state[field] !== parameterData[i].Value){
						newState[field] = parameterData[i].Value;
					}
				}
			}
		}
		this.setState(newState);
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
        var _this = this,
            _className = "col-xs-1_5 text-center",
			_showKeys = true,
            _keyCount = 0;

		var rows = [];
		for(var i = 1;i<=this.state.numberofSensors;i++)
		{
			//rows.push(<tr key={"row"+i}><td>{this.state['temperatureValues'+i.toString()]} C</td><td>{this.state['userIndex'+i.toString()]}</td></tr>)
			rows.push(<tr key={"row"+i}><td>{this.state['temperatureValues'+i.toString()]} C</td><td>{this.state['userIndex'+i.toString()]}</td><td>{this.state['resolution'+i.toString()]}</td><td>{this.state['busIndex'+i.toString()]}</td></tr>)
		}

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

					<table className="table">
					<thead><tr>
						<th>Temperature</th><th>User Field</th><th>Resolution</th><th>Bus ID</th>
					</tr></thead>
					<tbody>
					{rows}
					</tbody></table>

				</div>
	    );
	}
}

export default PowerA_RawTemperatures;
