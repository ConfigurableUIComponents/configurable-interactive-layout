import React from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from './component-one';
import './test.scss';

const div = document.createElement('div');
div.setAttribute('id', 'cards-freamwork-container');
document.body.appendChild(div);

ReactDOM.render(
  <ReactGridLayout />,
  document.getElementById('cards-freamwork-container'),
);
