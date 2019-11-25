import React, { Component } from 'react';

import PropTypes from 'prop-types';

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
  counter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DoubleCounterComponent;
