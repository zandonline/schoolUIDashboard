import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/styles/bootstrap.min.css';
import Index from './components/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
