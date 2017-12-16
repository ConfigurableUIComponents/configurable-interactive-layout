import React, { Component } from 'react';

import LayoutManager from '../src/cardsLayoutManager/CardsLayoutManager';
import cardLayoutProperties from './layout-properties';

export default class TestApp extends Component {
  render() {
    return (
      <div>
        <div className="app-header">
          <h1>Layout Manager Test Application</h1>
          <LayoutManager content={cardLayoutProperties} />
        </div>
      </div>
    );
  }
}
