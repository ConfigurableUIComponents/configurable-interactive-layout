import React, { Component } from 'react';
import ConfigUi from './configurableUI/configurable-ui';
import EventManager from './eventManager/EventManager';
// import { deepAddToProps } from './configurableUI/utils';
import { getProjectOverviewConfiguration } from './configurations/configurationStore';
import store from './applicationStore';

// const eventManager = new EventManager();
// deepAddToProps(cardLayoutProperties, 'eventManager', eventManager);


// const configUi = new ConfigUi(cardLayoutProperties);


export default class Application extends Component {

  constructor(props){
    super(props);
    setInterval(() => {
      store.incrementData()
    }, 1000);
  }

  render() {
    console.log('render Application');
    const projectOverviewLayoutConfiguration = getProjectOverviewConfiguration({ store: store });
    const projectOverviewLayoutView = new ConfigUi(projectOverviewLayoutConfiguration);
    return (<div>
      { projectOverviewLayoutView.getRootElement() }
      <div> div not rendering through configurable UI </div>
    </div>)
  };
}

