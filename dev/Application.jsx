import React, { Component } from 'react';
import { ConfigurableMenu } from 'configurable-menu';
import LayoutManager from '../src/interactiveLayout/InteractiveLayout';
import { cardsConfiguration } from './configurations/basic/cards-configurations';
import { layoutConfiguration } from './configurations/basic/layout-configuration';
import CounterComponent from './components/CounterComponent';
import DoubleCounterComponent from './components/DoubleCounterComponent';
import DescriptionComponent from './components/DescriptionComponent';
import Card from '../src/Components/Card/Card';
import IframeCard from '../src/Components/InteractiveIframe/iframeCard';
import EventManager from './eventManager/EventManager';
import cloneDeep from 'lodash/cloneDeep';

import '../node_modules/configurable-menu/dist/configurableMenu.css';

const items = [];
const itemNames = [];


export default class Application extends Component {

  constructor(props){
    super(props);

    for(var Element in cardsConfiguration)
    {
      itemNames.push(Element);
    }
     console.log(itemNames);
    for (var i =0 ; i<itemNames.length-1 ;i++) {
      items.push({type:'button',id:itemNames[i],displayName:itemNames[i]})
    }
    var j = itemNames.length;

    items.push({type:'checkbox',id:'jjjj',displayName:'gggg'})

    console.log(items);
    console.log(itemNames);

    this.eventManager = new EventManager();
    this.eventManager.subscribe('multiplyByMinus', (event) => {
      console.log('event mutliplyByMinus', event);
      this.setCounterValue(this.state.counter * -1)
    });
    this.state = {
      counter: 0,
      selectedView: itemNames[1],
      cardsConfiguration: cardsConfiguration,
      selectedItem: { id: itemNames[1] },
      sidebarOpened: true,
    }

  }

  onCloseSidebar = () => {
    this.setState({
      sidebarOpened: false,
    });
  }

  onOpenSidebar = () => {
    this.setState({
      sidebarOpened: true
    });
  }

  onSelectionChange = (data) => {
    this.setState({
      selectedItem: data ,
      selectedView : data.id ,
    }, () => {
      console.log('onSelectionChange', 'item', this.state.selectedItem);
      console.log('onSelectionChange', 'view', this.state.selectedView);
    })
  }

  onLayoutChange(cardsOrder) {
    console.log('onLayoutChange', 'this.state.selectedItem', this.state.selectedItem);
    console.log('onLayoutChange', ' this.state.selectedView',  this.state.selectedView);
    const newCardsConfiguration = JSON.parse(JSON.stringify(this.state.cardsConfiguration));
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
    console.log('render: this.state.selectedView', this.state.selectedView);
    const cardsConfig = cloneDeep(this.state.cardsConfiguration[this.state.selectedView]);
    console.log('cardsConfig', cardsConfig);
    return (

      <div>
        <ConfigurableMenu open={true} title="Views Menu" items={items} selectedItem={this.state.selectedItem} onSelectionChnage={this.onSelectionChange}  />
        <div className="app-header">
          <h1>Layout Manager Test Application</h1>
          <LayoutManager cardsConfiguration={cardsConfig} layoutConfiguration={ layoutConfiguration } onLayoutChange={this.onLayoutChange.bind(this)} >
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

            <IframeCard configId={"iframeNoTitleNoActionsNoEvents"} url={"http://elegant-dijkstra-d03a99.bitballoon.com"} />
            <IframeCard configId={"iframeWithActions"} url={"http://adoring-kilby-eb53b2.bitballoon.com/"}
                        actions={
                          [{
                            id: 'action1',
                            displayName: 'restart counter',
                            iconURL: 'icons/trashbin.svg',
                            iconURLHover: 'icons/trashbin_hover.svg',
                            onClick: (actionId) => { this.setCounterValue(0) },
                          }]
                        } />
            <IframeCard configId={"iframeWithTitleAndActions"} url={"http://practical-meitner-c0a310.bitballoon.com/"}
                        title={"iframe with title & actions"}
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
                              onClick: (actionId) => { this.setCounterValue( this.state.counter * 200 )},
                            }]
                        } />
            <IframeCard configId={"iframeWithTitleAndActionsAndEvents"} url={"http://wonderful-borg-b320ed.bitballoon.com/"}
                        title={"iframe with title & actions & events"}
                        eventIds={['counterUpdated']}
                        eventManager={this.eventManager}
                        actions={
                          [{
                            id: 'action1',
                            displayName: 'restart counter',
                            iconURL: 'icons/trashbin.svg',
                            iconURLHover: 'icons/trashbin_hover.svg',
                            onClick: (actionId) => { this.setCounterValue(0) },
                          }]
                        } />
          </LayoutManager>
        </div>
      </div>
    );
  }
}
