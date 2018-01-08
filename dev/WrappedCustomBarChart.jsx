import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as mobx from 'mobx';

import CustomBarChart from './CustomBarChart';
import Store from './store';

@observer
export default class WrapperCustomBarChart extends Component {
  render() {
    const dataSource = 'card1Data';
    const jsStore = mobx.toJS(Store[dataSource]);
    return (
      <CustomBarChart {...jsStore} />
    );
  }
}
