import React, { Component } from 'react';

class GenericParameterInput extends Component {
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
			this.setState({value: parameterData.Value, stale: parameterData.IsStale, units: parameterData.Units});
	}

	render() {

		var isReadOnly = (this.props.readOnly)?'readOnly':false;
		var formattedValue = this.state.value;

		if (this.props.hex === 'true'){
		  	formattedValue = this.state.value.toString(16);
		  	if (this.props.hexType != null && this.props.hexType != undefined ) {
		  		var padding = this.hexTypeMap[this.props.hexType] - formattedValue.length;
		  		if (padding < 0) { throw new Error('Error - Value has more bytes than the hexType allows. Check the datatype.'); }
				formattedValue = new Array(padding+1).join(0) + formattedValue;
		  	}
		  	formattedValue = '0x'+formattedValue;
		}

		return (
				<div>
					<input 	type="text" 
							className="form-control"
							value={formattedValue} readOnly={isReadOnly} /><b>{this.state.units}</b>
				</div>
		);
	}
} 

GenericParameterInput.propTypes = {
	hex: React.PropTypes.oneOf(['true']),
  	hexType: React.PropTypes.oneOf([8,16,32,64])
};

export default GenericParameterInput;

