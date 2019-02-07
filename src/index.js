import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './containers/store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
