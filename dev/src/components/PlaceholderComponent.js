import React, { Component } from 'react';

import PropTypes from 'prop-types';
const reactStringReplace = require('react-string-replace');



class PlaceholderTextComponent extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const {text, regex, cssClass} = this.props;

        return (
            <span>
                {reactStringReplace(text, regex, (match, i) => (
                    <span className={cssClass}></span>
                ))}
            </span>
        )
    }
}

PlaceholderTextComponent.propTypes = {
    text: PropTypes.string.isRequired,
    regex: PropTypes.string,
    cssClass: PropTypes.string
}

PlaceholderTextComponent.defaultProps = {
    text: "",
    regex: /\$\{(.*?)\}/g,
    cssClass: ""
}

export default PlaceholderTextComponent;