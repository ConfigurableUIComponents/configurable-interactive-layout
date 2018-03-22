/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';
import { Responsive, WidthProvider } from 'react-grid-layout';

import defaultLayoutConfiguration from './defaultLayoutConfiguration';
import './LayoutStyle.scss';
import { maintainCardOrderAcrossBreakpoints, extractLayout, buildColMap, buildBreakpoints } from './ItemsOrganizer';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';

export default class CardsLayoutManager extends Component {
  constructor(props) {
    super(props);
    const breakpoints = props.layoutConfiguration.breakpoints || defaultLayoutConfiguration.breakpoints;
    const breakpointCols = buildColMap(breakpoints);
    this.ResponsiveLayout = WidthProvider(Responsive);
    this.state = {
      margins: props.layoutConfiguration.cardMargin || defaultLayoutConfiguration.cardMargin,
      padding: props.layoutConfiguration.cardPadding || defaultLayoutConfiguration.cardPadding,
      height: props.layoutConfiguration.rowHeight || defaultLayoutConfiguration.rowHeight,
      resizable: false,
      draggable: props.layoutConfiguration.draggable !== undefined ? props.layoutConfiguration.draggable : defaultLayoutConfiguration.draggable,
      cols: breakpointCols,
      breakpoints: buildBreakpoints(breakpoints),
    };
  }


  onDragStop(curLayout) {
    console.log('onDragStop', curLayout);
    const allLayouts = this.layouts;
    const newLayout = maintainCardOrderAcrossBreakpoints(curLayout, allLayouts, this.state.cols);
    console.log('onDragStop newLayout', newLayout);
    const bp = Object.keys(newLayout)[0];
    const cardsOrder = newLayout[bp].map(card => (card.i));
    this.ResponsiveLayout = WidthProvider(Responsive);
    this.props.onLayoutChange(cardsOrder);
  }

  getChildrenWithKeys(cardsOrder) {
    if (!cardsOrder) {
      return null;
    }
    const wrappedChildren = [];
    React.Children.map(this.props.children, (child) => {
      if (cardsOrder.indexOf(child.props.configId) > -1) {
        return wrappedChildren.push(<div key={child.props.configId}>{child}</div>);
      }
      return null;
    });
    const filtered = wrappedChildren.filter(component => component !== null);
    return filtered;
  }

  // componentWillReceiveProps(nextProps){
  //   this.setState({cardsOrder: nextProps.cardsConfiguration.cardsOrder})
  // }

  render() {
    const { cards, cardsOrder } = this.props.cardsConfiguration;
    if (cardsOrder.length === 0) return null;

    const childrenWithKeys = this.getChildrenWithKeys(cardsOrder);

    // Revise Cards Order to include only children
    const childrenKeys = childrenWithKeys.map(child => child.key);
    const revisedCardsOrder = intersection(cardsOrder, childrenKeys);

    const breakpointsConfig = this.props.layoutConfiguration.breakpoints;
    const layouts = extractLayout(cards, revisedCardsOrder, breakpointsConfig);

    if (!layouts) {
      return null;
    }
    this.layouts = layouts;

    const ResponsiveLayout = this.ResponsiveLayout;

    return (
      <ResponsiveLayout
        className="cards-layout-container"
        layouts={layouts}
        breakpoints={this.state.breakpoints}
        cols={this.state.cols}
        isResizable={this.state.resizable}
        isDraggable={this.state.draggable}
        rowHeight={this.state.height}
        margin={this.state.margins}
        containerPadding={this.state.padding}
        draggableHandle=".header, .card"
        draggableCancel=".actions, .card-content, .card-content-no-header"
        onBreakpointChange={(newBreakpoint, newCols) => console.log('newBreakpoint, newCols', newBreakpoint, newCols)}
        onDragStop={this.onDragStop.bind(this)}
        compactType="vertical"
      >
        {childrenWithKeys}
      </ResponsiveLayout>
    );
  }
}

CardsLayoutManager.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    configId: PropTypes.string,
    title: PropTypes.string,
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
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    })),
  }),
  cardsConfiguration: PropTypes.instanceOf(Object),
  onLayoutChange: PropTypes.instanceOf(Object),
  cardsOrder: PropTypes.instanceOf(Array),
};

CardsLayoutManager.defaultProps = {
  layoutConfiguration: [],
  cardsConfiguration: [],
};
