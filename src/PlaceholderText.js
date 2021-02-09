import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';
import { composeThemeFromProps } from '@css-modules-theme/react';
import buildThemeProperties from './Utils';
import style from './Layout/LayoutStyle.scss';


function PlaceholderText({
  text, cssClass, regex, theme, themeProps,
}) {
  const themingProperties = buildThemeProperties(theme, themeProps);
  const themeStyles = composeThemeFromProps(style, themingProperties, {
    compose: 'Merge',
  });
  const cssStyle = (cssClass) ? `${themeStyles[cssClass]}` : style.placeholdertextloader;

  return (
    <React.Fragment>
      {reactStringReplace(text, regex, (match, i) => (
        <span key={i} className={cssStyle} />
      ))
    }
    </React.Fragment>
  );
}

PlaceholderText.propTypes = {
  text: PropTypes.string,
  cssClass: PropTypes.string,
  regex: PropTypes.instanceOf(RegExp),
  themeProps: PropTypes.shape({
    compose: PropTypes.string,
    prefix: PropTypes.string,
  }),
  theme: PropTypes.instanceOf(Object),
};

PlaceholderText.defaultProps = {
  text: undefined,
  cssClass: 'placeholdertextloader',
  regex: /\$\{(.*?)\}/g,
  themeProps: {
    compose: 'merge',
    prefix: 'configurableInteractiveLayout-',
  },
};

export default PlaceholderText;
