/* eslint-disable */
import React, { Component } from 'react';
import '../res/scss/components/mainApp.scss';
import MenuItem from '../../configurable-interactive-layout/src/MenuItem';
import '../res/scss/components/sidebar.scss';

export default class ConfigurableMenu extends Component {
  constructor(props) {
    super(props);
  }

  renderSidebarHeader () {
    return (
        <div className = "sidebarHeader clearfix">
          <div className = "close" onClick={this.props.onClose}></div>
          <div className = "title" title={this.props.title}>
            {this.props.title}
          </div>
        </div>
    )}


  render() {
   return (

        <div className = {this.props.open ? "sidebar opened" : "sidebar"} >
          {this.renderSidebarHeader()}
          {
            this.props.items.map((item) => {
              const {id, displayName, onClick} = item;
              const isSelected = item.id === this.props.selectedItem.id;
              if (item.type === 'button') return <MenuItem id={id} displayName={displayName}
                                                           onClick={this.props.onSelectionChnage} isSelected={isSelected}/>;
             // if checkbox
              if (item.type === 'checkbox') return <MenuItem id={id} displayName={displayName}
                                                           onClick={this.props.onSelectionChnage} isSelected={isSelected}/>;



            })
          }
        </div>



    );
  }
}
