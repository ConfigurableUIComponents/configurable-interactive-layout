import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardActions from './CardActions';

export default class CardHeader extends Component {
  createHeaderClassName() {
    return `card-header ${this.props.title ? '' : 'without-title'}`;
  }

  render() {
    return (
      <div className={this.createHeaderClassName()}>
        {this.props.actions ? <CardActions {...this.props} /> : null }
        {this.props.title ? <div className="title" title={this.props.title}>{this.props.title}</div> : null }
      </div>);
  }
}

CardHeader.propTypes = {
  cardId: PropTypes.string.isRequired,
  title: PropTypes.string,
  actions: PropTypes.instanceOf(Object),
  eventManager: PropTypes.instanceOf(Object),
};

CardHeader.defaultProps = {
  title: undefined,
  actions: undefined,
  eventManager: undefined,
};
