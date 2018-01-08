import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './CardLayoutStyle.scss';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);

function extractLayout(contentList) {
  const layoutList = [];

  Object.keys(contentList).forEach((cardKey) => {
    let currLayout = {};
    // currLayout.i = cardKey;
    // currLayout.lg = {
    currLayout = {
      i: cardKey,
      x: contentList[cardKey].column,
      y: contentList[cardKey].row,
      w: contentList[cardKey].breakpoints.lg.width,
      h: contentList[cardKey].breakpoints.lg.height,
    };

    // currLayout.md = {
    //   i: cardKey,
    //   x: contentList[cardKey].columnPosition,
    //   y: contentList[cardKey].rowPosition,
    //   w: contentList[cardKey].breakpoints.md.width,
    //   h: contentList[cardKey].breakpoints.md.height,
    // };
    layoutList.push(currLayout);
  });

  return { lg: layoutList };
}

function onBreakpointChange(newBreakpoint, newCols) {
  console.log(`Breakpoint: ${newBreakpoint}, Columns: ${newCols}`);
}

export default class ConfigurableCardsLayoutManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: extractLayout(props.defaultView),
    };
  }

  onLayoutChange(curLayout, allLayouts) {
    this.setState({
      layouts: allLayouts,
    });
  }

  getChildrenWithKey() {
    const wrappedChildren = [];
    React.Children.map(this.props.children, child => (
      wrappedChildren.push(<div key={child.props.configId}>{child}</div>)));
    return wrappedChildren;
  }

  removeCard(cardId) {
    const lg = this.state.layouts.lg.filter(card => card.i !== cardId);
    const md = this.state.layouts.md.filter(card => card.i !== cardId);
    const layouts = {
      lg,
      md,
    };
    this.setState({ layouts });
  }

  render() {
    return (
      <ResponsiveLayout
        className="cards-layout-container"
        layouts={this.state.layouts}
        breakpoints={{
          lg: 1500, md: 1440,
        }}
        cols={{
          lg: 12, md: 8,
        }}
        isResizable={false}
        rowHeight={100}
        width={1200}
        margin={[20, 20]}
        containerPadding={[20, 20]}
        draggableHandle=".header, .card"
        draggableCancel=".actions, .card-content, .card-content-no-header"
        onBreakpointChange={(newBreakpoint, newCols) => onBreakpointChange(newBreakpoint, newCols)}
        onLayoutChange={(curLayout, allLayouts) => this.onLayoutChange(curLayout, allLayouts)}
      >
        {this.getChildrenWithKey()}
      </ResponsiveLayout>
    );
  }
}

ConfigurableCardsLayoutManager.propTypes = {
  defaultView: PropTypes.instanceOf(Object),
  children: PropTypes.instanceOf(Object),
};

ConfigurableCardsLayoutManager.defaultProps = {
};
