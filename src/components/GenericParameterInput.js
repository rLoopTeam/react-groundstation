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
		return (
				<div>
					<input 	type="text" 
							className="form-control"
							value={ (this.props.hex === 'true') ? '0x'+this.state.value.toString(16) : this.state.value } readOnly={isReadOnly} /><b>{this.state.units}</b>
				</div>
		);
	}
} 

export default GenericParameterInput;

