import React, { Component } from 'react';

class GenericParameterDisplay extends Component {
	/*
	* This component is the base class for simple dynamic displays like GenericLabel and GenericInput
	*/
	constructor(props) {
		super(props)
		this.dataCallback = this.dataCallback.bind(this);
		
		this.props.StreamingPageManager.RequestParameterWithCallback(this.props.parameter, this.dataCallback);
		
		this.state = {
			stale: false,
			value: 0,
			units: ''
		}
		this.hexTypeMap = {
			'8':2,
			'16':4,
			'32':8,
			'64':16
		}
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.props.StreamingPageManager.destroy();
	}
	
	dataCallback(parameterData){
		if(this._isMounted)
		{
			if(isNaN(parameterData.Value))
				this.setState({value: parameterData.Value, stale: parameterData.IsStale, units: parameterData.Units});
			else
				this.setState({value: Number(parameterData.Value).toFixed(2), stale: parameterData.IsStale, units: parameterData.Units});
		}
	}
	
	isReadOnly() {
		return (this.props.readOnly)?'readOnly':false;
	}
	
	getUnits() {
		return (this.props.hideUnits === 'true')?'':this.state.units;
	}

	getFormattedValue() {
		var formattedValue = this.state.value;
		if (this.props.hex === 'true'){
		  	formattedValue = this.state.value.toString(16);
		  	if (this.props.hexType !== null && this.props.hexType !== undefined ) {
		  		var padding = this.hexTypeMap[this.props.hexType] - formattedValue.length;
		  		if (padding < 0) { throw new Error('Error - Value has more bytes than the hexType allows. Check the datatype.'); }
				formattedValue = new Array(padding+1).join(0) + formattedValue;
		  	}
		  	formattedValue = '0x'+formattedValue;
		}
		return formattedValue;
	}

	render() {
		return (
				<div>
					{/* You should create a new component, extend this class and override teh render function */}
				</div>
		);
	}
} 

GenericParameterDisplay.propTypes = {
	hideUnits: React.PropTypes.oneOf(['true']),
	hex: React.PropTypes.oneOf(['true']),
  	hexType: React.PropTypes.oneOf([8,16,32,64])
};

export default GenericParameterDisplay;

