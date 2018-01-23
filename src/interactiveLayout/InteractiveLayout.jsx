import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';

import './LayoutStyle.scss';
import { maintainCardOrderAcrossBreakpoints, extractLayout, buildColMap, buildBreakpoints } from './ItemsOrganizer';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);

function onBreakpointChange(newBreakpoint, newCols) {
  console.log(`Breakpoint: ${newBreakpoint}, Columns: ${newCols}`);
}

export default class CardsLayoutManager extends Component {
  constructor(props) {
    super(props);

    const breakpointCols = buildColMap(props.layoutConfiguration.breakpoints);

    this.state = {
      layouts: extractLayout(props.cardsConfiguration, breakpointCols, this.props.defaultView),
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
    // configId: PropTypes.string.isRequired,
    title: PropTypes.string,
    // type: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      displayName: PropTypes.string,
    })),
  })),
  defaultView: PropTypes.string,
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
  cardsConfiguration: PropTypes.instanceOf(Object),
};

CardsLayoutManager.defaultProps = {
  layoutConfiguration: [],
  cardsConfiguration: [],
};
