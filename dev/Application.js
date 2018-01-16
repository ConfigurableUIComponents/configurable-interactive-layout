import React, { Component } from 'react';
import ConfigUi from './configurableUI/configurable-ui';
import EventManager from './eventManager/EventManager';
// import { deepAddToProps } from './configurableUI/utils';
import { getProjectOverviewConfiguration } from './configurations/configurationStore';
import store from './applicationStore';
import { observer } from 'mobx-react';

// const eventManager = new EventManager();
// deepAddToProps(cardLayoutProperties, 'eventManager', eventManager);


// const configUi = new ConfigUi(cardLayoutProperties);


@observer
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
      <div> data field in application state: { store.data } </div>
      { projectOverviewLayoutView.getRootElement() }
      <div> another div not rendering through configurable UI </div>
    </div>)
  };
}

