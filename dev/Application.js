import React, { Component } from 'react';
import ConfigUi from './configurableUI/configurable-ui';
import EventManager from './eventManager/EventManager';
// import { deepAddToProps } from './configurableUI/utils';
import { getProjectOverviewConfiguration } from './configurations/configurationStore';

// const eventManager = new EventManager();
// deepAddToProps(cardLayoutProperties, 'eventManager', eventManager);


// const configUi = new ConfigUi(cardLayoutProperties);


export default class Application extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: 0
    }
    setInterval(() => {
      this.setState({data: ++this.state.data})
    }, 1000);
  }

  render() {
    console.log('render application');
    const projectOverviewLayoutConfiguration = getProjectOverviewConfiguration({ data: this.state.data });
    const projectOverviewLayoutView = new ConfigUi(projectOverviewLayoutConfiguration);

    return (<div>
      { projectOverviewLayoutView.getRootElement() }
      <div> div not rendering through configurable UI </div>
    </div>)
  };
}

