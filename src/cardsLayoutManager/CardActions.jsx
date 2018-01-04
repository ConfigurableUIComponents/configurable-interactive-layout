import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_ACTION_ICON = 'SV_ANN.svg';

export default class CardActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      actionItemsHover: this.createActionItemsHover(),
    };
  }

  onActionMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  onMouseOverItem(actionId) {
    const { actionItemsHover } = this.state;
    actionItemsHover[actionId] = true;
    this.setState({ actionItemsHover });
  }

  onMouseOutItem(actionId) {
    const { actionItemsHover } = this.state;
    actionItemsHover[actionId] = false;
    this.setState({ actionItemsHover });
  }
  getActionIconURL(action) {
    const itemHover = this.state.actionItemsHover[action.id];
    if (!itemHover && action.iconURL) {
      return action.iconURL;
    }
    if (itemHover && action.iconURLHover) {
      return action.iconURLHover;
    }
    return DEFAULT_ACTION_ICON;
  }

  assignOnClickAction(action) {
    let onClickAction = action.onClick;
    if (onClickAction === undefined) {
      onClickAction = this.publishActionEvent;
    }
    return onClickAction.bind(this, action.id);
  }
  createActionItemsHover() {
    const result = {};
    const { actions } = this.props;
    for (let i = 0; i < actions.length; i += 1) {
      result[actions[i].id] = false;
    }
    return result;
  }

  publishActionEvent(actionId) {
    this.props.eventManager.publish(actionId, this.props.id, {});
  }

  buildActionItems() {
    const actions = this.props.actions.map((action) => {
      let onClickAction = this.assignOnClickAction(action);
      onClickAction = onClickAction.bind(this, action);
      if (!action.iconURL && !action.displayName) {
        return null;
      }
      const actionIcon = this.getActionIconURL(action);
      const divStyle = { background: `url('${actionIcon}') no-repeat center center` };

      return (<div
        className="action-item"
        style={divStyle}
        title={action.displayName}
        key={action.id}
        onClick={onClickAction}
        onKeyUp={onClickAction}
        tabIndex="0"
        role="button"
        onMouseOver={() => this.onMouseOverItem(action.id)}
        onFocus={() => this.onMouseOverItem(action.id)}
        onMouseOut={() => this.onMouseOutItem(action.id)}
        onBlur={() => this.onMouseOutItem(action.id)}
      />);
    });
    return actions;
  }

  render() {
    let actions = [];
    if (this.props.actions) {
      actions = this.buildActionItems();
    }

    const actionItemsClassName = `action-items ${this.state.menuOpen ? '' : 'dispnone'}`;
    const actionsMenuClassName = `actions-menu ${this.state.menuOpen ? 'expanded' : 'collapsed'}`;
    const actionsClassName = `actions ${this.state.menuOpen ? 'menu-open' : ''}`;

    if (actions.length > 0) {
      return (
        <div className={actionsClassName} >
          <div
            className={actionsMenuClassName}
            onClick={() => this.onActionMenuClick()}
            onKeyUp={() => this.onActionMenuClick()}
            role="button"
            tabIndex={0}
          />
          <div className={actionItemsClassName} > { actions } </div>
        </div>);
    }
    return null;
  }
}

CardActions.propTypes = {
  id: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    iconURL: PropTypes.string,
    iconURLHover: PropTypes.string,
  })),
  eventManager: PropTypes.instanceOf(Object),
};
