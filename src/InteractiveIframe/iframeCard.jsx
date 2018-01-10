import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../cardsLayoutManager/Card';
import './iframeCardStyles.scss';


const IFRAME_NOT_SUPPORTED_STR = 'This browser does not support iframes.';

export default class IframeCard extends Component {
  componentDidMount() {
    // this.subscribeToIframeEvents();
    // this.subscribeToApplicationEvents();
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameTasks);
    // TODO need to unsubscribe to events here
  }

  subscribeToIframeEvents = () => {
    window.addEventListener('message', (e) => {
      const iframeReference = this.frameReference.contentWindow;
      if (e.origin === iframeReference.origin) {
        console.log(`message from inner iframe: ${JSON.stringify(e.data)}`);
      }
    });
  }

  subscribeToApplicationEvents = () => {
    const em = this.props.eventManager;
    const { eventIds } = this.props;

    for (let index = 0; index < eventIds.length; index += 1) {
      em.subscribe(eventIds[index], (data) => {
        const iframeReference = this.frameReference.contentWindow;
        const targetOrigin = iframeReference.origin;
        const eventData = data;
        eventData.metadata = {
          eventName: eventIds[index],
        };
        try {
          const stringMessage = JSON.stringify(eventData);
          iframeReference.postMessage(stringMessage, targetOrigin);
        } catch (error) {
          console.error(error); // eslint-disable-line
        }
      });
    }
  }

  render() {
    return (

      <Card {...this.props}>
        <iframe
          className="iframeCard"
          title={this.props.url}
          src={this.props.url}
          ref={(iframe) => { this.frameReference = iframe; }}
        >
          {IFRAME_NOT_SUPPORTED_STR}
        </iframe>
      </Card>
    );
  }
}

IframeCard.propTypes = {
  title: PropTypes.string,
  eventManager: PropTypes.instanceOf(Object),
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
  })),
  eventIds: PropTypes.arrayOf(PropTypes.string),
  url: PropTypes.string.isRequired,
};

IframeCard.defaultProps = {
  title: undefined,
  actions: undefined,
  eventManager: undefined,
  eventIds: [],
};
