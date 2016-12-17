import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import MainLayout from './components/containers/MainLayout';
import Overview from './components/Overview';
import Stop from './components/Stop';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={Overview} />
            <Route path="dashboard" component={Overview} />
          </Route>
          <Route path="/stop" component={MainLayout}>
            <IndexRoute component={Stop} />
            <Route path="stop" component={Stop} />
          </Route>
      </Router>
    );
  }
}

export default App;
