import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';

import Card from './Card';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

function buildContent(props) {
  const contentList = props.content;
  const data = [];
  for (let index = 0; index < contentList.length; index += 1) {
    const GeneratedCard = contentList[index].Type;
    const GeneratedContent = contentList[index].Content;

    if (GeneratedCard) {
      // Custom card type scenario
      data.push((
        <div key={contentList[index].i}>
          <GeneratedCard
            {...props}
            {...contentList[index]}
            Content={GeneratedContent}
          />
        </div>
      ));
    } else if (React.isValidElement(<GeneratedContent />)) {
      // Custom React component scenario
      data.push((
        <div key={contentList[index].i}>
          <Card
            {...props}
            {...contentList[index]}
          >
            <GeneratedContent
              {...contentList[index]}
              store={props.store}
            />
          </Card>
        </div>
      ));
    } else {
      // Basic content scenario
      data.push((
        <div key={contentList[index].i}>
          <Card
            {...props}
          >
            {GeneratedContent}
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
  return layoutList;
}

export default class CardsLayoutManager extends Component {
  render() {
    return (
      <ReactGridLayout
        className="cards-layout-container"
        layout={extractLayout(this.props.content)}
        cols={12}
        isDraggable={false}
        isResizable={false}
        rowHeight={100}
        width={1200}
      >
        {buildContent(this.props)}
      </ReactGridLayout>
    );
  }
}

CardsLayoutManager.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    i: PropTypes.string.isRequired,
    title: PropTypes.string,
    displayHeader: PropTypes.bool,
    Type: PropTypes.element,
    Content: PropTypes.element.isRequired,
    layout: PropTypes.arrayOf(PropTypes.shape({
      i: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired,
      minW: PropTypes.number,
      maxW: PropTypes.number,
    })),
    actions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
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

