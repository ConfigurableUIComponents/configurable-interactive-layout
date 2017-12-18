import React, { Component } from 'react';
import EventManager from '../src/eventManager/EventManager';
import LayoutManager from '../src/cardsLayoutManager/CardsLayoutManager';
import cardLayoutProperties from './layout-properties';

function injectDataIntoConfig(properties, data2Merge) {
  const mergedConfig = [];
  for (let index = 0; index < properties.length; index += 1) {
    const property = properties[index];
    if (index === 1) {
      property.data = data2Merge;
    }
    mergedConfig.push(property);
  }
  return mergedConfig;
}

export default class TestApp extends Component {
  constructor(props) {
    super(props);
    this.eventManager = new EventManager();
    this.state = {
      card2Data: {
        values: [
          { x: 'X', y: 30 },
          { x: 'Y', y: 20 },
          { x: 'Z', y: 45 },
        ],
        xAxisAttrName: 'x',
        yAxisAttrName: 'y',
        yAxisLabel: 'Count',
      },
    };
    this.multiplyByTwoEvent = this.multiplyByTwoEvent.bind(this);
  }

  componentWillMount() {
    this.eventManager.subscribe('MulBy2', this.multiplyByTwoEvent);
  }

  multiplyByTwoEvent() {
    const doubleValues = this.state.card2Data.values.map((row) => {
      const obj = {};
      obj.x = row.x;
      obj.y = row.y * 2;
      return obj;
    });
    this.setState({
      card2Data: {
        values: doubleValues,
        xAxisAttrName: this.state.card2Data.xAxisAttrName,
        yAxisAttrName: this.state.card2Data.yAxisAttrName,
        yAxisLabel: this.state.card2Data.yAxisLabel,
      },
    });
  }

  render() {
    const mergedProperties =
      injectDataIntoConfig(cardLayoutProperties, this.state.card2Data);

    return (
      <div>
        <div className="app-header">
          <h1>Layout Manager Test Application</h1>
          <LayoutManager
            content={mergedProperties}
            EventManager={this.eventManager}
          />
        </div>
      </div>
    );
  }
}
