import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardActionItem from './CardActionItem';

const DEFAULT_ACTION_ICON = 'SV_ANN.svg';

export default class CardActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    if (this.props.actions) {
      this.items = this.buildActionItems();
    }
  }

  onActionMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  buildActionItems() {
    const actions = this.props.actions.map((action) => {
      if (!action.iconURL && !action.displayName) {
        return null;
      }
      return (
        <CardActionItem
          key={action.id}
          action={action}
          defaultIcon={DEFAULT_ACTION_ICON}
          cardId={this.props.cardId}
          eventManager={this.props.eventManager}
        />);
    });
    return actions;
  }

  render() {
    const actionItemsClassName = `action-items ${this.state.menuOpen ? '' : 'dispnone'}`;
    const actionsMenuClassName = `actions-menu ${this.state.menuOpen ? 'expanded' : 'collapsed'}`;
    const actionsClassName = `actions ${this.state.menuOpen ? 'menu-open' : ''}`;

    if (this.items.length > 0) {
      return (
        <div className={actionsClassName} >
          <div
            className={actionsMenuClassName}
            onClick={() => this.onActionMenuClick()}
            onKeyUp={() => this.onActionMenuClick()}
            role="button"
            tabIndex={0}
          />
          <div className={actionItemsClassName} > { this.items } </div>
        </div>);
    }
    return null;
  }
}


CardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    iconURL: PropTypes.string,
    iconURLHover: PropTypes.string,
  })),
  eventManager: PropTypes.instanceOf(Object),
};
