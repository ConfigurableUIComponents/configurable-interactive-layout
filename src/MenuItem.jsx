/* eslint-disable */
import React from 'react';


export default class MenuItem extends React.Component {


	render() {
		//let personalizedHeader =  renderPersonalizedHeader(this.props.dashboard, onPersonalizationClicked);
    const { displayName, onClick , isSelected, id } = this.props;
    let itemClass = "item dashboardItem";
    itemClass += (isSelected ? " selected" : "");
    return(
        <div onClick= {() => onClick({ id } )}
             className={itemClass}
             key={id}
             title={displayName}>
          <div className = "dashboardName">{displayName}</div>
        </div>
    )

	}

}