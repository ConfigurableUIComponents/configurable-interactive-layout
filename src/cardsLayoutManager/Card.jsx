import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        {this.props.displayHeader ?
          <CardHeader
            {...this.props}
          /> : <div /> }
        <div className={this.props.displayHeader ? 'card-content-no-header' : 'card-content'} >
          { this.props.children }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  displayHeader: PropTypes.bool,
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
  displayHeader: true,
  title: '',
  actions: [],
  EventManager: undefined,
};
