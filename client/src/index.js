import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './src/stylesheets/bootstrap-reset.css';
import './src/stylesheets/slidebars.css';
import './src/stylesheets/style.css';
import './src/stylesheets/style-responsive.css';
import registerServiceWorker from './registerServiceWorker';
import Main from "./src/components/Main";

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
