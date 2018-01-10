import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

export default class Card extends Component {
  componentWillUnmount() {
    // this.props.listeners.map(event => this.props.eventManager.unsubscribe(event.id));
  }

  render() {
    let showHeader = true;
    let cardClassName = 'card';
    if (!this.props.title && !this.props.actions) showHeader = false;
    else if (this.props.title) {
      cardClassName += ' with-title';
    }
    return (
      <div className={cardClassName}>
        {showHeader ?
          <CardHeader
            cardId={this.props.configId}
            {...this.props}
          />
          : null}
        <div className="card-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  configId: PropTypes.string.isRequired,
  title: PropTypes.string,
  store: PropTypes.instanceOf(Object),
  listeners: PropTypes.instanceOf(Array),
  eventManager: PropTypes.instanceOf(Object),
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
  })),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

Card.defaultProps = {
  title: undefined,
  actions: undefined,
  eventManager: undefined,
  store: undefined,
};
