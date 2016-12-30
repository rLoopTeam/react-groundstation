import React, { Component } from 'react';

class GenericParameterLabel extends Component {
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
	    return (
		    	<div className="Generic-Value">
				{this.state.value} {this.state.units}
				</div>
	    );
	}
} 

export default GenericParameterLabel;

