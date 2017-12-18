import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLOR_BLUE = '#009fdb';

export default class CustomLineChart extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" height="90%" >
        <BarChart data={this.props.values} >
          <XAxis dataKey={this.props.xAxisAttrName} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar
            name={this.props.yAxisLabel}
            dataKey={this.props.yAxisAttrName}
            fill={COLOR_BLUE}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

CustomLineChart.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  xAxisAttrName: PropTypes.string,
  yAxisAttrName: PropTypes.string,
  yAxisLabel: PropTypes.string,
};

CustomLineChart.defaultProps = {
  xAxisAttrName: 'X Attribute',
  yAxisAttrName: 'Y Attribute',
  yAxisLabel: 'Y Axis',
};
