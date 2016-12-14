import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import MainLayout from './components/containers/MainLayout';
import Overview from './components/Overview';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
  console.log(MainLayout)
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={Overview} />
          <Route path="dashboard" component={Overview} />
        </Route>
      </Router>
    );
  }
}

export default App;
