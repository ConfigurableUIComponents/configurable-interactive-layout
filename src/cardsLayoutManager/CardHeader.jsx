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
    actions = this.buildActions();

    return (
      <div className="header">
        <div className="title" title={this.props.title}>{this.props.title}</div>
        {actions.length > 0 ? <div className="actions">{ actions }</div> : null}
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
