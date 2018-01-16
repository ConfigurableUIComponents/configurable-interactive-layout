import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Application from './Application';



const div = document.createElement('div');
div.setAttribute('id', 'cards-framework-container');
document.body.appendChild(div);

ReactDOM.render(
    <Application/>,
    document.getElementById('cards-framework-container'),
);
