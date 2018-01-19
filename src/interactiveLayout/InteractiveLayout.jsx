import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './LayoutStyle.scss';
import maintainCardOrderAcrossBreakpoints from './ItemsOrganizer';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);

function getLargestConfiguredLayout(layoutList, breakpointMap) {
  console.log(`System Breakpoints: ${JSON.stringify(breakpointMap)}`);
  console.log(`First Configured Layout: ${JSON.stringify(layoutList[Object.keys(layoutList)[0]])}`);
  return layoutList[Object.keys(layoutList)[0]];
}

function populateAllBreakpointsWithLayouts(
  configuredLayouts,
  breakpoints,
  largestConfiguredLayout,
) {
  const allLayoutsObj = {};
  for (let i = 0; i < Object.keys(breakpoints).length; i += 1) {
    const configuredLayout = configuredLayouts[breakpoints[i]];
    if (configuredLayout) {
      allLayoutsObj[breakpoints[i]] = configuredLayout;
    } else {
      allLayoutsObj[breakpoints[i]] = JSON.parse(JSON.stringify(largestConfiguredLayout));
    }
  }

  return allLayoutsObj;
}

function extractLayout(contentList, COL_MAP) {
  const layoutList = {};
  // retrieve all configured layouts
  contentList.forEach((breakpointConfig) => {
    const { breakpoint, layout } = breakpointConfig;
    layoutList[breakpoint] = layout;
  });

  // all breakpoints must have an associated layout (make sure each breakpoint
  // has a configured layout) ... if there is no layout configured for a specific
  // breakpoint, use the largest configured layout
  const largestConfiguredLayout = getLargestConfiguredLayout(layoutList, COL_MAP);
  const allLayouts =
    populateAllBreakpointsWithLayouts(layoutList, Object.keys(COL_MAP), largestConfiguredLayout);
  console.log(`Initial Layouts: ${JSON.stringify(allLayouts)}`);
  const orderedLayouts =
    maintainCardOrderAcrossBreakpoints(largestConfiguredLayout, allLayouts, COL_MAP);
  return orderedLayouts;
}

function onBreakpointChange(newBreakpoint, newCols) {
  console.log(`Breakpoint: ${newBreakpoint}, Columns: ${newCols}`);
}

function buildColMap(breakpoints) {
  const colMap = {};
  breakpoints.forEach((breakpoint) => {
    colMap[breakpoint.id] = breakpoint.col;
  });
  return colMap;
}

function buildBreakpoints(breakpoints) {
  const breakpointMap = {};
  breakpoints.forEach((breakpoint) => {
    breakpointMap[breakpoint.id] = breakpoint.width;
  });
  return breakpointMap;
}

export default class CardsLayoutManager extends Component {
  constructor(props) {
    super(props);

    const breakpointCols = buildColMap(props.layoutConfiguration.breakpoints);

    this.state = {
      layouts: extractLayout(props.cardsConfiguration, breakpointCols),
      margins: props.layoutConfiguration.cardMargin,
      padding: props.layoutConfiguration.cardPadding,
      height: props.layoutConfiguration.rowHeight,
      resizable: props.layoutConfiguration.resizable,
      draggable: props.layoutConfiguration.draggable,
      cols: breakpointCols,
      breakpoints: buildBreakpoints(props.layoutConfiguration.breakpoints),
    };
  }

  onLayoutChange(curLayout, allLayouts) {
    console.log('onLayoutChange called ... updating all layouts!');
    this.setState({
      layouts: maintainCardOrderAcrossBreakpoints(curLayout, allLayouts, this.state.cols),
    });
  }

  getChildrenWithKey() {
    const wrappedChildren = [];
    React.Children.map(this.props.children, child => (
      // Make sure the child is in the layout
      wrappedChildren.push(<div key={child.props.configId}>{child}</div>)));
    return wrappedChildren;
  }

  render() {
    return (
      <ResponsiveLayout
        className="cards-layout-container"
        layouts={this.state.layouts}
        breakpoints={this.state.breakpoints}
        cols={this.state.cols}
        isResizable={this.state.resizable}
        isDraggable={this.state.draggable}
        rowHeight={this.state.height}
        margin={this.state.margins}
        containerPadding={this.state.padding}
        draggableHandle=".header, .card"
        draggableCancel=".actions, .card-content, .card-content-no-header"
        onBreakpointChange={(newBreakpoint, newCols) => onBreakpointChange(newBreakpoint, newCols)}
        onLayoutChange={(curLayout, allLayouts) => this.onLayoutChange(curLayout, allLayouts)}
        compactType={null}
      >
        {this.getChildrenWithKey()}
      </ResponsiveLayout>
    );
  }
}

CardsLayoutManager.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    configId: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      displayName: PropTypes.string,
    })),
  })),
  layoutConfiguration: PropTypes.shape({
    draggable: PropTypes.bool,
    resizable: PropTypes.bool,
    rowHeight: PropTypes.number,
    cardMargin: PropTypes.arrayOf(PropTypes.number),
    cardPadding: PropTypes.arrayOf(PropTypes.number),
    breakpoints: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      col: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    })),
  }),
  cardsConfiguration: PropTypes.arrayOf(PropTypes.shape({
    breakpoint: PropTypes.string.isRequired,
    layout: PropTypes.arrayOf(PropTypes.shape({
      i: PropTypes.string.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired,
      minW: PropTypes.number,
      maxW: PropTypes.number,
    })),
  })),
};

CardsLayoutManager.defaultProps = {
  layoutConfiguration: [],
  cardsConfiguration: [],
};
