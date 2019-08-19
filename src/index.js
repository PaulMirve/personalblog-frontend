import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from './reducers';
import history from './history';
import 'normalize.css';

document.body.style = "background: #68C5DB; font-family: 'Noto Sans', sans-serif;";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.querySelector('#root')
);