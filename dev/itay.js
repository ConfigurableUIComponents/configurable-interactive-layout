import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

//import Store from './store'

@observer
class Itay extends React.Component {

    constructor(props) {
    super(props);
    // this.state = {
    //   counter: 0,
    // };
  }

    componentWillMount() {
        console.log('itay mounted');
    }


  render() {
    console.log('itay1 rendered');
    return(
        <div>
            <div> {this.props.store.project.status} </div>
            <div> {'custom data' + JSON.stringify(this.props.store.customData)} </div>
        </div>);

  }
}

export default Itay;
