import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';


function PlaceholderTextComponent({ title }) {
  return (
    <React.Fragment>
      {reactStringReplace(title.text, title.regex, (match, i) => (
        <span key={i} className={title.cssClass} />
      ))
    }
    </React.Fragment>
  );
}

PlaceholderTextComponent.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]),
};

PlaceholderTextComponent.defaultProps = {
  title: undefined,
};

export default PlaceholderTextComponent;
