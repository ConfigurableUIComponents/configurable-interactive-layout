import React from 'react';
import { mount } from 'enzyme';
import Header from './CardHeader';

describe('Header', () => {
  it('renders one title when title prop passed', () => {
    const component = (<Header id="headerTest" title="titleTest" />);
    const header = mount(component);
    expect(header.instance().createHeaderClassName()).toEqual('card-header ');
  });

  it('renders an action menu when one action is passed by props', () => {
    const actions = [
      {
        id: 'myAction',
        displayName: 'my action',
        iconURL: 'www.com',
      }];
    const component = (<Header id="headerTest" title="titleTest" actions={actions} />);
    const HeaderActions = mount(component);
    expect(HeaderActions.find('.actions-menu.collapsed')).toHaveLength(1);
  });

  it('renders collapsed (not expanded) action menu', () => {
    const actions = [
      {
        id: 'myAction',
        displayName: 'my action',
        iconURL: 'www.com',
      },
      {
        id: 'my action2',
        displayName: 'my action2',

        iconURL: 'www.com',
      },
    ];
    const component = (<Header id="headerTest" title="titleTest" actions={actions} />);
    const HeaderActions = mount(component);
    expect(HeaderActions.find('.actions-menu.expanded')).toHaveLength(0);
  });

  it('opens the actions menu and changes the class name to "expanded"', () => {
    const actions = [
      {
        id: 'myAction',
        displayName: 'restart counter',
        iconURL: 'icons/trashbin.svg',
        iconURLHover: 'icons/trashbin_hover.svg',
      },
    ];
    const component = (<Header id="headerTest" title="titleTest" actions={actions} />);
    const HeaderActions = mount(component);
    const actionMenuButton = HeaderActions.find('.actions-menu.collapsed');
    expect(actionMenuButton).toHaveLength(1);
    actionMenuButton.simulate('click');
    expect(HeaderActions.find('.actions-menu.expanded')).toHaveLength(1);
    expect(HeaderActions.find('.action-item')).toHaveLength(1);
  });

  // it('simulates click on an action button', () => {
  //   const actions = [
  //     {
  //       id: 'myAction',
  //       displayName: 'restart counter',
  //       iconURL: 'icons/trashbin.svg',
  //       iconURLHover: 'icons/trashbin_hover.svg',
  //       onClick: () => //TODO
  //     },
  //   ];
  //   const component = (<Header id="headerTest" title="titleTest" actions={actions} />);
  //   const HeaderActions = mount(component);
  //   const actionMenuButton = HeaderActions.find('.actions-menu.collapsed');
  //   expect(actionMenuButton).toHaveLength(1);
  //   actionMenuButton.simulate('click');
  //   expect(HeaderActions.find('.action-item')).toHaveLength(1);
  // });
});

