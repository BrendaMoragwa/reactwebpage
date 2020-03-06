import React from 'react';
import ReactDOM from 'react-dom';
import "./css/template.css";
// import "./css/theme.scss";
import "./css/style.scss";
import "./css/responsive.css";
import "./css/colors.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
