import React, { Component } from 'react';

export default class DoubleCounterComponent extends Component {
  render() {
    return (
        [
          <div>{ this.props.title ?  "title should be displayed" : "no title"  } </div>,
          <div>{ this.props.actions ?  "actions are available" : "no actions"  } </div>,
          <br />,
          <div>{ this.props.description ?  this.props.description : ""  } </div>
        ]
    )
  }
}
