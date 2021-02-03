import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';


function PlaceholderTextComponent({ text, cssClass, regex }) {
  return (
    <React.Fragment>
      {reactStringReplace(text, regex, (match, i) => (
        <span key={i} className={cssClass} />
      ))
    }
    </React.Fragment>
  );
}

PlaceholderTextComponent.propTypes = {
  text: PropTypes.string,
  cssClass: PropTypes.string,
  regex: PropTypes.instanceOf(RegExp),
};

PlaceholderTextComponent.defaultProps = {
  text: undefined,
  cssClass: undefined,
  regex: /\$\{(.*?)\}/g,
};

export default PlaceholderTextComponent;
