import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import mobx from 'mobx';

import CustomBarChart from './CustomBarChart';
import Store from './store';

@observer
export default class WrapperCustomLineChart extends Component {
  render() {
    const jsStore = mobx.toJS(this.props.store[this.props.dataSource]);
    return (
      <CustomBarChart {...jsStore} />
    );
  }
}

WrapperCustomLineChart.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  dataSource: PropTypes.string.isRequired,
};
