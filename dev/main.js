import React from 'react';
import ReactDOM from 'react-dom';
// import ReactGridLayout from './component-one';
import TestApp from './TestApp';
// import './test.scss';

const div = document.createElement('div');
div.setAttribute('id', 'cards-framework-container');
document.body.appendChild(div);

ReactDOM.render(
  <TestApp />,
  document.getElementById('cards-framework-container'),
);
