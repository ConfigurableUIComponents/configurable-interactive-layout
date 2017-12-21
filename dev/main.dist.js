import React from 'react';
import ReactDOM from 'react-dom';
// import ReactGridLayout from './component-one';
import TestApp from './App.dist';
import '../dist/cards-framework.css';

const div = document.createElement('div');
div.setAttribute('id', 'cards-freamwork-container');
document.body.appendChild(div);

ReactDOM.render(
  <TestApp />,
  document.getElementById('cards-freamwork-container'),
);
