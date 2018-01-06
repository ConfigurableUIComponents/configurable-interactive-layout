import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './CardLayoutStyle.scss';
import maintainCardOrderAcrossBreakpoints from './CardOrganizer';
import Card from './Card';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);
const COL_MAP = {
  lg: 12, md: 10, sm: 8, xs: 6,
};
const COL_BREAKPOINTS = {
  lg: 1400, md: 1200, sm: 1024, xs: 800,
};

function buildContent(props) {
  const data = [];
  const { content, ...strippedProps } = props;
  const { config } = content;

  for (let index = 0; index < config.length; index += 1) {
    const { i, ...strippedContent } = config[index];
    const CustomCard = strippedContent.Type;
    const CardContent = strippedContent.Content;

    if (CustomCard) {
      // Custom card type scenario
      data.push((
        <div key={i}>
          <CustomCard
            {...strippedProps}
            {...strippedContent}
            id={i}
            Content={CardContent}
          />
        </div>
      ));
    } else if (React.isValidElement(<CardContent {...props} {...strippedContent} />)) {
      // Custom React component scenario
      data.push((
        <div key={i}>
          <Card {...props} {...strippedContent} id={i} >
            <CardContent {...props} {...strippedContent} />
          </Card>
        </div>
      ));
    } else {
      // Basic content scenario
      data.push((
        <div key={i}>
          <Card
            {...props}
            id={i}
          >
            {CardContent}
          </Card>
        </div>
      ));
    }
  }
  return data;
}

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

function extractLayout(contentList) {
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
  //   {
  //   lg: layoutList,
  //   md: JSON.parse(JSON.stringify(layoutList)),
  //   sm: JSON.parse(JSON.stringify(layoutList)),
  //   xs: JSON.parse(JSON.stringify(layoutList)),
  // };
  console.log(`Initial Layouts: ${JSON.stringify(allLayouts)}`);
  const orderedLayouts =
    maintainCardOrderAcrossBreakpoints(largestConfiguredLayout, allLayouts, COL_MAP);
  return orderedLayouts;
}

function onBreakpointChange(newBreakpoint, newCols) {
  console.log(`Breakpoint: ${newBreakpoint}, Columns: ${newCols}`);
}

export default class CardsLayoutManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: extractLayout(props.content.layouts),
    };
  }

  onLayoutChange(curLayout, allLayouts) {
    console.log('onLayoutChange called ... updating all layouts!');
    this.setState({
      layouts: maintainCardOrderAcrossBreakpoints(curLayout, allLayouts, COL_MAP),
    });
  }

  render() {
    return (
      <ResponsiveLayout
        className="cards-layout-container"
        layouts={this.state.layouts}
        breakpoints={COL_BREAKPOINTS}
        cols={COL_MAP}
        isResizable={false}
        rowHeight={100}
        width={1500}
        draggableHandle=".header, .card"
        draggableCancel=".actions, .card-content, .card-content-no-header"
        onBreakpointChange={(newBreakpoint, newCols) => onBreakpointChange(newBreakpoint, newCols)}
        onLayoutChange={(curLayout, allLayouts) => this.onLayoutChange(curLayout, allLayouts)}
        compactType={null}
      >
        {buildContent(this.props)}
      </ResponsiveLayout>
    );
  }
}

CardsLayoutManager.propTypes = {
  content: PropTypes.shape({
    config: PropTypes.arrayOf(PropTypes.shape({
      i: PropTypes.string.isRequired,
      title: PropTypes.string,
      displayHeader: PropTypes.bool,
      Type: PropTypes.func,
      Content: PropTypes.func.isRequired,
      actions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
      })),
      listeners: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })),
      data: PropTypes.instanceOf(Object),
      dataSource: PropTypes.string,
    })),
    layouts: PropTypes.arrayOf(PropTypes.shape({
      breakpoint: PropTypes.string.isRequired,
      layout: PropTypes.arrayOf(PropTypes.shape({
        i: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        w: PropTypes.number.isRequired,
        h: PropTypes.number.isRequired,
        minW: PropTypes.number,
        maxW: PropTypes.number,
      })),
    })),
  }),
};

CardsLayoutManager.defaultProps = {
  content: [],
};

