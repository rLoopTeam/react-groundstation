import React, { Component } from 'react';
import { Redirect } from 'react-router';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import HealthCheckDisplay from './HealthCheckDisplay.js';
import FaultFlagDisplay from './FaultFlagDisplay.js';

import faultFlagDefinitions from '../../config/faultFlagDefinitions.js';
import nominalConditions from '../../config/nominalConditions.js';
import createSocket from '../shared/socket';
import './HealthCheck.css';

let socket = createSocket();

class HealthCheckOverview extends Component {

  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager()
    };

    this.watchParams = [];
    this.watchFaults = [];

    for (let prefix in nominalConditions) {
      for (let param in nominalConditions[prefix]) {
        if (nominalConditions[prefix][param].Fault) {
          this.watchFaults.push(prefix + ' ' + param);
          continue;
        } else {
          this.watchParams.push({
            fullParam: prefix + ' ' + param,
            max: nominalConditions[prefix][param].Max,
            min: nominalConditions[prefix][param].Min
          });
        }
      }
    }
  }
  render () {
    let viewMode = this.props.route.viewMode || 'overview';

    return (
        <div className="Overview-content">
        <legend>Pod Health</legend>
        <div className="col-md-12">
          {this.watchParams.map(function (item, index) {
            return (
              <form className="form-inline col-xs-12 col-sm-6 col-md-2" key={'health' + index}>
                <div className="form-group">
                  <div className="health">
                  <HealthCheckDisplay
                        StreamingPageManager={this.state.streamManager}
                        parameter={item.fullParam}
                        label={item.fullParam}
                        max={item.max}
                        min={item.min}
                        readOnly='true'
                        hideUnits='true'
                        viewMode={viewMode}
                    />
                  </div>
                </div>
              </form>
            );
          }, this)}
        </div>

        <legend>All Fault Flags</legend>
        <div className="col-md-12">
        {Object.keys(faultFlagDefinitions).map(function (item, index) {
          return (
              <form className="form-inline col-xs-12 col-md-4" key={'healthfault' + index}>
                <div className="form-group">
                  <label htmlFor="a0_y">{item.label}</label>
                  <div className="health">
                  <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label={item} parameter={item} />
                  </div>
                </div>
              </form>
          );
        }, this)}
        </div>
      </div>
    );
  }
}
export default HealthCheckOverview;
