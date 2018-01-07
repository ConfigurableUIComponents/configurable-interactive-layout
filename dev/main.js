// import React from 'react';
import ReactDOM from 'react-dom';
// import ReactGridLayout from './component-one';
// import TestApp from './TestApp';
import ConfigUi from './configurableUI/configurable-ui';
import projectOverviewConfiguration from './projectOverviewConfiguration';
// import './test.scss';

const div = document.createElement('div');
div.setAttribute('id', 'cards-framework-container');
document.body.appendChild(div);

const configUi = new ConfigUi(projectOverviewConfiguration);
const rootElement = configUi.getRootElement();
ReactDOM.render(
  rootElement,
  document.getElementById('cards-framework-container'),
);
