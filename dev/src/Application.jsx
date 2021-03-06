import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import LayoutManager from '../../src/Layout/Layout';
import { personalizedCardsConfiguration } from './configurations/basic/personalized-configurations';
import { layoutConfiguration } from './configurations/basic/layout-configuration';
import CounterComponent from './components/CounterComponent';
import DoubleCounterComponent from './components/DoubleCounterComponent';
import DescriptionComponent from './components/DescriptionComponent';
import Card from '../../src/Card/Card';
import IFrameCard from '../../src/InteractiveIframe/iframeCard';
import EventManager from './eventManager/EventManager';
import { addCardInNewRow, removeCard } from '../../src/Layout/layoutUtils';

import ThemeStyle from './ThemeStyle.scss';
import PlaceholderText from '../../src/PlaceholderText';


const re = /\$\{(.*?)\}/g;
const placeholder = <PlaceholderText text="components ${count}" regex={re} />;
export default class Application extends Component {
  constructor(props) {
    super(props);
    this.eventManager = new EventManager();
    this.eventManager.subscribe('multiplyByMinus', (event) => {
      console.log('event mutliplyByMinus', event);
      this.setCounterValue(this.state.counter * -1);
    });
    this.state = {
      counter: 0,
      cardsConfiguration: personalizedCardsConfiguration,
    };
  }

  onLayoutChange = (updatedCards) => {
    /* eslint-disable react/no-access-state-in-setstate */
    console.log('application will save this personalized layout', updatedCards);
    const cardsConfiguration = cloneDeep(this.state.cardsConfiguration);
    cardsConfiguration.cards = cloneDeep(updatedCards);
    this.setState({ cardsConfiguration });
    /* eslint-enable react/no-access-state-in-setstate */
  }

  setCounterValue(value) {
    this.setState({ counter: value }, () => {
      // triggering an event for the iframe scenario
      this.eventManager.trigger('counterUpdated', 'app', { counter: this.state.counter });
    });
  }

  removeCardFromLayout = () => {
    const { cardsConfiguration } = this.state;
    const newConfiguration = removeCard(cardsConfiguration, 'counterCard');
    this.setState({ cardsConfiguration: newConfiguration });
  }

  addCard = () => {
    const { cardsConfiguration } = this.state;
    const card = {
      id: 'doubleCounterCard',
      configuration: {
        lg: { w: 12, h: 2 },
        md: { w: 6, h: 2 },
        sm: { w: 4, h: 2 },
      },
    };
    const newConfiguration = addCardInNewRow(cardsConfiguration, card);
    this.setState({ cardsConfiguration: newConfiguration });
  };

  render() {
    const externalProps = { screenId: 371516559 };
    const iframeURL = 'https://amdocsil.invisionapp.com/share/WRSRHDQJAC8#/screens/${screenId}'; // eslint-disable-line
    return (
      <div>
        <div className="app-header">
          <h1>Layout Manager Test Application</h1>
          <button type="button" onClick={this.addCard}> Add Card </button>
          <button type="button" onClick={this.removeCardFromLayout}> Remove Card </button>
        </div>
        <LayoutManager
          cardsConfiguration={this.state.cardsConfiguration}
          layoutConfiguration={layoutConfiguration}
          onLayoutChange={this.onLayoutChange}
          theme={ThemeStyle}
        >
          <IFrameCard
            title="My Iframe Card"
            configId="iframeNoTitleNoActionsNoEvents"
            theme={ThemeStyle}
            externalProps={externalProps}
            url={iframeURL}
          />
          <Card
            isNewCard
            configId="counterCard"
            title={placeholder}
            theme={ThemeStyle}
            actions={{
              action1: {

                displayName: 'restart counter',
                iconURL: 'icons/trashbin.svg',
                iconURLHover: 'icons/trashbin_hover.svg',
                onClick: () => { this.setCounterValue(0); },
              },
            }}
          >
            <CounterComponent counter={this.state.counter} />
          </Card>
          <Card configId="doubleCounterCard" cardCssClass="transparent">
            <DoubleCounterComponent counter={this.state.counter} />
          </Card>
          <Card configId="titleDescriptionCard" title="Card with title">
            <DescriptionComponent title />
          </Card>
          <Card
            configId="actionsDescriptionCard"
            actions={{
              action1: {

                displayName: 'restart counter',
                iconURL: 'icons/trashbin.svg',
                iconURLHover: 'icons/trashbin_hover.svg',
                onClick: () => { this.setCounterValue(0); },
              },
            }}
          >
            <DescriptionComponent actions description="hover the top right corner & click the action to restart the counter" />
          </Card>
          <Card
            configId="actionsWithTitleDescriptionCard"
            title="Card with actions and title"
            actions={
                      {
                        action1: {
                          displayName: 'restart counter',
                          iconURL: 'icons/trashbin.svg',
                          iconURLHover: 'icons/trashbin_hover.svg',
                          onClick: () => { this.setCounterValue(0); },
                        },
                        action2: {
                          displayName: 'multiply counter',
                          iconURL: 'icons/see_all.svg',
                          iconURLHover: 'icons/see_all_hover.svg',
                          onClick: () => { this.setCounterValue(this.state.counter * 100); },
                        },
                      }}
          >
            <DescriptionComponent
              title
              actions
              description="one action will restart the counter, second will multiple by 100"
            />
          </Card>
          <DescriptionComponent configId="notAcard" description="This is not a card" />
        </LayoutManager>
      </div>
    );
  }
}
