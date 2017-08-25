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
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Accel 1 Fault Flags" parameter='Accel 1 Flags' />
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Accel 2 Fault Flags" parameter='Accel 2 Flags' />
              </div>
              <div className="col-md-4">
                  <h3>Brakes</h3>
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Left Brake Fault Flags" parameter='Brake Fault Flags 1' />
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Right Brake Fault Flags" parameter='Brake Fault Flags 2' />
              </div>
              <div className="col-md-4">
                  <h3>Contrast sensors</h3>
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="System Fault Flags" parameter='LaserContrast0 System Fault Flags' />
                <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Fault Flags 1" parameter='LaserContrast0 Laser Fault Flags' />
              </div>
              <div className="col-md-12">
                  <h3>Distance sensors</h3>
                <div className="row">
                  <div className="col-md-4">
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto Fault Flags" parameter='LaserOpto Fault Flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 1 Fault Flags" parameter='LaserOpto 1 Fault Flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 2 Fault Flags" parameter='LaserOpto 2 Fault Flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 3 Fault Flags" parameter='LaserOpto 3 Fault Flags' />
                  </div>
                  <div className="col-md-4">
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 4 Fault Flags" parameter='LaserOpto 4 Fault Flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 5 Fault Flags" parameter='LaserOpto 5 Fault Flags' />
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="LaserOpto 6 Fault Flags" parameter='LaserOpto 6 Fault Flags' />
                  </div>
                  <div className="col-md-12">
                    <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="ForwardLaser Fault Flags" parameter='ForwardLaser Fault Flags' />
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

