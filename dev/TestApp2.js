/* eslint-disable */

import React, { Component } from 'react';

export default class LironApp extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}
