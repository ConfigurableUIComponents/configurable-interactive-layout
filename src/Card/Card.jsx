import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { composeThemeFromProps } from '@css-modules-theme/react';

import CardHeader from './CardHeader';
import buildThemeProperties from '../Utils';

import style from '../Layout/LayoutStyle.scss';

const NEW_CARD_HIGHLIGHT_TIMEOUT = 1000;

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewCard: props.isNewCard,
    };
  }

  componentDidMount = () => {
    if (this.newCardRef) {
      this.newCardRef.current.scrollIntoView();
      this.newCardRef = undefined;
      setTimeout(() => {
        this.setState({ isNewCard: false });
      }, NEW_CARD_HIGHLIGHT_TIMEOUT);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ isNewCard: nextProps.isNewCard });
  }

  render() {
    let showHeader = true;
    const {
      actions, title,
      configId,
      children,
      theme,
      themeProps,
      cardCssClass,
    } = this.props;
    const {
      isNewCard,
    } = this.state;

    const themingProperties = buildThemeProperties(theme, themeProps);
    const themeStyles = composeThemeFromProps(style, themingProperties, {
      compose: 'Merge',
    });

    let cardRef;
    let cardClassName = themeStyles.card;

    if (cardCssClass) {
      cardClassName = themeStyles[cardCssClass];
    }

    if (!title && !actions) {
      showHeader = false;
    } else if (title) {
      cardClassName += ` ${themeStyles.withTitle}`;
    }

    if (isNewCard && React.createRef) {
      cardRef = React.createRef();
      this.newCardRef = cardRef; // we will use this reference to scroll the view to this card
      cardClassName += ` ${themeStyles.highlight}`;
    }

    return (
      <div ref={cardRef} className={cardClassName} id={this.props.configId}>
        {showHeader ? <CardHeader cardId={configId} {...this.props} /> : null}
        <div className={themeStyles.cardContent}>
          { children }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  configId: PropTypes.string.isRequired,
  title: PropTypes.string,
  isNewCard: PropTypes.bool,
  store: PropTypes.instanceOf(Object),
  listeners: PropTypes.instanceOf(Array),
  eventManager: PropTypes.instanceOf(Object),
  actions: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  cardCssClass: PropTypes.string,
  themeProps: PropTypes.shape({
    compose: PropTypes.string,
    prefix: PropTypes.string,
  }),
  theme: PropTypes.instanceOf(Object),
};

Card.defaultProps = {
  title: undefined,
  actions: undefined,
  eventManager: undefined,
  store: undefined,
  themeProps: {
    compose: 'merge',
    prefix: 'configurableInteractiveLayout-',
  },
};
