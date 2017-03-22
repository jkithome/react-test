import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';

import reducer from './modules';

const middleware = [ReduxThunk];
const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const enhancer = compose(
  applyMiddleware(...middleware),
  devtools
);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  return store;
}
