import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './CardLayoutStyle.scss';
import IframeCard from '../InteractiveIframe/iframeCard';
import maintainCardOrderAcrossBreakpoints from './CardOrganizer';
import Card from './Card';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);
const COL_MAP = {
  lg: 12, md: 10, sm: 8,
};
const COL_BREAKPOINTS = {
  lg: 1400, md: 1200, sm: 1024,
};

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
      layouts: extractLayout(props.layoutProps.layouts),
    };
  }

  onLayoutChange(curLayout, allLayouts) {
    console.log('onLayoutChange called ... updating all layouts!');
    this.setState({
      layouts: maintainCardOrderAcrossBreakpoints(curLayout, allLayouts, COL_MAP),
    });
  }

  buildContent() {
    const data = [];
    const cardConfigs = this.props.layoutProps.config;

    for (let index = 0; index < cardConfigs.length; index += 1) {
      const cardProps = cardConfigs[index];
      const cardType = cardProps.type;
      let card;

      switch (cardType) {
        case 'CustomCard':
          card = this.buildCustomCard(cardProps);
          if (card) {
            data.push(card);
          }
          break;
        case 'iframeCard':
          card = this.buildIframeCard(cardProps);
          if (card) {
            data.push(card);
          }
          break;
        case 'ReactComponent':
          card = this.buildReactComponentCard(cardProps);
          if (card) {
            data.push(card);
          }
          break;
        default:
          // TODO: Error handling
          break;
      }
    }

    return data;
  }

  buildReactComponentCard(cardProps) {
    const cardId = cardProps.i;
    const ReactComponentRef = cardProps.Content;
    if (!this.props) {
      return null;
    }
    return (
      <div key={cardId}>
        <Card
          {...cardProps}
          eventManager={this.props.eventManager}
          store={this.props.store}
          id={cardId}
        >
          <ReactComponentRef
            {...cardProps}
            {...this.props.layoutProps}
            eventManager={this.props.eventManager}
            store={this.props.store}
          />
        </Card>
      </div>);
  }


  buildIframeCard(cardProps) {
    const cardId = cardProps.i;
    console.log(this.props);
    return (
      <div key={cardId}>
        <IframeCard {...cardProps} eventManager={this.props.eventManager} id={cardId} />
      </div>);
  }

  buildCustomCard(cardProps) {
    const CustomCardType = cardProps.Content;
    const cardId = cardProps.i;
    if (!React.isValidElement(<CustomCardType />)) {
      return null;
    }

    // TODO: Validation on customCardType ...

    return (
      <div key={cardId}>
        <CustomCardType
          {...cardProps}
          store={this.props.store}
          eventManager={this.props.eventManager}
          id={cardId}
        />
      </div>);
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
        width={1200}
        margin={[20, 20]}
        containerPadding={[20, 20]}
        draggableHandle=".header, .card"
        draggableCancel=".actions, .card-content, .card-content-no-header"
        onBreakpointChange={(newBreakpoint, newCols) => onBreakpointChange(newBreakpoint, newCols)}
        onLayoutChange={(curLayout, allLayouts) => this.onLayoutChange(curLayout, allLayouts)}
        compactType={null}
      >
        {this.buildContent()}
      </ResponsiveLayout>
    );
  }
}

CardsLayoutManager.propTypes = {
  eventManager: PropTypes.instanceOf(Object),
  store: PropTypes.instanceOf(Object),
  layoutProps: PropTypes.shape({
    config: PropTypes.arrayOf(PropTypes.shape({
      i: PropTypes.string.isRequired,
      title: PropTypes.string,
      displayHeader: PropTypes.bool,
      type: PropTypes.string,
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
        w: PropTypes.number.isRequired,
        h: PropTypes.number.isRequired,
        minW: PropTypes.number,
        maxW: PropTypes.number,
      })),
    })),
  }),
};

CardsLayoutManager.defaultProps = {
  layoutProps: [],
  store: undefined,
  eventManager: undefined,
};
