import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const headerClass = this.props.displayHeader ? 'card-header' : 'hidden';

    return ([
      <div className="card">
        <div className={headerClass}>
          { this.props.title }
        </div>
        <div className="card-content">
          { this.props.children }
        </div>
      </div>,
    ]);
  }
}

Card.propTypes = {
  displayHeader: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

Card.defaultProps = {
  displayHeader: true,
  title: '',
};
