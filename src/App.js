import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import MainLayout from './components/containers/MainLayout';
import Overview from './components/Overview';
import Stop from './components/Stop';
import LGU from './components/LGU';
import XilinxSim from './components/XilinxSim';
import FlightControl_Accel from './components/FlightControl_Accel';
import Brakes from './components/Brakes';
import DataStreamExample from './components/datasubexample';
import CommConfig from './components/CommConfig';
import DAQ from './components/DAQ';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={Overview} />
            <Route path="dashboard" component={Overview} />
            <Route path="stop" component={Stop} />
            <Route path="lgu" component={LGU} />
            <Route path="XilinxSim" component={XilinxSim} />
            <Route path="FlightControl_Accel" component={FlightControl_Accel} />
            <Route path="brakes" component={Brakes} />
			<Route path="datasubexample" component={DataStreamExample} />
			<Route path="commConfig" component={CommConfig} />
			<Route path="DAQ" component={DAQ} />
          </Route>
      </Router>
    );
  }
}

export default App;
