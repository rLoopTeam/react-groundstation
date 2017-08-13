import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericModal from './GenericModal';
import FaultFlagDisplay from './FaultFlagDisplay';
import './GenericModal.css';

class StatsModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      streamManager: new StreamingPageManager()
    };
  }

  render () {
    return (
        <GenericModal title="Node stats" closeHandler={this.props.isVisibleHandler} visibility={this.props.isVisible}>
          <div className="row">
            <div className="col-md-12">
              <h2>Flight Control</h2>
              <div className="col-md-4">
                  <h3>Accelerometers</h3>
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Accel 1 Fault flags" parameter='Accel 1 Flags' />
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Accel 2 Fault flags" parameter='Accel 2 Flags' />
              </div>
              <div className="col-md-4">
                  <h3>Brakes</h3>
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Left Brake Fault Flags" parameter='Brake Fault flags 1' />
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Right Brake Fault Flags" parameter='Brake Fault flags 2' />
              </div>
              <div className="col-md-4">
                  <h3>Contrast sensors</h3>
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="System Fault flags" parameter='LaserContrast0 System Fault Flags' />
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Fault flags 1" parameter='LaserContrast0 Laser Fault Flags' />
              </div>
              <div className="col-md-12">
                  <h3>Distance sensors</h3>
                <div className="row">
                  <div className="col-md-4">
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto Fault flags" parameter='LaserOpto Fault flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 1 Fault flags" parameter='LaserOpto 1 Fault flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 2 Fault flags" parameter='LaserOpto 2 Fault flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 3 Fault flags" parameter='LaserOpto 3 Fault flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 4 Fault flags" parameter='LaserOpto 4 Fault flags' />
                  </div>
                  <div className="col-md-4">
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 5 Fault flags" parameter='LaserOpto 5 Fault flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 6 Fault flags" parameter='LaserOpto 6 Fault flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 7 Fault flags" parameter='LaserOpto 7 Fault flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 8 Fault flags" parameter='LaserOpto 8 Fault flags' />
                  </div>
                  <div className="col-md-12">
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="ForwardLaser Fault flags" parameter='ForwardLaser Fault flags' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6"><h2>Power FWD</h2>
            </div>
            <div className="col-md-6"><h2>Power AFT</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6"><h2>Landing Control</h2>
            </div>
            <div className="col-md-6"><h2>Gimbal Control</h2>
            </div>
          </div>
        </GenericModal>
    );
  }
}

export default StatsModal;

