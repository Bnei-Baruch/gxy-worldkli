import { combineReducers } from 'redux';
import user from './user';
import busyIndicator from './busyIndicator';
import notification from './notification';
import { reducer as oidcReducer } from 'redux-oidc';

const rootReducer = combineReducers({
  user,
  busyIndicator,
  notification,
  oidc: oidcReducer
});

export default rootReducer;
