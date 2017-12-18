import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../src/cardsLayoutManager/Card';

const DI_DATA = {
  DIChart1: {
    values: [
      { x: 'AB', y: 5 },
      { x: 'CD', y: 16 },
      { x: 'EF', y: 26 },
      { x: 'GH', y: 34 },
      { x: 'IJ', y: 45 },
      { x: 'KL', y: 57 },
      { x: 'MN', y: 72 },
      { x: 'OP', y: 93 },
      { x: 'QR', y: 63 },
      { x: 'ST', y: 42 },
      { x: 'UV', y: 18 },
      { x: 'WX', y: 5 },
      { x: 'YZ', y: 2 },
    ],
    xAxisAttrName: 'x',
    yAxisAttrName: 'y',
    yAxisLabel: 'Count',
  },
  DIChart3: {
    values: [
      { x: 'A', y: 5 },
      { x: 'B', y: 9 },
      { x: 'C', y: 2 },
      { x: 'D', y: 4 },
    ],
    xAxisAttrName: 'x',
    yAxisAttrName: 'y',
    yAxisLabel: 'Count',
  },
};

export default class DataIntegrityCard extends Component {
  constructor(props) {
    super(props);

    this.setState({
      values: [],
      xAxisAttrName: 'X Attribute',
      yAxisAttrName: 'Y Attribute',
      yAxisLabel: 'Y Axis',
    });

    this.divideByTwoEvent = this.divideByTwoEvent.bind(this);
  }

  componentWillMount() {
    // subscribe to listener events
    if (this.props.listeners) {
      for (let index = 0; index < this.props.listeners.length; index += 1) {
        this.props.EventManager.subscribe(this.props.listeners[index].id, this.divideByTwoEvent);
      }
    }

    // initialize data
    if (this.props.dataSource) {
      const data = DI_DATA[this.props.dataSource];
      this.setState({
        values: data.values,
        xAxisAttrName: data.xAxisAttrName,
        yAxisAttrName: data.yAxisAttrName,
        yAxisLabel: data.yAxisLabel,
      });
    } else {
      this.setState({
        values: this.props.data.values,
        xAxisAttrName: this.props.data.xAxisAttrName,
        yAxisAttrName: this.props.data.yAxisAttrName,
        yAxisLabel: this.props.data.yAxisLabel,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.values) {
      this.setState({
        values: nextProps.data.values,
      });
    }
  }

  divideByTwoEvent() {
    const halfValues = this.state.values.map((row) => {
      const obj = {};
      obj.x = row.x;
      obj.y = row.y / 2;
      return obj;
    });
    this.setState({
      values: halfValues,
    });
  }

  render() {
    const GeneratedContent = this.props.Content;
    return (
      <Card {...this.props}>
        <GeneratedContent {...this.state} />
      </Card>
    );
  }
}

DataIntegrityCard.propTypes = {
  id: PropTypes.string.isRequired,
  Content: PropTypes.element.isRequired,
  dataSource: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  listeners: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  EventManager: PropTypes.element,
};

DataIntegrityCard.defaultProps = {
  listeners: [],
  dataSource: undefined,
  data: {},
  EventManager: undefined,
};
