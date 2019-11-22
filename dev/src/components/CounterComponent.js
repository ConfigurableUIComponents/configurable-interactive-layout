import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CounterComponent extends Component {
  componentWillMount() {
    console.log('counter component mounted');
  }

  render() {
    return (
      <div>
        { this.props.counter }
        {' '}
      </div>
    );
  }
}

CounterComponent.propTypes = {
  counter: PropTypes.number,
};

export default CounterComponent;
