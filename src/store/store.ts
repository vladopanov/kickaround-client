import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const immutableMiddleware = reduxImmutableStateInvariant();

export const store = createStore(
  rootReducer,
  applyMiddleware(immutableMiddleware, thunkMiddleware)
);
