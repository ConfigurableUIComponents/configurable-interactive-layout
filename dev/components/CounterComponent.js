import React, { Component } from 'react';

export default class CounterComponent extends Component {

  componentWillMount(){
    console.log('counter component mounted')
  }

  render() {
    return (<div>{ this.props.counter } </div>);
  }
}
