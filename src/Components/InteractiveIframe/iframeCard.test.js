import React from 'react';
import { mount } from 'enzyme';
import IframeCard from './iframeCard';

const eventManager = {
  subscribe() {
    return true;
  },
};

describe('Interactive Iframe', () => {
  it('subscribes to all events passed', () => {
    const spy = jest.spyOn(eventManager, 'subscribe');
    const component = (<IframeCard eventManager={eventManager} url="testUrl" eventIds={['a', 'b', 'c']} />);
    mount(component);
    expect(spy).toHaveBeenCalledTimes(3);
    spy.mockReset();
    spy.mockRestore();
  });
});

