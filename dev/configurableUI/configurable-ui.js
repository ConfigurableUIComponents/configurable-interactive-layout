/* eslint-disable */

import React from 'react';

class ConfigUi {
  constructor(config) {
    this.rootElement = this.createElement(config);
  }

  getRootElement() {
    return this.rootElement;
  }

  createElements(childrenConfig) {
    let children = [];
    const self = this;
    if (childrenConfig) {
        for (let childId in childrenConfig){
          let childToAdd = childrenConfig[childId];
          if (!childToAdd.props){
            childToAdd.props = {};
          }
          childToAdd.props.configId = childId;
            children.push(this.createElement(childToAdd));
        }
    }
    return children;
  }

  canHaveChildren(config) {
    if (config.type === 'input') {
      return false;
    }
    return true;
  }

  createElement(config) {
    let element;
    if (config.children && this.canHaveChildren(config)) {
      const children = this.createElements(config.children);
      element = React.createElement(
        config.type,
        config.props,
        ...children,
      );
    } else {
      element = React.createElement(
        config.type,
        config.props,
      );
    }
    return element;
  }
}

export default ConfigUi;
