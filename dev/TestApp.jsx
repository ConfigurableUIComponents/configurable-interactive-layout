import React, { Component } from 'react';
import EventManager from '../src/eventManager/EventManager';
import LayoutManager from '../src/cardsLayoutManager/CardsLayoutManager';
import cardLayoutProperties from './layout-properties';
import Store from './store';

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
    return (
      <div>
        <div className="app-header">
          <h1>Layout Manager Test Application</h1>
          <LayoutManager
            content={cardLayoutProperties}
            store={Store}
            EventManager={this.eventManager}
          />
        </div>
      </div>
    );
  }
}
