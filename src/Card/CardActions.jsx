import React, { Component } from 'react';
import PropTypes from 'prop-types';
import each from 'lodash/each';
import cloneDeep from 'lodash/cloneDeep';
import { composeThemeFromProps } from '@css-modules-theme/react';

import CardActionItem from './CardActionItem';
import buildThemeProperties from '../Utils';

import style from '../Layout/LayoutStyle.scss';

const DEFAULT_ACTION_ICON = 'SV_ANN.svg';

export default class CardActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    if (props.actions) {
      this.items = this.buildActionItems();
    }
  }

  onActionMenuClick() {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  }

  buildActionItems() {
    const {
      actions,
      cardId,
      eventManager,
      theme,
      themeProps,
    } = this.props;
    const actionControls = [];
    each(actions, (originalAction, actionId) => {
      const action = cloneDeep(originalAction);
      action.id = actionId;
      if (!action.iconURL && !action.displayName) {
        return null;
      }
      actionControls.push(<CardActionItem
        key={actionId}
        action={action}
        defaultIcon={DEFAULT_ACTION_ICON}
        cardId={cardId}
        eventManager={eventManager}
        theme={theme}
        themeProps={themeProps}
      />);
    });
    return actionControls;
  }

  render() {
    const { menuOpen } = this.state;
    const { theme, themeProps } = this.props;
    const themingProperties = buildThemeProperties(theme, themeProps);
    const themeStyles = composeThemeFromProps(style, themingProperties, {
      compose: 'Merge',
    });

    const actionItemsClassName = `${themeStyles.cardActionItems} ${menuOpen ? '' : themeStyles.dispnone}`;
    const actionsMenuClassName = `${themeStyles.cardsActionsMenu} ${menuOpen ? themeStyles.expanded : themeStyles.collapsed}`;
    const actionsClassName = `${themeStyles.actions} ${menuOpen ? themeStyles.menuOpen : ''}`;

    if (this.items.length > 0) {
      return (
        <div className={actionsClassName}>
          <div
            className={actionsMenuClassName}
            onClick={() => this.onActionMenuClick()}
            onKeyUp={() => this.onActionMenuClick()}
            role="button"
            tabIndex={0}
          />
          <div className={actionItemsClassName}>
            { this.items }
          </div>
        </div>
      );
    }
    return null;
  }
}


CardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
  actions: PropTypes.instanceOf(Object),
  eventManager: PropTypes.instanceOf(Object),
  themeProps: PropTypes.shape({
    compose: PropTypes.string,
    prefix: PropTypes.string,
  }),
  theme: PropTypes.instanceOf(Object),
};

CardActions.defaultProps = {
  themeProps: {
    compose: 'merge',
    prefix: 'configurableInteractiveLayout-',
  },
};
