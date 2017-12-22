import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

export default class IframeCard extends Component {
  render() {
    return (
      <div className="card">
        {
          <CardHeader
            {...this.props}
          /> }
        {/* put an iframe instead of the div */}
        <div>wow an iframe will be here</div>
      </div>
    );
  }
}

IframeCard.propTypes = {
  title: PropTypes.string,
  EventManager: PropTypes.instanceOf(Object),
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
  })),
  url: PropTypes.string.isRequired,
};

IframeCard.defaultProps = {
  title: undefined,
  actions: undefined,
  EventManager: undefined,
};
