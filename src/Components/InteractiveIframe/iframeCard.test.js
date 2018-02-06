import React from 'react';
import { mount, shallow } from 'enzyme';
import IframeCard from './iframeCard';

const eventManager = {
  subscribe() {
    return true;
  },
};

describe('Interactive Iframe', () => {
  it('subscribes to all events passed', () => {
    const spy = jest.spyOn(eventManager, 'subscribe');
    const component = (<IframeCard configId="iframecard" eventManager={eventManager} url="testUrl" eventIds={['a', 'b', 'c']} />);
    mount(component);
    expect(spy).toHaveBeenCalledTimes(3);
    spy.mockReset();
    spy.mockRestore();
  });
});

describe('Interactive Iframe', () => {
/* eslint-disable */
	const params = {
		amdocsServer: 'http://eaasrt:40100',
		reportServer: 'http://ilmtx241.eaas.amdocs.com:34600',
		userId: 'AFFSuper',
	};
	const url = '${reportServer}/AmdocsOSS/NetworkNavigator/Report/index.html?userID=${userID}&nosubheader=1';
	const urlAfterTemplating = `${params.reportServer}/AmdocsOSS/NetworkNavigator/Report/index.html?userID=${params.userId}&nosubheader=1`;
  /* eslint-enable */

  it('getSrcUrl returns the right url when passing valid params and url', () => {
    const component = (<IframeCard configId="iframecard" eventManager={eventManager} url={url} params={params} eventIds={['a', 'b', 'c']} />);
    const iFrame = mount(component);
    expect(iFrame.instance().getSrcURL()).toEqual(urlAfterTemplating);
  });
  it('getSrcUrl returns the right url when passing invalid params and valid url', () => {
    const component = (<IframeCard configId="iframecard" eventManager={eventManager} url={url} params={{}} eventIds={['a', 'b', 'c']} />);
    const iFrame = mount(component);
    expect(iFrame.instance().getSrcURL()).toEqual(url);
  });
  it('getSrcUrl returns the right url when not passing any params and valid url', () => {
    const component = (<IframeCard configId="iframecard" eventManager={eventManager} url={url} eventIds={['a', 'b', 'c']} />);
    const iFrame = mount(component);
    expect(iFrame.instance().getSrcURL()).toEqual(url);
  });
  it('iframe is rendered with right props, src prop, when passing vlaid url and params', () => {
    const iFrameCard = shallow(<IframeCard configId="iframecard" eventManager={eventManager} url={url} params={params} eventIds={['a', 'b', 'c']} />);
    const iframe = iFrameCard.find('iframe');
    expect(iframe.props().src).toEqual(urlAfterTemplating);
  });
  it('iframe is rendered with right props, title prop, when passing vlaid url and params', () => {
    const iFrameCard = shallow(<IframeCard configId="iframecard" eventManager={eventManager} url={url} params={params} eventIds={['a', 'b', 'c']} />);
    const iframe = iFrameCard.find('iframe');
    expect(iframe.props().title).toEqual(urlAfterTemplating);
  });
});

