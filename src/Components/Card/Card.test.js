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

  it('render child and grandchild', () => {
    const component = (<Card id={expectedId} title={expectedTitle}><div className="child">Kobi<span className="grandchild">123</span></div></Card>);
    const cardwithChild = mount(component);
    expect(cardwithChild.find('.child')).toHaveLength(1);
    expect(cardwithChild.find('.grandchild')).toHaveLength(1);
  });
});

