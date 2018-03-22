import React, { Component } from 'react';
import LayoutManager from '../src/interactiveLayout/InteractiveLayout';
import { cardsConfiguration } from './configurations/basic/cards-configurations';
import { layoutConfiguration } from './configurations/basic/layout-configuration';
import CounterComponent from './components/CounterComponent';
import DoubleCounterComponent from './components/DoubleCounterComponent';
import DescriptionComponent from './components/DescriptionComponent';
import Card from '../src/Components/Card/Card';
import IframeCard from '../src/Components/InteractiveIframe/iframeCard';
import EventManager from './eventManager/EventManager';
import params from './configurations/mockData/paramsMock';

export default class Application extends Component {

  constructor(props){
    super(props);
    this.eventManager = new EventManager();
    this.eventManager.subscribe('multiplyByMinus', (event) => {
      console.log('event mutliplyByMinus', event);
      this.setCounterValue(this.state.counter * -1)
    });
    this.state = {
      counter: 0,
      selectedView: "defaultView",
      cardsConfiguration: cardsConfiguration,
    };
  }

  addCard = () => {
      const cardsConfiguration = this.state.cardsConfiguration;
      cardsConfiguration[this.state.selectedView].cardsOrder.push('actionsWithTitleDescriptionCard');
      this.setState({cardsConfiguration});
      console.log("done set state");
  };

  removeCard = () => {
      const cardsConfiguration = this.state.cardsConfiguration;
      cardsConfiguration[this.state.selectedView].cardsOrder = ['counterCard', 'actionsDescriptionCard', 'doubleCounterCard', 'titleDescriptionCard'];
      this.setState({cardsConfiguration});
      console.log("done set state");
  }

  onLayoutChange(cardsOrder) {
    const newCardsConfiguration = this.state.cardsConfiguration;
    newCardsConfiguration[this.state.selectedView].cardsOrder = cardsOrder;
    this.setState({
      cardsConfiguration: newCardsConfiguration,
    });
  }

  setCounterValue(value) {
    this.setState({counter: value}, () => {
      // triggering an event for the iframe scenario
      this.eventManager.trigger('counterUpdated', 'app', { counter: this.state.counter });
    });
  }

  render() {
    const cardsConfig = cardsConfiguration[this.state.selectedView];
    return (
      <div>
        <div className="app-header">
          <h1>Layout Manager Test Application</h1>
          <button onClick={this.addCard}> Add Card </button>
          <button onClick={this.removeCard}> Remove Card </button>
          <LayoutManager
              cardsConfiguration={cardsConfig}
              layoutConfiguration={ layoutConfiguration }
              onLayoutChange={this.onLayoutChange.bind(this)} >
            <Card configId="counterCard">
              <CounterComponent counter={this.state.counter} />
            </Card>
            <Card configId="doubleCounterCard">
              <DoubleCounterComponent counter={this.state.counter} />
            </Card>
            <Card configId="titleDescriptionCard" title="Card with title">
              <DescriptionComponent title={true} />
            </Card>
            <Card
                configId="actionsDescriptionCard"
                actions={
                  [{
                    id: 'action1',
                    displayName: 'restart counter',
                    iconURL: 'icons/trashbin.svg',
                    iconURLHover: 'icons/trashbin_hover.svg',
                    onClick: (actionId) => { this.setCounterValue(0) },
                  }]
                }
            >
              <DescriptionComponent actions={true} description={"hover the top right corner & click the action to restart the counter"} />
            </Card>
            <Card
                configId="actionsWithTitleDescriptionCard"
                title={"Card with actions and title"}
                actions={
                  [{
                    id: 'action1',
                    displayName: 'restart counter',
                    iconURL: 'icons/trashbin.svg',
                    iconURLHover: 'icons/trashbin_hover.svg',
                    onClick: (actionId) => { this.setCounterValue(0) },
                  },
                  {
                    id: 'action2',
                    displayName: 'multiply counter',
                    iconURL: 'icons/see_all.svg',
                    iconURLHover: 'icons/see_all_hover.svg',
                    onClick: (actionId) => { this.setCounterValue(this.state.counter * 100) },
                  }]
                }
            >
              <DescriptionComponent title={true} actions={true}
                                    description={"one action will restart the counter, second will multiple by 100"} />
            </Card>
            <DescriptionComponent configId={"notAcard"} description={"This is not a card"} />

            {/*<IframeCard configId={"iframeNoTitleNoActionsNoEvents"} params={params} url={"${amdocsServer}.${userId}.com"} />*/}
            {/*<IframeCard configId={"iframeWithActions"} url={"http://adoring-kilby-eb53b2.bitballoon.com/"}*/}
                        {/*actions={*/}
                          {/*[{*/}
                            {/*id: 'action1',*/}
                            {/*displayName: 'restart counter',*/}
                            {/*iconURL: 'icons/trashbin.svg',*/}
                            {/*iconURLHover: 'icons/trashbin_hover.svg',*/}
                            {/*onClick: (actionId) => { this.setCounterValue(0) },*/}
                          {/*}]*/}
                        {/*} />*/}
            {/*<IframeCard configId={"iframeWithTitleAndActions"} url={"http://practical-meitner-c0a310.bitballoon.com/"}*/}
                        {/*title={"iframe with title & actions"}*/}
                        {/*actions={*/}
                          {/*[{*/}
                            {/*id: 'action1',*/}
                            {/*displayName: 'restart counter',*/}
                            {/*iconURL: 'icons/trashbin.svg',*/}
                            {/*iconURLHover: 'icons/trashbin_hover.svg',*/}
                            {/*onClick: (actionId) => { this.setCounterValue(0) },*/}
                          {/*},*/}
                            {/*{*/}
                              {/*id: 'action2',*/}
                              {/*displayName: 'multiply counter',*/}
                              {/*iconURL: 'icons/see_all.svg',*/}
                              {/*iconURLHover: 'icons/see_all_hover.svg',*/}
                              {/*onClick: (actionId) => { this.setCounterValue( this.state.counter * 200 )},*/}
                            {/*}]*/}
                        {/*} />*/}
            {/*<IframeCard title={"iframe with title & actions & events"}*/}
                        {/*configId={"iframeWithTitleAndActionsAndEvents"} url={"http://wonderful-borg-b320ed.bitballoon.com/"}*/}
                        {/*eventIds={['counterUpdated']}*/}
                        {/*eventManager={this.eventManager}*/}
                        {/*actions={*/}
                          {/*[{*/}
                            {/*id: 'action1',*/}
                            {/*displayName: 'restart counter',*/}
                            {/*iconURL: 'icons/trashbin.svg',*/}
                            {/*iconURLHover: 'icons/trashbin_hover.svg',*/}
                            {/*onClick: (actionId) => { this.setCounterValue(0) },*/}
                          {/*}]*/}
                        {/*} />*/}
          </LayoutManager>
        </div>
      </div>
    );
  }
}
