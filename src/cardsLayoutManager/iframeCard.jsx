import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

export default class IframeCard extends Component {
  componentDidMount() {
    window.addEventListener('message', this.handleFrameTasks);
    const em = this.props.EventManager;
    const { eventIds } = this.props;

    for (let index = 0; index < eventIds.length; index += 1) {
      em.subscribe(eventIds[index], (data) => {
        const widgetWindow = this.myframe.contentWindow;
        const targetOrigin = widgetWindow.origin;
        const eventData = data;
        eventData.metadata = {
          eventName: eventIds[index],
        };
        try {
          const stringMessage = JSON.stringify(eventData);
          widgetWindow.postMessage(stringMessage, targetOrigin);
        } catch (error) {
          /* eslint-disable no-console */
          console.error(error);
          /* eslint-disable no-console */
        }
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameTasks);
  }
  handleFrameTasks = (e) => {
    if (e.origin === 'http://localhost:8080') { // e.data.metadata.eventName === 'a') {
      console.log(`message from inner iframe: ${JSON.stringify(e.data)}`);
    }
  }
  render() {
    return (
      <div className="card">
        {
          <CardHeader
            {...this.props}
          /> }
        <div>
          <iframe
            title={this.props.url}
            src={this.props.url}
            ref={(iframe) => { this.myframe = iframe; }}
          >
            This browser does not support iframes.
          </iframe>
        </div>
      </div>);
  }
}

IframeCard.propTypes = {
  title: PropTypes.string,
  EventManager: PropTypes.instanceOf(Object),
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
  EventManager: undefined,
  eventIds: [],
};
