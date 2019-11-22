import React, { Component } from 'react';
import T from 'prop-types';

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
  counter: T.number,
};

export default CounterComponent;
