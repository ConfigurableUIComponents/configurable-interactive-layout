import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './CardLayoutStyle.scss';

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

function extractLayout(contentList) {
  const layoutList = [];
  for (let index = 0; index < contentList.length; index += 1) {
    layoutList.push(contentList[index].layout);
  }
  return { xlg: layoutList };
}

function onBreakpointChange(newBreakpoint, newCols) {
  console.log(`Breakpoint: ${newBreakpoint}, Columns: ${newCols}`);
}

function onLayoutChange(curLayout, allLayouts) {
  console.log(`Current Layout: ${JSON.stringify(curLayout)}, All Layouts: ${JSON.stringify(allLayouts)}`);
}


export default class CardsLayoutManager extends Component {
  render() {
    return (
      <ResponsiveLayout
        className="cards-layout-container"
        layouts={extractLayout(this.props.content)}
        breakpoints={{
          xlg: 1920, lg: 1600, md: 1440, sm: 1280, xsm: 1024, xxsm: 960,
        }}
        cols={{
          xlg: 12, lg: 12, md: 12, sm: 8, xsm: 8, xxsm: 6,
        }}
        isResizable={false}
        rowHeight={100}
        width={1200}
        compactType="horizontal"
        draggableHandle=".header, .card"
        draggableCancel=".actions, .card-content, .card-content-no-header"
        onBreakpointChange={(newBreakpoint, newCols) => onBreakpointChange(newBreakpoint, newCols)}
        onLayoutChange={(curLayout, allLayouts) => onLayoutChange(curLayout, allLayouts)}
      >
        {buildContent(this.props)}
      </ResponsiveLayout>
    );
  }
}

CardsLayoutManager.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    i: PropTypes.string.isRequired,
    title: PropTypes.string,
    displayHeader: PropTypes.bool,
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
};

CardsLayoutManager.defaultProps = {
  content: [],
};

