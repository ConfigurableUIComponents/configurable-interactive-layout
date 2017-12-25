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

      // const divStyle = action.iconURL ? {
      //   background: `url('${action.iconURL}') no-repeat center center`,
      // } : '{}';
      return (
        // style={divStyle}
        <div className="action-item" title={action.displayName} key={action.id} onClick={onClickAction} onKeyUp={onClickAction} tabIndex="0" role="button">
          <img alt={action.displayName} src={action.iconURL} />

        </div>
      );
    });

    return actions;
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
    if (!this.props.title && !this.props.actions) {
      return null;
    }

    const headerClassName = `header ${this.props.title ? 'with-title' : 'without-title'}`;

    return (
      <div className={headerClassName}>
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
  EventManager: PropTypes.instanceOf(Object),
};

CardHeader.defaultProps = {
  title: undefined,
  actions: undefined,
  EventManager: undefined,
};
