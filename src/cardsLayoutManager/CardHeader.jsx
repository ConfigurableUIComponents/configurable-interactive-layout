import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardHeader extends Component {
  render() {
    return (
      <div className="header">
        <div className="title" title={this.props.title}>{this.props.title}</div>
        {this.props.actions.length > 0 ? <div className="actions">actions</div> : <div />}
      </div>);
  }
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
};

CardHeader.defaultProps = {
  // title: '',
  actions: [],
};
