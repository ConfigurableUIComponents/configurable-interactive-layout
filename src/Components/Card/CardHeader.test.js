import React from 'react';
import { mount } from 'enzyme';
import Header from './CardHeader';

describe('Header', () => {
  it('renders one title when title prop passed', () => {
    const component = (<Header cardId="headerTest" title="titleTest" />);
    const header = mount(component);
    expect(header.instance().createHeaderClassName()).toEqual('card-header ');
  });
});

