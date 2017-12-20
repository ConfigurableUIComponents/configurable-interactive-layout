import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import * as mobx from 'mobx';

import CustomBarChart from './CustomBarChart';
import Store from './store';

@observer
export default class WrapperCustomBarChart extends Component {
  render() {
    const jsStore = mobx.toJS(this.props.store[this.props.dataSource]);
    return (
      <CustomBarChart {...jsStore} />
    );
  }
}

WrapperCustomBarChart.propTypes = {
  store: PropTypes.shape({ type: PropTypes.oneOf([Store]) }).isRequired,
  dataSource: PropTypes.string.isRequired,
};
