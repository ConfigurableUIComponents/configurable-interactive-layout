import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

export default class Card extends Component {
  buildActions() {
    const actions = this.props.actions.map(action => (
      <button onClick={() => this.props.EventManager.publish(action.id, this.props.id, {})}>
        {action.id}
      </button>
    ));
    return actions;
  }

  render() {
    const headerClass = this.props.displayHeader ? 'card-header' : 'hidden';
    let actions = [];

    if (this.props.EventManager) {
      actions = this.buildActions();
    }

    return ([
      <div className="card">
        <div className={headerClass}>
          { this.props.title }
          {actions}
        </div>
        <div className="card-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  displayHeader: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  EventManager: PropTypes.instanceOf(Object),
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

Card.defaultProps = {
  displayHeader: true,
  actions: [],
  title: '',
  actions: [],
  EventManager: undefined,
};
