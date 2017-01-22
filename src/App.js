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
import FlightControl_NavigationSensors from './components/FlightControl_NavigationSensors';
import LineChart from './components/charts/LineChart';
import D3LineChart from './components/charts/D3LineChart';
import Brakes from './components/Brakes';
import Throttles from './components/Throttles';
import Steppers from './components/Steppers';
import DataStreamExample from './components/datasubexample';
import CommConfig from './components/CommConfig';
import DAQ from './components/DAQ';
import Charging from './components/power/Charging';
import PowerA_RawTemperatures from './components/power/unitA/rawTemps';
import PowerB_RawTemperatures from './components/power/unitB/rawTemps';
import './App.css';

            // <Route path="powerAVoltage" component={PowerA_Voltage} />
class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
        <IndexRoute component={Overview} />
          <Route path="dashboard" component={Overview} />
          <Route path="Charging" component={Charging} />
          <Route path="powerARawTemps" component={PowerA_RawTemperatures} />
          <Route path="powerBRawTemps" component={PowerB_RawTemperatures} />
          <Route path="stop" component={Stop} />
          <Route path="lgu" component={LGU} />
          <Route path="XilinxSim" component={XilinxSim} />
          <Route path="FlightControl_FullAccel" component={FlightControl_FullAccel} />
          <Route path="FlightControl_CalAccel" component={FlightControl_CalAccel} />
          <Route path="FlightControl_Contrast" component={FlightControl_Contrast} />
          <Route path="FlightControl_NavigationSensors" component={FlightControl_NavigationSensors} />
          <Route path="throttles" component={Throttles} />
          <Route path="LineChart" component={LineChart} />
          <Route path="D3LineChart" component={D3LineChart} />
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
