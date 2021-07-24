import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import { configureStore } from '@reduxjs/toolkit'
import { FetchMiddleware } from './middleware/FetchMiddleware'
import { StoreMiddleware } from './middleware/StoreMiddleware'


const store = configureStore({reducer: reducers, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(FetchMiddleware).concat(StoreMiddleware)});
export type RootState = ReturnType<typeof store.getState>

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
