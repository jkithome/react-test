import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import todo from './todo/reducer';

export default combineReducers({
  routing,
  todo
});
