/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { composeThemeFromProps } from '@css-modules-theme/react';

import Card from '../Card/Card';
import './iframeCardStyles.scss';
import UrlUtils from './UrlUtils';
import buildThemeProperties from '../Utils';

import style from '../Layout/LayoutStyle.scss';

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

	getSrcURL = () => {
	  if (this.props.params || this.props.externalProps) {
      const params = this.props.params || this.props.externalProps;
	    return UrlUtils.template(this.props.url, params);
	  }
	  return this.props.url;
	}

  subscribeToIframeEvents = () => {
    window.addEventListener('message', (e) => {
      try {
        const event = JSON.parse(e.data);
        console.log(event);
        this.handleEvent({ type: event.type, data: event.data });
      } catch (err) {
        console.warn('cannot handle event; this might be a system event that does not match the interactive iframe api', e);
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
    const { params } = this.props;
    let { url } = this.getSrcURL;
    for (let index = 0; index < eventIds.length; index += 1) {
      em.subscribe(eventIds[index], (eventData) => {
        const event = {};
        event.metadata = {
          type: eventIds[index],
        };
        event.data = eventData;
        try {
          const stringMessage = JSON.stringify(event);
          this.frameReference.contentWindow.postMessage(stringMessage, url);
        } catch (error) {
          console.error(error); // eslint-disable-line
        }
      });
    }
  }

  render() {
    const src = this.getSrcURL();
    const {       
      theme,
      themeProps,
    } = this.props;

    const themingProperties = buildThemeProperties(theme, themeProps);
    const themeStyles = composeThemeFromProps(style, themingProperties, {
      compose: 'Merge',
    });

    return (
      <Card {...this.props}>
        <iframe
          className={themeStyles.iframeCard}
          title={src}
          src={src}
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
  params: PropTypes.instanceOf(Object),
  externalProps: PropTypes.instanceOf(Object),
  themeProps: PropTypes.shape({
    compose: PropTypes.string,
    prefix: PropTypes.string,
  }),
  theme: PropTypes.instanceOf(Object),
};

IframeCard.defaultProps = {
  title: undefined,
  actions: undefined,
  eventManager: undefined,
  eventIds: [],
  themeProps: {
    compose: 'merge',
    prefix: 'configurableInteractiveLayout-',
  },
};
