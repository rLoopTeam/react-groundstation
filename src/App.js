import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import MainLayout from './components/containers/MainLayout';
import Overview from './components/Overview';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={Overview} />
            <Route path="dashboard" component={Overview} />
          </Route>
          <Route path="/websocketTest" component={MainLayout}>
            <IndexRoute component={Overview} />
            <Route path="dashboard" component={Overview} />
          </Route>
      </Router>
    );
  }
}

export default App;
