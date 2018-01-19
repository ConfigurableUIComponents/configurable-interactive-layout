import React, { Component } from 'react';

export default class DoubleCounterComponent extends Component {
  render() {
    return (
        [ <div key="1">{ this.props.counter  } </div>,
        <div key="2">{ this.props.counter  } </div> ]
    )
  }
}
