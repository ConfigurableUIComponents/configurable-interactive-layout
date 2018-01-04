import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './CardLayoutStyle.scss';
import IframeCard from './iframeCard';
import Card from './Card';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveLayout = WidthProvider(Responsive);

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
      layouts: extractLayout(props.layoutProps),
    };
  }

  onLayoutChange(curLayout, allLayouts) {
    this.setState({
      layouts: allLayouts,
    });
  }

  buildContent() {
    const data = [];
    const { layoutProps } = this.props;

    for (let index = 0; index < layoutProps.length; index += 1) {
      const cardProps = layoutProps[index];
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
        {this.buildContent()}
      </ResponsiveLayout>
    );
  }
}

CardsLayoutManager.propTypes = {
  eventManager: PropTypes.instanceOf(Object),
  store: PropTypes.instanceOf(Object),
  layoutProps: PropTypes.arrayOf(PropTypes.shape({
    i: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
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
  layoutProps: [],
  store: undefined,
  eventManager: undefined,
};
