import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

export default class Card extends Component {
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
  title: PropTypes.string,
  EventManager: PropTypes.instanceOf(Object),
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
  EventManager: undefined,
};
