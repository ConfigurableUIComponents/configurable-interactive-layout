import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './CardLayoutStyle.scss';
import maintainCardSizeOnLayoutChange from './CardOrganizer';
import Card from './Card';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);
const COL_MAP = {
  lg: 12, md: 10, sm: 8, xs: 6,
};

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
  console.log(`Initial Layout: ${JSON.stringify(layoutList)}`);
  // TODO - create a method for dynamically genreating layouts for each breakpoint
  const allLayouts = maintainCardSizeOnLayoutChange(layoutList, {
    lg: layoutList,
    md: JSON.parse(JSON.stringify(layoutList)),
    sm: JSON.parse(JSON.stringify(layoutList)),
    xs: JSON.parse(JSON.stringify(layoutList)),
  }, COL_MAP);
  return allLayouts;
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
    console.log('onLayoutChange called ... updating all layouts!');
    this.setState({
      layouts: maintainCardSizeOnLayoutChange(curLayout, allLayouts, COL_MAP),
    });
  }

  render() {
    return (
      <ResponsiveLayout
        className="cards-layout-container"
        layouts={this.state.layouts}
        breakpoints={{
          lg: 1400, md: 1200, sm: 1024, xs: 800,
        }}
        cols={COL_MAP}
        isResizable={false}
        rowHeight={100}
        width={1500}
        draggableHandle=".header, .card"
        draggableCancel=".actions, .card-content, .card-content-no-header"
        onBreakpointChange={(newBreakpoint, newCols) => onBreakpointChange(newBreakpoint, newCols)}
        onLayoutChange={(curLayout, allLayouts) => this.onLayoutChange(curLayout, allLayouts)}
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

