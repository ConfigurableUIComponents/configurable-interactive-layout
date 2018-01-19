import React, { Component } from 'react';

export default class CounterComponent extends Component {
  render() {
    return (<div>{ this.props.counter } </div>);
  }
}
