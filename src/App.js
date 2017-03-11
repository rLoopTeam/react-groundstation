import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import MainLayout from './components/containers/MainLayout';
import Overview from './components/Overview';
import LGU from './components/LGU';
import AutoSequence from './components/AutoSequence';
import XilinxSim from './components/XilinxSim';
import FunctionalTest from './components/FunctionalTest';
import FlightControl_CalAccel from './components/FlightControl_CalAccel';
import FlightControl_FullAccel from './components/FlightControl_FullAccel';
import FlightControl_Contrast from './components/FlightControl_Contrast';
import FlightControl_NavigationSensors from './components/FlightControl_NavigationSensors';
import LineChart from './components/charts/LineChart';
import Brakes from './components/Brakes';
import Throttles from './components/Throttles';
import Steppers from './components/Steppers';
import DataStreamExample from './components/datasubexample';
import CommConfig from './components/CommConfig';
import DAQ from './components/DAQ';
import Power_Overview from './components/power/overview';
import PowerA_RawTemperatures from './components/power/unitA/rawTemps';
import PowerB_RawTemperatures from './components/power/unitB/rawTemps';
import PowerNodeConfig from './components/PowerNodeConfig.js';
import './App.css';

import io from 'socket.io-client';
let socket = io.connect('127.0.0.1:3000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
});

/* -----------
  Heartbeat signal
------------ */
setInterval(function () {
  socket.emit('GS_Heartbeat');
  // udp.tx.transmitPodCommand('Flight Control', 0x0400, 0x0, 0x0, 0x0, 0x0); //Heartbeat packet
}, 1000);

class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
        <IndexRoute component={Overview} />
          <Route path="dashboard" component={Overview} />
          <Route path="PowerNodeConfig" component={PowerNodeConfig} />
          <Route path="powerAOverview" component={Power_Overview} L="A"/>
          <Route path="powerARawTemps" component={PowerA_RawTemperatures} />
          <Route path="powerBOverview" component={Power_Overview} L="B"/>
          <Route path="powerBRawTemps" component={PowerB_RawTemperatures} />
          <Route path="lgu" component={LGU} />
          <Route path="AutoSequence" component={AutoSequence} />
          <Route path="XilinxSim" component={XilinxSim} />
          <Route path="FunctionalTest" component={FunctionalTest} />
          <Route path="FlightControl_FullAccel" component={FlightControl_FullAccel} />
          <Route path="FlightControl_CalAccel" component={FlightControl_CalAccel} />
          <Route path="FlightControl_Contrast" component={FlightControl_Contrast} />
          <Route path="FlightControl_NavigationSensors" component={FlightControl_NavigationSensors} />
          <Route path="throttles" component={Throttles} />
          <Route path="LineChart" component={LineChart} />
          <Route path="brakes" component={Brakes} />
          <Route path="Steppers" component={Steppers} />
          <Route path="datasubexample" component={DataStreamExample} />
          <Route path="commConfig" component={CommConfig} />
          <Route path="DAQ" component={DAQ} />
        </Route>
      </Router>
    );
  }
}

export default App;
