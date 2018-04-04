import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardActionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.action = this.props.action;
    this.onClickAction = this.assignOnClickAction();
  }
  onMouseItem(hover) {
    this.setState({ hover });
  }

  getActionIconURL() {
    const itemHover = this.state.hover;
    if (!itemHover && this.action.iconURL) {
      return this.action.iconURL;
    }
    if (itemHover && this.action.iconURLHover) {
      return this.action.iconURLHover;
    }
    if (itemHover && this.action.iconURLHover === undefined && this.action.iconURL) {
      return this.action.iconURL;
    }
    return this.props.defaultIcon;
  }

  assignOnClickAction() {
    let onClickAction = this.action.onClick;
    if (onClickAction === undefined) {
      onClickAction = this.publishActionEvent;
    }
    return onClickAction.bind(this, this.action.id);
  }

  publishActionEvent(actionId) {
    this.props.eventManager.publish(actionId, this.props.cardId, {});
  }
  render() {
    let { onClickAction } = this;
    onClickAction = onClickAction.bind(this, this.action);
    const actionIcon = this.getActionIconURL();
    // const divStyle = { background: `url('${actionIcon}') no-repeat center center` };
    return (
      <div
        className="card-action-item"
        title={this.action.displayName}
        key={this.action.id}
        onClick={onClickAction}
        onKeyUp={onClickAction}
        tabIndex="0"
        role="button"
        onMouseOver={() => this.onMouseItem(true)}
        onFocus={() => this.onMouseItem(true)}
        onMouseOut={() => this.onMouseItem(false)}
        onBlur={() => this.onMouseItem(false)}
      >
        <img src={actionIcon} alt={this.action.displayName} />
      </div>
    );
  }
}


CardActionItem.propTypes = {
  cardId: PropTypes.string.isRequired,
  action: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    iconURL: PropTypes.string,
    iconURLHover: PropTypes.string,
  }),
  defaultIcon: PropTypes.string,
  eventManager: PropTypes.instanceOf(Object),
};
