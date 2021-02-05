import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';
import '../res/style/style.css';


function PlaceholderText({ text, cssClass, regex }) {
  return (
    <React.Fragment>
      {reactStringReplace(text, regex, (match, i) => (
        <span key={i} className={cssClass} />
      ))
    }
    </React.Fragment>
  );
}

PlaceholderText.propTypes = {
  text: PropTypes.string,
  cssClass: PropTypes.string,
  regex: PropTypes.instanceOf(RegExp),
};

PlaceholderText.defaultProps = {
  text: undefined,
  cssClass: 'placeholdertextloader',
  regex: /\$\{(.*?)\}/g,
};

export default PlaceholderText;
