import React from 'react';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import configureStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import './utils/normalize';
import './style/reset.css';
import './style/common.css';

const store = configureStore();
// const unsubscribe = store.subscribe(() =>
//     console.log('state: ',store.getState())
// );

ReactDOM.render(
    <Root store={store} />,
    document.querySelector('.root')
);
registerServiceWorker();
