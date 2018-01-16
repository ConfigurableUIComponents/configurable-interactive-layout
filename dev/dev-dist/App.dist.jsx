import React, { Component } from 'react';
import EventManager from '../eventManager/EventManager';
import { CardsLayoutManager, Card } from '../../dist/CardsLayoutManager.dist';
import cardLayoutProperties from '../configurableUI/layout-properties';
import Store from '../store';

function multiplyByTwoEvent() {
  const doubleValues = Store.card2Data.values.map((row) => {
    const obj = {};
    obj.x = row.x;
    obj.y = row.y * 2;
    return obj;
  });
  Store.setCard2DataValues(doubleValues);
}

export default class TestApp extends Component {
  constructor(props) {
    super(props);
    this.eventManager = new EventManager();
  }

  componentWillMount() {
    this.eventManager.subscribe('MulBy2', multiplyByTwoEvent);
  }

  render() {
    const card = Card;
    console.log(card);
    return (
      <div>
        <div className="app-header">
          <h1>Layout Manager Test Application</h1>
          <CardsLayoutManager
            content={cardLayoutProperties}
            store={Store}
            EventManager={this.eventManager}
          />
        </div>
      </div>
    );
  }
}
