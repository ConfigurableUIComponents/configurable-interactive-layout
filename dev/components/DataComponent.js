import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class DataComponent extends Component {
  render() {
    return (<div>{this.props.store.data}</div>);
  }
}
