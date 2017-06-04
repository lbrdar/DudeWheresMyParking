import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import * as Reducers from '../reducers';

export default createStore(
  combineReducers({ ...Reducers }),
  applyMiddleware(thunkMiddleware)
);