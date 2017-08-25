import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import APP_ROUTES from './routes';
import './App.css';

class App extends Component {
  render () {
    return (
      <Router key={Math.random()} history={browserHistory} routes={APP_ROUTES} />
    );
  }
}
export default App;
