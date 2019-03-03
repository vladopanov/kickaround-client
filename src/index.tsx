import 'babel-polyfill';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/site.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './components/App';
import { ErrorBoundary } from './components/common';

// import { configureFakeBackend } from './helpers';
// configureFakeBackend();

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
