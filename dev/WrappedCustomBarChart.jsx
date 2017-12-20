import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import CustomBarChart from './CustomBarChart';
import Store from './store';

@observer
export default class WrapperCustomLineChart extends Component {
  render() {
    return (
      <CustomBarChart {...this.props.store[this.props.dataSource]} />
    );
  }
}

WrapperCustomLineChart.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  dataSource: PropTypes.string.isRequired,
};
