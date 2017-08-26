import React, { Component } from 'react';
import { Redirect } from 'react-router';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import faultFlagDefinitions from '../../config/faultFlagDefinitions.js';
import nominalConditions from '../../config/nominalConditions.js';
import createSocket from '../shared/socket';
import './HealthCheck.css';
import packetDefinitions from '../../config/packetDefinitions.json';

let socket = createSocket();
class TrackDb extends Component {
  constructor (props) {
    super(props);
    this.state = {
      streamManager: new StreamingPageManager()
    };
    this.trackParams = [];
    packetDefinitions['packetDefinitions'].forEach(function (element) {
      if (element['Name'] === 'FCU Data') {
        this.trackParams = element['Parameters'];
        return;
      }
    }, this);
  }
  genTrackLabels () {
    let arr = [];
    this.trackParams.forEach(function (element) {
      arr.push(
        <div className="row" key={element['Name']}>
        <label>{element['Name']}</label>
        <GenericParameterLabel
            StreamingPageManager={this.state.streamManager}
            parameter={element['Name']}/>
    </div>
      );
    }, this);
    return arr;
  }
  render () {
    return (
          <div className="detailed-content">
          <legend>Raw Data</legend>
          <div className="col-md-12">
            {this.genTrackLabels()}
          </div>
          </div>
    );
  }
}
export default TrackDb;
