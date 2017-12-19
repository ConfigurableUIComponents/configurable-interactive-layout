import React from 'react';
import ReactDOM from 'react-dom';
import TestApp from './TestApp';

const div = document.createElement('div');
div.setAttribute('id', 'cards-freamwork-container');
document.body.appendChild(div);

ReactDOM.render(
  <TestApp />,
  document.getElementById('cards-freamwork-container'),
);
