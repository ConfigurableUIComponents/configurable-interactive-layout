import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardHeader extends Component {
  onActionMenuClick() {
    console.log(`hi${this}`);
  }

  assignOnClickAction(action) {
    let onClickAction = action.onClick;
    if (onClickAction === undefined) {
      onClickAction = this.publishActionEvent;
    }

    return onClickAction.bind(this, action.id);
  }

  publishActionEvent(actionId) {
    this.props.EventManager.publish(actionId, this.props.id, {});
  }

  buildActions() {
    const actions = this.props.actions.map((action) => {
      let onClickAction = this.assignOnClickAction(action);
      onClickAction = onClickAction.bind(this, action);
      return (
        <button key={action.id} onClick={onClickAction}>
          {action.id}
        </button>
      );
    });

    return actions;
  }

  render() {
    let actions = [];
    actions = this.buildActions();

    return (
      <div className="header">
        {actions.length > 0 ?
          <div className="actions">
            <div
              className="actions-hit-area collapse"
              onClick={() => this.onActionMenuClick}
              onKeyUp={this.onActionMenuClick}
              role="button"
              tabIndex={0}
            />
            { actions }
          </div> : null}
        <div className="title" title={this.props.title}>{this.props.title}</div>
      </div>);
  }
}

CardHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
  })),
  EventManager: PropTypes.instanceOf(Object),
};

CardHeader.defaultProps = {
  // title: '',
  actions: [],
  EventManager: undefined,
};
