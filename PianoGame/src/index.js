import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/slick/slick.scss';

// Redux Thunk
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Single Store
const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

//store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()))

//The Router component is the first step to go routing successfully.
//It serves as the container for every other route component.
//
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,    
    document.getElementById('main')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();