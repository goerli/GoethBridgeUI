import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import bridgeReducer from './bridgeReducer';

const store = createStore(
  bridgeReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
