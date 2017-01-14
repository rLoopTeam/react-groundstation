import React from 'react';
import ReactDOM from 'react-dom';
import Throttles from '../../../src/components/Throttles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Throttles />, 
      div
    );
});
