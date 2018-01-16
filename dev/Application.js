import React, { Component } from 'react';
import ConfigUi from './configurableUI/configurable-ui';
import EventManager from './eventManager/EventManager';
// import { deepAddToProps } from './configurableUI/utils';
import { getProjectOverviewConfiguration, getRegistrationFormConfiguration } from './configurations/configurationStore';
import store from './applicationStore';
import registrationFormStore from './registrationFormStore';
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

    const registrationForm = getRegistrationFormConfiguration({ store: registrationFormStore });
    const registrationFormView = new ConfigUi(registrationForm);
    return (<div>
      { projectOverviewLayoutView.getRootElement() }
      <div> div not rendering through configurable UI </div>
      { registrationFormView.getRootElement() }
      <div>{registrationFormStore.getRegistrationField('name')}</div>
      <div>{registrationFormStore.getRegistrationField('address')}</div>
    </div>)
  };
}

