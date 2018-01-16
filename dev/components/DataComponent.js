import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class DataComponent extends Component {
  render() {
    console.log('DataComponent render');
    return (<div>{this.props.store.dataValue}</div>);
  }
}
