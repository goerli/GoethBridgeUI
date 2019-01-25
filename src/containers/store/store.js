import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import bridgeReducer from './bridgeReducer';

const store = createStore(
  bridgeReducer,
  applyMiddleware(thunk),
);

export default store;
