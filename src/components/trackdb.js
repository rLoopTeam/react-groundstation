import React, { Component } from 'react';
import { Redirect } from 'react-router';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import faultFlagDefinitions from '../../config/faultFlagDefinitions.js';
import nominalConditions from '../../config/nominalConditions.js';
import createSocket from '../shared/socket';
import './HealthCheck.css';
var packetDefinitions = require('../../config/packetDefinitions.json');

let socket = createSocket();

class TrackDb extends Component {
  constructor (props) {
    super(props);
    this.state = {
      streamManager: new StreamingPageManager()
    };
    this.trackParams = [];
    for (var element in this.trackParams) {
      if (element['Name'] === 'FCU Data') {
        this.trackParams = element;
        return;
      }
    }
  }

  genTrackLabels () {
    let arr = [];
    for (var item in this.trackParams) {
      arr.push(
            <div className="row" key={'dbParam'}>
            <div>{item}</div>
            <label>{item['Name']}</label>
            <GenericParameterLabel
                StreamingPageManager={this.state.streamManager}
                parameter={item['Name']} hex={item.hex}/>
        </div>
        );
    }
  }
  render () {
    return (
          <div className="Trackdb">
          <legend>Raw Data</legend>
          <div className="col-md-12">
            {this.genTrackLabels()}
          </div>
          </div>
    );
  }
}
export default TrackDb;
