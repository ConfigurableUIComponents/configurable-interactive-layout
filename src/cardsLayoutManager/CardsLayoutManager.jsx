import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';

import Card from './Card';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

function buildContent(contentList) {
  const data = [];
  for (let index = 0; index < contentList.length; index += 1) {
    data.push((
      <div key={contentList[index].i}>
        <Card
          displayHeader={contentList[index].displayHeader}
          title={contentList[index].title}
        >
          {contentList[index].content}
        </Card>
      </div>
    ));
  }
  return data;
}

function extractLayout(contentList) {
  const layoutList = [];
  for (let index = 0; index < contentList.length; index += 1) {
    layoutList.push(contentList[index].layout);
  }
  return layoutList;
}

export default class CardsLayoutManager extends Component {
  render() {
    return ([
      <ReactGridLayout
        className="cards-layout-container"
        layout={extractLayout(this.props.content)}
        cols={12}
        isDraggable={false}
        isResizable={false}
        rowHeight={100}
        width={1200}
      >
        {buildContent(this.props.content)}
      </ReactGridLayout>,
    ]);
  }
}

CardsLayoutManager.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    i: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
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
};

CardsLayoutManager.defaultProps = {
  content: [],
};

