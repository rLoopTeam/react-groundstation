import React, {Component} from 'react';
import config from '../../../config/commConfig';
import DataStreamClient from '../../StreamPipeClient.js';
import createSocket from '../../shared/socket';

let socket = createSocket();

/*
*   Power_RawTemperatures class
*/

class Power_RawTemperatures extends Component {
  constructor (props) {
    super(props);

    this.newPacketCallback = this.newPacketCallback.bind(this);
    this.requestParameterFromServer = this.requestParameterFromServer.bind(this);

    this.state = {
      command: `Power${props.route.L}_RawTemperatures`,
      numberofSensors: 0
    };

    this.newPacketCallback = this.newPacketCallback.bind(this);
    this.DataStreamClient = new DataStreamClient(this.newPacketCallback);
  }

  requestParameterFromServer (parameter) {
    this.DataStreamClient.RequestParameter(parameter);
  }

  componentDidMount () {
    this._isMounted = true;
    this.DataStreamClient.openSocket();
    this.requestParameterFromServer(`Power ${this.props.route.L} Temps Count`);
  }

  componentWillUnmount () {
    this._isMounted = false;
    this.DataStreamClient.closeSocket({clearParameters: true});
  }

  newPacketCallback (newData) {
    if (!this._isMounted) {
      return;
    }

    var parameterData = newData.parameters;

    var field;
    var newState = {};
    // console.log("here");
    // console.log(JSON.stringify(parameterData));

    for (var i = 0; i < parameterData.length; i++) {
      if (parameterData[i].Name === `Power ${this.props.route.L} Temps Count` && this.state.numberofSensors !== parameterData[i].Value) {
        this.setState({numberofSensors: parameterData[i].Value});
        for (var x = 1; x <= parameterData[i].Value; x++) {
          this.requestParameterFromServer(`Power ${this.props.route.L} Temps ${x} Temperature`);
          this.requestParameterFromServer(`Power ${this.props.route.L} Temps Loc ${x} User Index`);
          this.requestParameterFromServer(`Power ${this.props.route.L} Temps Loc ${x} Resolution`);
          this.requestParameterFromServer(`Power ${this.props.route.L} Temps Loc ${x} Bus Index`);
          this.requestParameterFromServer(`Power ${this.props.route.L} ROM ID ${x}`);
        }
      }

      if (parameterData[i].Name.substring(parameterData[i].Name.length - 11, parameterData[i].Name.length) === 'Temperature') {
        field = 'temperatureValues' + parameterData[i].Name.split(' ')[3];
        if (this.state[field] !== parameterData[i].Value) {
          newState[field] = parameterData[i].Value;
        }
      }

      if (parameterData[i].Name.substring(parameterData[i].Name.length - 10, parameterData[i].Name.length) === 'User Index') {
        field = 'userIndex' + parameterData[i].Name.split(' ')[4];
        if (this.state[field] !== parameterData[i].Value) {
          newState[field] = parameterData[i].Value;
        }
      }

      if (parameterData[i].Name.substring(parameterData[i].Name.length - 10, parameterData[i].Name.length) === 'Resolution') {
        field = 'resolution' + parameterData[i].Name.split(' ')[4];
        if (this.state[field] !== parameterData[i].Value) {
          newState[field] = parameterData[i].Value;
        }
      }

      if (parameterData[i].Name.substring(parameterData[i].Name.length - 9, parameterData[i].Name.length) === 'Bus Index') {
        field = 'busIndex' + parameterData[i].Name.split(' ')[4];
        if (this.state[field] !== parameterData[i].Value) {
          newState[field] = parameterData[i].Value;
        }
      }

      if (parameterData[i].Name.substring(0, 14) === `Power ${this.props.route.L} ROM ID`) {
        field = 'ROMID' + parameterData[i].Name.split(' ')[4];
        if (this.state[field] !== parameterData[i].Value) {
          newState[field] = parameterData[i].Value;
        }
      }
    }
    this.setState(newState);
  }

  PowerStreamingOff (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StreamingOff`, data);
  }

  PowerStreamCurrentTemps (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StreamCurrentTemps`, data);
  }

  PowerStreamTempLocations (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StreamTempLocations`, data);
  }

  PowerROMIDScan (data, e) {
    e.preventDefault();
    data.numberofSensors = this.state.numberofSensors;
    socket.emit(`Power${this.props.route.L}:TempSensorROMIDScan`, data);
  }

  render () {
    var _this = this;
    var _className = 'col-xs-1_5 text-center';
    var _showKeys = true;
    var _keyCount = 0;

    var rows = [];
    for (var i = 1; i <= this.state.numberofSensors; i++) {
      // rows.push(<tr key={"row"+i}><td>{this.state['temperatureValues'+i.toString()]} C</td><td>{this.state['userIndex'+i.toString()]}</td></tr>)
      rows.push(<tr key={'row' + i}>
        <td>{i - 1}</td>
        <td>{this.state['temperatureValues' + i.toString()]} C</td>
        <td>{this.state['userIndex' + i.toString()]}</td>
        <td>{this.state['resolution' + i.toString()]}</td>
        <td>{this.state['busIndex' + i.toString()]}</td>
        <td>{this.state['ROMID' + i.toString()]}</td>
        </tr>);
    }

    return (
        <div>
        <legend>Power Node {this.props.route.L} - Stream Control</legend>
          <form className="form-inline">
            <div className="form-group">
              <button className="btn btn-success" onClick={this.PowerStreamingOff.bind(this, {})} style={{margin: 10}}>Stream Off</button>
              <button className="btn btn-success" onClick={this.PowerStreamCurrentTemps.bind(this, {})} style={{margin: 10}}>Stream Temperatures</button>
              <button className="btn btn-success" onClick={this.PowerStreamTempLocations.bind(this, {})} style={{margin: 10}}>Stream Sensor Locations</button>
              <button className="btn btn-success" onClick={this.PowerROMIDScan.bind(this, {})} style={{margin: 10}}>Get ROM IDs</button>
              <br /><br />
            </div>
          </form>

          <table className="table">
          <thead><tr>
            <th>Index</th><th>Temperature</th><th>User Field</th><th>Resolution</th><th>Bus ID</th><th>ROM ID</th>
          </tr></thead>
          <tbody>
          {rows}
          </tbody></table>

        </div>
    );
  }
}

export default Power_RawTemperatures;
