/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { defaultLayoutConfiguration } from './defaultLayoutConfiguration';
import './LayoutStyle.scss';
import { extractLayout, buildColMap, buildBreakpoints } from './ItemsOrganizer';
import { convertCardsToLayouts, convertLayoutToCards } from './layoutUtils';

import intersection from 'lodash/intersection';
import cloneDeep from 'lodash/cloneDeep';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);

export default class CardsLayoutManager extends Component {

  constructor(props) {
    super(props);

    const breakpoints = defaultLayoutConfiguration.breakpoints;
    this.breakpoints = buildBreakpoints(breakpoints);

    const breakpointCols = buildColMap(breakpoints);
    this.cols= breakpointCols; // how many columns per breakpoint

    this.margins = props.layoutConfiguration.cardMargin || defaultLayoutConfiguration.cardMargin;
    this.padding = props.layoutConfiguration.cardPadding || defaultLayoutConfiguration.cardPadding;
    this.rowHeight = props.layoutConfiguration.rowHeight || defaultLayoutConfiguration.rowHeight;

    this.state = {
      layouts: convertCardsToLayouts(props.cardsConfiguration.cards, this.breakpoints)
    };
  }

  componentWillReceiveProps = (props) => {
    const layouts = convertCardsToLayouts(props.cardsConfiguration.cards, this.breakpoints);
    this.setState({layouts});
  }

  onBreakpointChange = (newBreakpoint) => {
    console.log('breakpoint changing', this.state.currentBreakpoint, '=>', newBreakpoint);
    this.setState({ currentBreakpoint : newBreakpoint });
  }

  onDragStop(curLayout) {
    const allLayouts = this.state.layouts;
    if(!this.state.currentBreakpoint) console.error("on drag stop- currentBreakpoint= ", this.state.currentBreakpoint);
    allLayouts[this.state.currentBreakpoint] = curLayout;
    const cards = cloneDeep(this.props.cardsConfiguration.cards);
    convertLayoutToCards(this.state.currentBreakpoint, curLayout, cards);
    this.props.onLayoutChange(cards);
    this.setState({layouts: allLayouts});
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

  getCardIdsFromLayout = (cards) => {
    return Object.keys(cards);
  }

  render() {

    let layouts;
    let cards = this.props.cardsConfiguration.cards;
    if(!cards) return null;

    let childrenWithKeys = null;

    if(this.props.layoutConfiguration.draggable){
      /* this is a layout where a user can move cards anywhere he wants */
      const cardIds = this.getCardIdsFromLayout(cards);
      childrenWithKeys = this.getChildrenWithKeys(cardIds);
      layouts = this.state.layouts;
    }
    else{
      /*
          This is a predefined layout, use our algorithm to organize the children
          left to right, top to bottom, based on cardsOrder array
      */
      const cardsOrder = this.props.cardsConfiguration.cardsOrder;
      if (cardsOrder === undefined && cardsOrder.length === 0) return null;

      childrenWithKeys = this.getChildrenWithKeys(cardsOrder);
      // Revise Cards Order to include only children
      const childrenKeys = childrenWithKeys.map(child => child.key);
      const revisedCardsOrder = intersection(cardsOrder, childrenKeys);
      layouts = extractLayout(cards, revisedCardsOrder, defaultLayoutConfiguration.breakpoints);
    }
      if (!layouts) {
          return (
              <div className="empty-layout">
                  <div className="empty-layout-icon"></div>
                  <div>NO DATA</div>
              </div>
          );
      }
    let isDraggable = this.props.layoutConfiguration.draggable;
    let classDraggable = isDraggable ? "draggable" : "";
    return (
      <ResponsiveLayout
        className={"cards-layout-container " + classDraggable}
        layouts={layouts}
        breakpoints={this.breakpoints}
        cols={this.cols}
        isResizable={false}
        isDraggable={isDraggable} // this is dynamic
        rowHeight={this.rowHeight}
        margin={this.margins}
        containerPadding={this.padding}
        draggableHandle=".header, .card"
        draggableCancel=".actions, .card-content, .card-content-no-header, .title"
        onBreakpointChange={this.onBreakpointChange}
        onDragStop={this.onDragStop.bind(this)}
        compactType={"vertical"}
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
    rowHeight: PropTypes.number,
    cardMargin: PropTypes.arrayOf(PropTypes.number),
    cardPadding: PropTypes.arrayOf(PropTypes.number),
  }),
  cardsConfiguration: PropTypes.instanceOf(Object),
  onLayoutChange: PropTypes.instanceOf(Object),
  cardsOrder: PropTypes.instanceOf(Array),
};

CardsLayoutManager.defaultProps = {
  layoutConfiguration: [],
  cardsConfiguration: [],
};
