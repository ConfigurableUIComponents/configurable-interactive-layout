import React, { Component } from 'react';

export default class DoubleCounterComponent extends Component {
  render() {
    return (
        [ <div key='ii1'>{ this.props.counter  } </div>,
        <div key='ii2'>{ this.props.counter  } </div> ]
    )
  }
}
