import React, { Component } from 'react';
import LayoutManager from './layout-manager';
import Store from './store';

export default class TestApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
        param1: 0
    }
    Store.addDynamicAttribute('stable', 123);
    Store.addDynamicChildAttribute('shulaStable', 'child', 456);
    setInterval(() => {
        const time = new Date().getTime();
        Store.setProjectStatus(time);
       // Store.addDynamicAttribute('kobi'+time, time);
        //Store.addDynamicChildAttribute('shula'+time, time, time);
       // this.setState({param1: ++this.state.param1});
    }, 1000)
      setInterval(() => {
          const time = new Date().getTime();
          Store.addDynamicAttribute('stable', time);
          Store.addDynamicChildAttribute('shulaStable', 'child', time);
          // this.setState({param1: ++this.state.param1});
      }, 2000)

  }

  render() {
    return (<div>
          <LayoutManager param1={this.state.param1} store={Store}/>
      </div>)
   }
}
