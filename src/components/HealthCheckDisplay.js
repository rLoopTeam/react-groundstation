import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';
import nominalConditions from '../../config/nominalConditions.js';

class HealthCheckDisplay extends GenericParameterDisplay {
  constructor (props) {
    super(props);
    this.dataCallback = this.dataCallback.bind(this);

    this.state = {
      counter: 0
    };
    this.packetValues = {};

    for (let parameter of this.props.parameters) {
      this.packetValues[parameter] = 0;
    }

    this._isMounted = true;
  }

  componentDidMount () {
    for (let parameter of this.props.parameters) {
      this.props.StreamingPageManager.RequestParameterWithCallback(parameter, this.dataCallback);
    }
  }

  componentWillUnmount () {
    this._isMounted = false;
    this.props.StreamingPageManager.destroy();
  }

  dataCallback (parameterData) {
    if (this._isMounted) {
      // Do nothing if the states are equal.
      if (
        parameterData.Value === this.packetValues[parameterData.Name] ||
        Number(parameterData.Value).toFixed(2) === this.packetValues[parameterData.Name]
      ) {
        return;
      }

      this.setState({counter: this.state.counter + 1});

      if (isNaN(parameterData.Value)) {
        this.packetValues[parameterData.Name] = parameterData.Value;
      } else {
        this.packetValues[parameterData.Name] = Number(parameterData.Value).toFixed(2);
      }
    }
  }

  isDangerous () {
    for (let valueIndex in this.packetValues) {
      let value = this.packetValues[valueIndex];
      if (value === '?') {
        return true;
      } else if (Number(value) > this.props.max) {
        console.debug('overmax', this.props.label, value);
        return true;
      } else if (Number(value) < this.props.min) {
        console.debug('undermin', this.props.label, value);
        return true;
      }
    }

    return false;
  }

  render () {
    let className = 'health data';
    let extraElements = [];

    if (this.isDangerous()) {
      className += ' danger-row';
    } else {
      className += ' nominal-row';
    }

    if (this.props.viewMode === 'detailed') {
      let valueTotals = [];
      for (let packetName in this.packetValues) {
        valueTotals.push(this.packetValues[packetName]);
      }
      extraElements.push(<p key={'packetDetail'}>{valueTotals.join(', ')}</p>);
    }

    return (
        <div className={className}>
          <label>{this.props.label}</label>
          {extraElements.map((item, index) => {
            return item;
          })}
        </div>
    );
  }
}

export default HealthCheckDisplay;

