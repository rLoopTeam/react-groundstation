import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import MainLayout from './components/containers/MainLayout';
import Overview from './components/Overview';
import Stop from './components/Stop';
import LGU from './components/LGU';
import XilinxSim from './components/XilinxSim';
import FlightControl_CalAccel from './components/FlightControl_CalAccel';
import FlightControl_FullAccel from './components/FlightControl_FullAccel';
import FlightControl_Contrast from './components/FlightControl_Contrast';
import FlightControl_DistanceSensors from './components/FlightControl_DistanceSensors';
import Brakes from './components/Brakes';
import Throttles from './components/Throttles';
import Steppers from './components/Steppers';
import DataStreamExample from './components/datasubexample';
import CommConfig from './components/CommConfig';
import DAQ from './components/DAQ';
// import PowerA_Voltage from './components/power/unitA/voltage';
import PowerA_Charger from './components/power/unitA/charger';
import PowerA_RawTemperatures from './components/power/unitA/rawTemps';
import './App.css';

            // <Route path="powerAVoltage" component={PowerA_Voltage} />
class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
        <IndexRoute component={Overview} />
          <Route path="dashboard" component={Overview} />
          <Route path="powerACharger" component={PowerA_Charger} />
          <Route path="powerARawTemps" component={PowerA_RawTemperatures} />
          <Route path="stop" component={Stop} />
          <Route path="lgu" component={LGU} />
          <Route path="XilinxSim" component={XilinxSim} />
          <Route path="FlightControl_FullAccel" component={FlightControl_FullAccel} />
          <Route path="FlightControl_CalAccel" component={FlightControl_CalAccel} />
          <Route path="FlightControl_Contrast" component={FlightControl_Contrast} />
          <Route path="FlightControl_DistanceSensors" component={FlightControl_DistanceSensors} />
          <Route path="throttles" component={Throttles} />
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
