export const deepAddToProps = function (elementConfig, attribute, value) {
  const currConfig = elementConfig;
  if (!currConfig.props) {
    currConfig.props = {};
  }
  currConfig.props[attribute] = value;
  if (currConfig.children) {
    const currChildren = Object.values(currConfig.children);
    currChildren.forEach((child) => {
      deepAddToProps(child, attribute, value);
    });
  }
};