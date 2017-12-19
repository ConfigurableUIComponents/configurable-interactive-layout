import React from 'react';
import Itay from './itay';
import Itay2 from './itay2';

class Card extends React.Component {

    constructor(props) {
    super(props);
    // this.state = {
    //   counter: 0,
    // };
  }


  render() {
    return(
        <div>
            {this.props.param1}
            <Itay  {...this.props}/>
            <Itay2  {...this.props}/>
        </div>);

  }
}

export default Card;
