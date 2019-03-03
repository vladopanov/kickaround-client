import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { users } from './userReducer';
import { alert } from './alertReducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert
});

export default rootReducer;