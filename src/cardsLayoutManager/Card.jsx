import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        {
          <CardHeader
            {...this.props}
          /> }
        <div className="card-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  store: PropTypes.instanceOf(Object),
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
