/* eslint-disable */
import React from 'react';
import WidgetList from './WidgetList.jsx';
//import {VelocityTransitionGroup} from 'velocity-react';
import '../../res/scss/components/sidebar.scss';
import MenuItem from '../../../configurable-interactive-layout/src/MenuItem';

/*

const renderPersonalizedHeader = (currentDashboard, onPersonalizationClicked) => {
	let itemClassName = "item dashboardItem";
	let personalizedLayoutLabel = LocalizationService.translate('dashboard_sidebar_personal_layout') || "Personalized Layout";
	itemClassName += DashboardService.isPersonalizedDashboard(currentDashboard) ?  " selected" : "";
	return (<div onClick= {(event) =>{onPersonalizationClicked(currentDashboard, event)}}
	title = {personalizedLayoutLabel}
	className = {itemClassName}>{personalizedLayoutLabel}</div>);
};
*/

/*

const onDashboardSelected = (item) => {
	DashboardStore.dispatch(selectDashboard(item))
};

const onPersonalizationClicked = (currentDashboard) =>{
	DashboardStore.dispatch(selectPersonalizedLayout(currentDashboard))
};

const onWidgetSelected = (item, currentDashboard) => {
		DashboardStore.dispatch(widgetSelected(item, currentDashboard));
}
*/

/* eslint-disable */

const onRoleClicked = (item) => {
	alert("Role selected");
};

class Sidebar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedItemId: props.selectedItemId
    }
  }



	renderSidebarHeader () {
		return (
			<div className = "sidebarHeader clearfix">
				<div className = "close" onClick={this.props.onCloseSidebar}></div>
				<div className = "title" title={this.props.headerTitle}> {/*add localization?*/}
					{this.props.headerTitle}
				</div>
			</div>
	)}

  // renderRolesList (items, onItemClicked, selectedItem) {
  //   if(items){
  //     return (
  //       items.map((item) => { // map only the not-personalized (role-layouts)
  //         let itemClass = "item dashboardItem"
  //         itemClass += (selectedItem && item.id === selectedItem.id ? " selected" : "");
  //         let name = item.name;
  //         return(
		// 				<div onClick= {(event) =>{onItemClicked(item, event)}}
		// 						 className={itemClass}
		// 						 key={item.id}
		// 						 title={name}>
		// 					<div className = "dashboardName">{name}</div>
		// 				</div>
  //         )
  //       })
  //     );
  //   }
  //   return null;
  // }

//   [
//       {
//         type: 'button',
//         id: 'roleA',
//         displayName: 'a',
//         onClick: (id) => console.log(`menu item ${id} clicked`)
//       },
// {
//   type: 'checklist',
//   id: 'checkList1',
//   displayName: 'personalization',
//   items: [{
//     id: 'cardA', displayName: 'card A'
//   }],
//   onClick: (id) => console.log(`menu item ${id} selected`)
//     }
//
//     ]

  getClickHandler(id, callback) {
     return (data) => this.setState({selectedItemId: id}, callback(data));
  }

	render() {
		//let personalizedHeader =  renderPersonalizedHeader(this.props.dashboard, onPersonalizationClicked);
		return (
			<div className = {this.props.opened ? "sidebar opened" : "sidebar"} >
				{this.renderSidebarHeader()}
        {
          this.props.items.map((item) => {
            const {id, displayName, onClick} = item;
            const isSelected = item.id === this.state.selectedItemId;
            if (item.type === 'button') return <MenuItem id={id} displayName={displayName}
                                                         onClick={this.getClickHandler(id, onClick)} isSelected={isSelected}/>;
            //if (item.type === 'checklist') return <Checklist id={id} displayName={displayName} isSelected={isSelected} onClick={this.getClickHandler(onClick)}/>;
          })
        }
				{	/*
				{personalizedHeader}
				<VelocityTransitionGroup component="div" enter="slideDown" leave="slideUp">
					{DashboardService.isPersonalizedDashboard(this.props.dashboard) ? <WidgetList {...this.props} onWidgetSelected = {onWidgetSelected}/> : null}
				</VelocityTransitionGroup>*/}
			</div>
		);
	}

	
}

export default Sidebar;