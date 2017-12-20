import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }
  onActionMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
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

      const divStyle = action.iconURL ? {
        background: `url('${action.iconURL}') no-repeat center center`,
      } : '{}';
      return (
        <div key={action.id} title={action.displayName} onClick={onClickAction} onKeyUp={onClickAction} tabIndex="0" style={divStyle} role="button">
          {action.id}
        </div>
      );
    });

    return actions;
  }

  render() {
    let actions = [];
    actions = this.buildActions();
    const actionItemsClassName = `action-items ${this.state.menuOpen ? '' : 'dispnone'}`;
    const actionsMenuClassName = `actions-menu ${this.state.menuOpen ? 'expanded' : 'collapsed'}`;
    return (
      <div className="header">
        {actions.length > 0 ?
          <div className="actions">
            <div
              className={actionsMenuClassName}
              onClick={() => this.onActionMenuClick()}
              onKeyUp={() => this.onActionMenuClick()}
              role="button"
              tabIndex={0}
            />
            <div className={actionItemsClassName}>{ actions }</div>
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
