import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

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
    let cardClassName = 'card ';
    if (this.props.cardCssClass) {
      cardClassName += this.props.cardCssClass;
    }
    let cardRef;
    if (!this.props.title && !this.props.actions) showHeader = false;
    else if (this.props.title) {
      cardClassName += ' with-title';
    }
    if (this.state.isNewCard && React.createRef) {
      cardRef = React.createRef();
      this.newCardRef = cardRef; // we will use this reference to scroll the view to this card
      cardClassName += ' highlight';
    }
    return (
      <div ref={cardRef} className={cardClassName}>
        {showHeader ?
          <CardHeader
            cardId={this.props.configId}
            {...this.props}
          />
          : null}
        <div className="card-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  configId: PropTypes.string.isRequired,
  title: PropTypes.string,
  cardCssClass: PropTypes.string,
  isNewCard: PropTypes.bool,
  store: PropTypes.instanceOf(Object),
  listeners: PropTypes.instanceOf(Array),
  eventManager: PropTypes.instanceOf(Object),
  actions: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

Card.defaultProps = {
  title: undefined,
  actions: undefined,
  eventManager: undefined,
  store: undefined,
};
