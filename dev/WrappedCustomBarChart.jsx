import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import CustomBarChart from './CustomBarChart';
import Store from './store';

@observer
export default class WrapperCustomLineChart extends Component {
  render() {
    const dataSource = this.props.dataSource;
    return (
      <CustomBarChart {...this.props.store[dataSource]}/>
    );
  }
}

WrapperCustomLineChart.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
};
