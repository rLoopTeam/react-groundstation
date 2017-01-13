import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import FaultFlagDisplay from './FaultFlagDisplay.js';

class FlightControl_DistanceSensors extends Component {
	constructor(props) {
		super(props)
		this.state = {
			streamManager: new StreamingPageManager()
		}		
	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}

	
	render(){
	    return (
		    <div className="Overview-content">
				<h2>Distance sensors</h2>
				{/* 
					These are the basic components we use for displaying data. 
					The "parameter" is the parameter it will display. The groundstation automatically requests 
					the parameter you define in that property and renders it in that component

					the parameters are defined in "config/packetDefinitions.js. go in there and find the "Laser opto sensor" section.

					the parameter element is everything that needs to be displayed on the page

					now look at the "parameterPrefix". This is the first part of the "parameter"

					you need to add the "parameterPrefix" and the parameter "name" to get the full name of the parmater

					for example the components below display the fault flags. the prefix is "Accel " and the parameter name is "0 Flags" or "1 Flags"
					this makes: "Accel 0 Flags".
					
					--------------------
	
					now you know how to get the parameters you can start creating the Distance sensor page using "GenericParameterLabel" or "GenericParameterInput" components as shown below.
					use Bootstrap (http://getbootstrap.com/css/) to construct the structure of the page.
					use components to display the individual parameteres described above. Look at pages like "FlightControl_CalAccel" for inspiration

					--------------------

					in order to see things displayed in the components, you need to enable a data generator. uncomment the generators at the bottom of "server/index.js"
					Note: Make sure not to commit index.js to git with the generators uncommented because it messes with people testing on hardware. 
					ALWAYS comment out the generators before commiting to git
					*/}
				<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 0 Flags' hideUnits='true' hex='true' hexType={32} readOnly='true'/>
				<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Accel 1 Flags' hideUnits='true' hex='true' hexType={32} readOnly='true'/>
				<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 0 X Raw' hideUnits='true' readOnly='true'/>
				<FaultFlagDisplay 	StreamingPageManager={this.state.streamManager} 
									label="Accel 1 fault flags"
									parameter='Accel 1 Flags'></FaultFlagDisplay>
			</div>
	    );
	}
}

export default FlightControl_DistanceSensors;
