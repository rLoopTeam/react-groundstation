import React, {Component} from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';

class LandingGear extends Component {
  constructor (props) {
    super(props);
    this.state = {
      streamManager: new StreamingPageManager()
    };

    this.parameters = {
      lgu: [
        {param: 'LGU Fault Flags Root', label: 'System Fault Flags'},
        {param: 'LGU Fault Flags 1', label: 'Fault flags 1'},
        {param: 'LGU ADC label 1', label: 'ADC label 1'},
        {param: 'LGU Actual Extension 1', label: 'Actual extention 1'},
        {param: 'LGU Computed Height 1', label: 'Computed extention 1'},
        {param: 'LGU Switch Extend 1', label: 'Switch extend 1'},
        {param: 'LGU Switch Retract 1', label: 'Switch retract 1'},
        {param: 'LGU spare 1_1', label: 'spare 1 1'},
        {param: 'LGU Spare 2_1', label: 'spare 2 1'},
        {param: 'LGU Spare 3_1', label: 'spare 3 1'},
        {param: 'LGU Spare 4_1', label: 'spare 4 1'},
        {param: 'LGU Fault Flags 2', label: 'Fault flags 2'},
        {param: 'LGU ADC label 2', label: 'ADC label 2'},
        {param: 'LGU Actual Extension 2', label: 'Actual extention 2'},
        {param: 'LGU Computed Height 2', label: 'Computed extention 2'},
        {param: 'LGU Switch Extend 2', label: 'Switch extend 2'},
        {param: 'LGU Switch Retract 2', label: 'Switch retract 2'},
        {param: 'LGU spare 1_2', label: 'spare 1 2'},
        {param: 'LGU Spare 2_2', label: 'spare 2 2'},
        {param: 'LGU Spare 3_2', label: 'spare 3 2'},
        {param: 'LGU Spare 4_2', label: 'spare 4 2'},
        {param: 'LGU Fault Flags 3', label: 'Fault flags 3'},
        {param: 'LGU ADC label 3', label: 'ADC label 3'},
        {param: 'LGU Actual Extension 3', label: 'Actual extention 3'},
        {param: 'LGU Computed Height 3', label: 'Computed extention 3'},
        {param: 'LGU Switch Extend 3', label: 'Switch extend 3'},
        {param: 'LGU Switch Retract 3', label: 'Switch retract 3'},
        {param: 'LGU spare 1_3', label: 'spare 1 3'},
        {param: 'LGU Spare 2_3', label: 'spare 2 3'},
        {param: 'LGU Spare 3_3', label: 'spare 3 3'},
        {param: 'LGU Spare 4_3', label: 'spare 4 3'}
      ]};
  }
  render () {
    var _this = this;
    return (
      <div className="Overview-content">
        <legend>LGU - Landing gear unit</legend>
        <br />
        {this.parameters.lgu.map(function (item, index) {
          return (
            <div className="col-xs-3" key={'items' + index}>
              <label>{item.label}</label>
              <GenericParameterLabel StreamingPageManager={_this.state.streamManager} parameter={item.param}/>
            </div>
          );
        })};
      </div>
    );
  }
}

export default LandingGear;
