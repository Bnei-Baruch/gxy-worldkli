import { combineReducers } from 'redux';
import user from './user';
import busyIndicator from './busyIndicator';
import notification from './notification';

const rootReducer = combineReducers({
  user,
  busyIndicator,
  notification,
});

export default rootReducer;
