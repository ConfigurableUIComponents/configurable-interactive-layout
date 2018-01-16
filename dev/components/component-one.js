import React from 'react';
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) { /* Ignore */ }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem('rgl-8', JSON.stringify({
      [key]: value,
    }));
  }
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const layouts = [
  {
    i: 'a', x: 0, y: 0, w: 2, h: 2,
  },
  {
    i: 'b', x: 2, y: 0, w: 8, h: 2, minW: 2, maxW: 8,
  },
  {
    i: 'c', x: 10, y: 0, w: 2, h: 2,
  },
];
const responsivelayouts = {
  large: [{
    i: 'ra', x: 0, y: 0, w: 2, h: 2,
  },
  {
    i: 'rb', x: 2, y: 0, w: 8, h: 2, minW: 2, maxW: 8,
  },
  {
    i: 'rc', x: 10, y: 0, w: 2, h: 2,
  },
  ],
  medium: [{
    i: 'ra', x: 0, y: 0, w: 2, h: 2,
  },
  {
    i: 'rb', x: 2, y: 0, w: 8, h: 2, minW: 2, maxW: 8,
  },
  {
    i: 'rc', x: 0, y: 2, w: 2, h: 2,
  },
  ],
  small: [{
    i: 'ra', x: 0, y: 0, w: 2, h: 2,
  },
  {
    i: 'rb', x: 0, y: 2, w: 8, h: 2, minW: 2, maxW: 8,
  },
  {
    i: 'rc', x: 0, y: 4, w: 2, h: 2,
  },
  ],
};
const originalLayouts = getFromLS('layouts') || responsivelayouts;

class CardsLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }
  onLayoutChange(layout, layouts2) {
    saveToLS('layouts', layouts2);
    this.setState({ layouts: layouts2 });
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  render() {
    return ([
      <h1>ResponsiveReactGridLayout</h1>,
      <button onClick={() => this.resetLayout()}>Reset Layout</button>,
      <ResponsiveReactGridLayout
        className="layout"
        layouts={this.state.layouts}
        cols={{
                large: 12, medium: 12, small: 12,
            }}
        breakpoints={{
                large: 1200, medium: 768, small: 480,
            }}
        rowHeight={50}
        onLayoutChange={(layout, layouts2) => this.onLayoutChange(layout, layouts2)}
        draggableCancel=".content-area"
        draggableHandle=".header-area"
      >
        <div key="ra">
          <div>not draggable</div>
          1
        </div>
        <div key="rb">
          <div className="header-area">draggable</div>
          2
        </div>
        <div key="rc">
          <div className="header-area">draggable</div>
          3
        </div>
      </ResponsiveReactGridLayout>,
      <h1>ReactGridLayout</h1>,
      <ReactGridLayout
        className="layout"
        layout={layouts}
        cols={12}
        rowHeight={50}
        width={1200}
      >
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
      </ReactGridLayout>,
    ]);
  }
}

export default CardsLayout;
