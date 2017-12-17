import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        {this.props.displayHeader ?
          <CardHeader
            title={this.props.title}
            actions={this.props.actions}
          /> : <div /> }
        <div className="card-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  displayHeader: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

Card.defaultProps = {
  displayHeader: true,
  actions: [],
  title: '',
};
