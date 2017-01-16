import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import StatsModal from './StatsModal.js';
//import GenericParameterInput from './GenericParameterInput.js';
import './InfoPanel.css';

class InfoPanel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			streamManager: new StreamingPageManager(),
			showConnectionModal: false,
			info: {
			}
		}		
	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}

	toggleModalVisibility() {
		this.setState({showConnectionModal: !this.state.showConnectionModal});
	}

	isModalVisible() {
		return (this.state.showConnectionModal)?{display: 'block'}:{display: 'none'};
	}
	
	render(){
	    return (
			<footer className="footer navbar-fixed-bottom navbar-default" >
				<StatsModal isVisible={this.state.showConnectionModal} isVisibleHandler={this.toggleModalVisibility.bind(this)}/>
				<div className="container-fluid">
					<div className="info-panel">
						<legend>Global Stats</legend>
						<div className="InfoPanel-content">
							<button className="btn btn-primary" onClick={this.toggleModalVisibility.bind(this)}>Faults</button>
							<div className="info-element">Packet 1001 Rx:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Packet Rx Count 1001'/></div>
							<div className="info-element">Packet 1003 Rx:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Packet Rx Count 1003'/></div>
						</div>
					</div>
				</div>
			</footer>
	    );
	}
}

export default InfoPanel;
