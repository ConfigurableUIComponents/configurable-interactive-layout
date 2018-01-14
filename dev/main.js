// import React from 'react';
import ReactDOM from 'react-dom';
// import cloneDeep from 'lodash/cloneDeep';
// import ReactGridLayout from './component-one';
// import TestApp from './TestApp';
import ConfigUi from './configurableUI/configurable-ui';
// import projectOverviewConfiguration from './projectOverviewConfiguration';
import cardLayoutProperties from './layout-properties';
import EventManager from './eventManager/EventManager';


// import './test.scss';

const div = document.createElement('div');
div.setAttribute('id', 'cards-framework-container');
document.body.appendChild(div);

const deepAddToProps = function (elementConfig, attribute, value) {
  const currConfig = elementConfig;
  if (!currConfig.props) {
    currConfig.props = {};
  }
  currConfig.props[attribute] = value;
  if (currConfig.children) {
    const currChildren = Object.values(currConfig.children);
    currChildren.forEach((child) => {
      deepAddToProps(child, attribute, value);
    });
  }
};

const eventManager = new EventManager();
deepAddToProps(cardLayoutProperties, 'eventManager', eventManager);
console.log(cardLayoutProperties);

const configUi = new ConfigUi(cardLayoutProperties);
const rootElement = configUi.getRootElement();
ReactDOM.render(
  rootElement,
  document.getElementById('cards-framework-container'),
);
