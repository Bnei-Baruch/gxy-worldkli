import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {createBrowserHistory} from 'history';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const router = routerMiddleware(createBrowserHistory());

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, router)
  );
}
