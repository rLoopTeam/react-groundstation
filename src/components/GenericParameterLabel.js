import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';

class GenericParameterLabel extends GenericParameterDisplay {
  constructor (props) {
    super(props);
    this.styles = {
      default: {
        color: 'black'
      },
      nominal: {
        color: 'green'
      },
      warning: {
        color: 'red',
        fontWeight: 800
      }
    };
  }
  render () {
    const value = this.getFormattedValue();
    let valueStyling = this.styles.default;
    let titleString = '';
    if (this.props.minValue || this.props.maxValue) {
      valueStyling = (value > this.props.maxValue) ? this.styles.warning : this.styles.nominal;
      titleString = 'Min: ' + this.props.minValue + ', Max: ' + this.props.maxValue;
    }
    return (
      <div className="Generic-Value">
        <span style={valueStyling} title={titleString}>{value}</span>
        <b> {this.getUnits()}</b>
      </div>
    );
  }
}

export default GenericParameterLabel;

