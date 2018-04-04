import React, { Component } from 'react';
import LayoutManager from '../src/Layout/Layout';
import { cardsConfiguration } from './configurations/basic/cards-configurations';
import { personalizedCardsConfiguration } from './configurations/basic/personalized-configurations';
import { layoutConfiguration } from './configurations/basic/layout-configuration';
import CounterComponent from './components/CounterComponent';
import DoubleCounterComponent from './components/DoubleCounterComponent';
import DescriptionComponent from './components/DescriptionComponent';
import Card from '../src/Card/Card';
import IframeCard from '../src/InteractiveIframe/iframeCard';
import EventManager from './eventManager/EventManager';
import params from './configurations/mockData/paramsMock';
import cloneDeep from 'lodash/cloneDeep';
import { addCardInNewRow, removeCard } from '../src/Layout/layoutUtils';

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
      cardsConfiguration: cardsConfiguration,
    };
  }

  addCard = () => {
      const cardsConfiguration = this.state.cardsConfiguration;
      const card =
          {
            id: 'doubleCounterCard',
            configuration: {
              lg: {w: 12, h: 2,},
              md: {w: 6, h: 2,},
              sm: {w: 4, h: 2,},
            }
          }
      const newConfiguration = addCardInNewRow(cardsConfiguration, card);
      this.setState({cardsConfiguration: newConfiguration});
  };

  removeCardFromLayout = () => {
    const cardsConfiguration = this.state.cardsConfiguration;
    const newConfiguration = removeCard(cardsConfiguration, 'counterCard');
    this.setState({cardsConfiguration: newConfiguration})
  }

  onLayoutChange = (updatedCards) => {
    console.log('application will save this personalized layout', updatedCards);
    const cardsConfiguration = cloneDeep(this.state.cardsConfiguration);
    cardsConfiguration.cards = cloneDeep(updatedCards);
    this.setState({cardsConfiguration});
  }

  setCounterValue(value) {
    this.setState({counter: value}, () => {
      // triggering an event for the iframe scenario
      this.eventManager.trigger('counterUpdated', 'app', { counter: this.state.counter });
    });
  }

  render() {
    return (
      <div>
        <div className="app-header">
          <h1>Layout Manager Test Application</h1>
          <button onClick={this.addCard}> Add Card </button>
          <button onClick={this.removeCardFromLayout}> Remove Card </button>
          <LayoutManager
              cardsConfiguration={this.state.cardsConfiguration}
              layoutConfiguration={ layoutConfiguration }
              onLayoutChange={this.onLayoutChange.bind(this)} >
            <Card isNewCard={true} configId="counterCard">
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
                actions={{
                  'action1' : {

                    displayName: 'restart counter',
                    iconURL: 'icons/trashbin.svg',
                    iconURLHover: 'icons/trashbin_hover.svg',
                    onClick: () => { this.setCounterValue(0) },
                  }
                }}
            >
              <DescriptionComponent actions={true} description={"hover the top right corner & click the action to restart the counter"} />
            </Card>
            <Card
                configId="actionsWithTitleDescriptionCard"
                title={"Card with actions and title"}
                actions={
                  {action1: {
                    displayName: 'restart counter',
                    iconURL: 'icons/trashbin.svg',
                    iconURLHover: 'icons/trashbin_hover.svg',
                    onClick: () => { this.setCounterValue(0) },
                  },
                    action2: {
                    displayName: 'multiply counter',
                    iconURL: 'icons/see_all.svg',
                    iconURLHover: 'icons/see_all_hover.svg',
                    onClick: () => { this.setCounterValue(this.state.counter * 100) },
                  }
                }}
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
