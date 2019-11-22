import React, { Component } from 'react';

import T from 'prop-types';

class DoubleCounterComponent extends Component {
  render() {
    return ([
      <div key="ii1">
        { this.props.counter }
        {' '}
      </div>,
      <div key="ii2">
        { this.props.counter }
        {' '}
      </div>,
    ]);
  }
}

DoubleCounterComponent.propTypes = {
  counter: T.oneOfType([T.string, T.number]),
};

export default DoubleCounterComponent;
