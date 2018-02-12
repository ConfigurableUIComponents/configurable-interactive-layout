/* eslint-disable */
import React from 'react';
//import DashboardService from './../../service/DashboardService';
import WidgetUtils from '../utils/WidgetUtils';

const renderWidgetsList = (items, onItemClicked, currentDashboard) => {
	if(items){
		return (
			items.sort(WidgetUtils.widgetCompare).map((item) => {
				let name = item.nameLocalizationKey ? LocalizationService.translate(item.nameLocalizationKey) : item.name;
				let itemClass = "item widgetItem";
				let selected = (currentDashboard.widgets).some(widget =>(widget.id == item.id))? true : false;
				return(
					<div className= {selected ? itemClass + " selected" : itemClass} title={name} key={item.id} onClick= {(event) =>{onItemClicked(item, currentDashboard, event)}}>
						<span className = "checkbox"/>
						<span className ="widgetName">{name}</span>	
					</div>
				)
			})
		);
	}
	return null;
};

class WidgetList extends React.Component {

	render() {
		let availableWidgetsList = renderWidgetsList(this.props.widgets, this.props.onWidgetSelected, this.props.dashboard);
		return (
				<div className="widgetList">
					{availableWidgetsList}
				</div>
		);
	}

	
}

export default WidgetList;