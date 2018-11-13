import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './screens/app/App';
import store from './screens/app/state/store/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
