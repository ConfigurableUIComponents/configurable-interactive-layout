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

    }

    render() {
        console.log('itay2 rendered');
    return(
        <div>
            <div> {this.props.store.counterShula} </div>
        </div>);

  }
}

export default Itay;
