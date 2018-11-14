import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/app/components/app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
