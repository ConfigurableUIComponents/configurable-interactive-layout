import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { composeThemeFromProps } from '@css-modules-theme/react';

import buildThemeProperties from '../Utils';

import style from '../Layout/LayoutStyle.scss';

export default class CardActionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.action = props.action;
    this.onClickAction = this.assignOnClickAction();
  }

  onMouseItem(hover) {
    this.setState({ hover });
  }

  getActionIconURL() {
    const { hover } = this.state;
    const { defaultIcon } = this.props;

    if (!hover && this.action.iconURL) {
      return this.action.iconURL;
    }
    if (hover && this.action.iconURLHover) {
      return this.action.iconURLHover;
    }
    if (hover && this.action.iconURLHover === undefined && this.action.iconURL) {
      return this.action.iconURL;
    }
    return defaultIcon;
  }

  assignOnClickAction() {
    let onClickAction = this.action.onClick;
    if (onClickAction === undefined) {
      onClickAction = this.publishActionEvent;
    }
    return onClickAction;
  }

  publishActionEvent(actionId) {
    const { cardId, eventManager } = this.props;
    eventManager.publish(actionId, cardId, {});
  }

  render() {
    const { theme, themeProps } = this.props;
    const themingProperties = buildThemeProperties(theme, themeProps);
    const themeStyles = composeThemeFromProps(style, themingProperties, {
      compose: 'Merge',
    });
    const { onClickAction } = this;
    const actionIcon = this.getActionIconURL();
    // const divStyle = { background: `url('${actionIcon}') no-repeat center center` };
    const actionTooltip = (this.action.displayName) ? ` ${themeStyles.actionTooltip}` : null;
    return (
      <div
        className={`${themeStyles.cardActionItem}${actionTooltip}`}
        data-tooltip={this.action.displayName}
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
  themeProps: PropTypes.shape({
    compose: PropTypes.string,
    prefix: PropTypes.string,
  }),
  theme: PropTypes.instanceOf(Object),
};

CardActionItem.defaultProps = {
  themeProps: {
    compose: 'merge',
    prefix: 'configurableInteractiveLayout-',
  },
};
