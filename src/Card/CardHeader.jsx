import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { composeThemeFromProps } from '@css-modules-theme/react';

import CardActions from './CardActions';
import buildThemeProperties from '../Utils';

import style from '../Layout/LayoutStyle.scss';
import PlaceholderTextComponent from '../PlaceholderComponent';

export default class CardHeader extends Component {
  createHeaderClassName() {
    const { title } = this.props;
    return `${style.cardHeader} ${title ? '' : style.withoutTitle}`;
  }

  render() {
    const {
      actions,
      title,
      theme,
      themeProps,
    } = this.props;

    const themingProperties = buildThemeProperties(theme, themeProps);
    const themeStyles = composeThemeFromProps(style, themingProperties, {
      compose: 'Merge',
    });

    return (
      <div className={this.createHeaderClassName()}>
        {actions ? <CardActions {...this.props} /> : null }
        {title && typeof title === 'string'
          ? (
            <div className={themeStyles.titleWrapper}>
              <span className={themeStyles.title} title={title}>
                {title}
              </span>
            </div>
          ) : title }
      </div>
    );
  }
}

CardHeader.propTypes = {
  cardId: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(PlaceholderTextComponent),
  ]),
  actions: PropTypes.instanceOf(Object),
  eventManager: PropTypes.instanceOf(Object),
  themeProps: PropTypes.shape({
    compose: PropTypes.string,
    prefix: PropTypes.string,
  }),
  theme: PropTypes.instanceOf(Object),
};

CardHeader.defaultProps = {
  title: undefined,
  actions: undefined,
  eventManager: undefined,
  themeProps: {
    compose: 'merge',
    prefix: 'configurableInteractiveLayout-',
  },
};
