import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';

describe('App Test Suite', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('has a valid State component',  () => {  
    console.log(<App />);
  })
})
