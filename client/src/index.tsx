import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './reducers';

import { FetchMiddleware } from './middleware/FetchMiddleware'
import { StoreMiddleware } from './middleware/StoreMiddleware'


const store = createStore(reducers, applyMiddleware(FetchMiddleware, StoreMiddleware));
//const store = createStore(reducers, applyMiddleware(FetchMiddleware, StoreMiddleware));
export type RootState = ReturnType<typeof store.getState>

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
