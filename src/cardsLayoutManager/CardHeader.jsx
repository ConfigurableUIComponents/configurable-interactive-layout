import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_ACTION_ICON = 'SV_ANN.svg';

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
    this.props.eventManager.publish(actionId, this.props.id, {});
  }

  buildActions() {
    const actions = this.props.actions.map((action) => {
      let onClickAction = this.assignOnClickAction(action);
      onClickAction = onClickAction.bind(this, action);
      if (!action.iconURL && !action.displayName) {
        return null;
      }

      const actionIcon = action.iconURL ? action.iconURL : DEFAULT_ACTION_ICON;

      const divStyle = { background: `url('${actionIcon}') no-repeat center center` };
      return (
        <div className="action-item" style={divStyle} title={action.displayName} key={action.id} onClick={onClickAction} onKeyUp={onClickAction} tabIndex="0" role="button" />
      );
    });

    return actions;
  }

  createHeaderClassName() {
    let headerClassName = `card-header ${this.props.title ? '' : 'without-title'}`;
    if (this.state.menuOpen) {
      headerClassName += ' menu-open';
    }
    return headerClassName;
  }

  renderActions() {
    let actions = [];
    if (this.props.actions) {
      actions = this.buildActions();
    }

    const actionItemsClassName = `action-items ${this.state.menuOpen ? '' : 'dispnone'}`;
    const actionsMenuClassName = `actions-menu ${this.state.menuOpen ? 'expanded' : 'collapsed'}`;

    if (actions.length > 0) {
      return (
        <div className="actions">
          <div
            className={actionsMenuClassName}
            onClick={() => this.onActionMenuClick()}
            onKeyUp={() => this.onActionMenuClick()}
            role="button"
            tabIndex={0}
          />
          <div className={actionItemsClassName}>{ actions }</div>
        </div>);
    }

    return null;
  }

  render() {
    return (
      <div className={this.createHeaderClassName()}>
        {this.renderActions()}
        {this.props.title ? <div className="title" title={this.props.title}>{this.props.title}</div> : null }
      </div>);
  }
}

CardHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    iconURL: PropTypes.string,
  })),
  eventManager: PropTypes.instanceOf(Object),
};

CardHeader.defaultProps = {
  title: undefined,
  actions: undefined,
  eventManager: undefined,
};
