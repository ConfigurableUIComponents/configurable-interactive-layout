import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardHeader extends Component {
  buildActions() {
    const actions = this.props.actions.map(action => (
      <button onClick={() => this.props.EventManager.publish(action.id, this.props.id, {})}>
        {action.id}
      </button>
    ));
    return actions;
  }

  render() {
    let actions = [];
    if (this.props.EventManager) {
      actions = this.buildActions();
    }

    return (
      <div className="header">
        {actions.length > 0 ? <div className="actions">{ actions }</div> : <div />}
        <div className="title" title={this.props.title}>{this.props.title}</div>
      </div>);
  }
}

CardHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
  EventManager: PropTypes.instanceOf(Object),
};

CardHeader.defaultProps = {
  // title: '',
  actions: [],
  EventManager: undefined,
};
