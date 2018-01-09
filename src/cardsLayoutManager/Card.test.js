import React from 'react';
import { mount } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  const expectedTitle = 'testTitle';
  const expectedId = 'testId';

  it('renders one title when title prop passed', () => {
    const component = (<Card id={expectedId} title={expectedTitle}><div>test123</div></Card>);
    const cardWithTitle = mount(component);
    expect(cardWithTitle.find('.card')).toHaveClassName('with-title');
  });

  it("doesn't render a title when title prop isn't passed", () => {
    const component = (<Card id={expectedId}><div>test123</div></Card>);
    const cardWithTitle = mount(component);
    expect(cardWithTitle.find('.card')).not.toHaveClassName('with-title');
  });

  it('shows an action menu button when actions are configured', () => {

  });
});

