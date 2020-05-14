import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Loading from './shared/components/Loading';
import { Suspense } from 'react';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/slick/slick.scss';
import './index.scss';


// Redux Thunk
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

// Single Store
const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

//store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()))

//The Router component is the first step to go routing successfully.
//It serves as the container for every other route component.
//
ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </Suspense>,
  document.getElementById('main')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
