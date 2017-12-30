import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './CardLayoutStyle.scss';
import IframeCard from './iframeCard';
import Card from './Card';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);

function buildContent(props) {
  const data = [];
  const { content, ...strippedProps } = props;

  for (let index = 0; index < content.length; index += 1) {
    const { i, ...strippedContent } = content[index];
    const CustomCard = strippedContent.Type;
    const CardContent = strippedContent.Content;
    if (CustomCard === 'iframeCard') {
      data.push((
        <div key={i}>
          <IframeCard {...props} {...strippedContent} id={i} />
        </div>));
    } else if (CustomCard) {
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

function extractLayout(contentList) {
  const layoutList = [];
  for (let index = 0; index < contentList.length; index += 1) {
    layoutList.push(contentList[index].layout);
  }
  return { lg: layoutList };
}

function onBreakpointChange(newBreakpoint, newCols) {
  console.log(`Breakpoint: ${newBreakpoint}, Columns: ${newCols}`);
}

export default class CardsLayoutManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: extractLayout(props.content),
    };
  }

  onLayoutChange(curLayout, allLayouts) {
    this.setState({
      layouts: allLayouts,
    });
  //   console.log(`Current Layout: ${JSON.stringify(curLayout)},
  // All Layouts: ${JSON.stringify(allLayouts)}`);
  }

  render() {
    return (
      [
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
          onBreakpointChange={(newBreakpoint, newCols) => onBreakpointChange(newBreakpoint, newCols)} // eslint-disable-line
          onLayoutChange={(curLayout, allLayouts) => this.onLayoutChange(curLayout, allLayouts)}
        >
          {buildContent(this.props)}
        </ResponsiveLayout>,
        <div>
          <button onClick={() => this.props.EventManager.publish('a', 'layoutManager', { aaa: 1 })}>
              Send event a to iFrame
          </button>
          <button onClick={() => this.props.EventManager.publish('b', 'layoutManager', { aaa: 2 })}>
              Send event b to iFrame
          </button>
          <button onClick={() => this.props.EventManager.publish('c', 'layoutManager', { aaa: 3 })}>
              Send event c to iFrame
          </button>
        </div>]
    );
  }
}

CardsLayoutManager.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    i: PropTypes.string.isRequired,
    title: PropTypes.string,
    Type: PropTypes.func,
    Content: PropTypes.func.isRequired,
    layout: PropTypes.shape({
      i: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired,
      minW: PropTypes.number,
      maxW: PropTypes.number,
    }),
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
  EventManager: PropTypes.func.isRequired,
};

CardsLayoutManager.defaultProps = {
  content: [],
};

