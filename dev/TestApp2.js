/* eslint-disable */

import React, { Component } from 'react';

export default class ProjectOverviewApp extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}
