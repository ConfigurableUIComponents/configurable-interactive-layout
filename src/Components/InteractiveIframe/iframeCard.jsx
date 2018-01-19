import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './iframeCardStyles.scss';


const IFRAME_NOT_SUPPORTED_STR = 'This browser does not support iframes.';

export default class IframeCard extends Component {
  componentDidMount() {
    this.subscribeToIframeEvents();
    this.subscribeToApplicationEvents();
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameTasks);
    // TODO need to unsubscribe to events here
  }

  subscribeToIframeEvents = () => {
    window.addEventListener('message', (e) => {
      const iframeReference = this.frameReference.contentWindow;
      if (e.origin === iframeReference.origin) {
        try {
          const event = JSON.parse(e.data);
          console.log(event);
          this.handleEvent({ type: event.type, data: event.data });
        } catch (err) {
          console.warn('cannot handle event; this might be a system event that does not match the interactive iframe api', e);
        }
      }
    });
  }

  handleEvent = ({ type, data }) => {
    if (this.props.eventManager) {
      this.props.eventManager.trigger(type, this.props.configId, data);
    }
  }

  subscribeToApplicationEvents = () => {
    const em = this.props.eventManager;
    const { eventIds } = this.props;

    for (let index = 0; index < eventIds.length; index += 1) {
      em.subscribe(eventIds[index], (eventData) => {
        const iframeReference = this.frameReference.contentWindow;
        const targetOrigin = iframeReference.origin;
        const event = {};
        event.metadata = {
          type: eventIds[index],
        };
        event.data = eventData;
        try {
          const stringMessage = JSON.stringify(event);
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
  configId: PropTypes.string.isRequired,
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
