import React, { Component } from 'react';

export default class DataComponent extends Component {
  render() {
    console.log('render Data Component');
    return (<div>{this.props.data}</div>);
  }
}
