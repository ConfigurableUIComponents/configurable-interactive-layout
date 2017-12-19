import React from 'react';
import Card from './card';

class LayoutManager extends React.Component {

    constructor(props) {
    super(props);
    // this.state = {
    //   counter: 0,
    // };
  }


  render() {
    return(
        <div>
             {<Card {...this.props} />}
        </div>);

  }
}

export default LayoutManager;
