import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import * as actionTypes from '../sagas/actionTypes.js';
import { promiseTypeSuffixes } from '../constants.js';

// other reducers
import appReducer from './appReducer.js';
import loginReducer from './loginReducer.js';
import homeReducer from './homeReducer.js';

let rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  app: appReducer,
  login: loginReducer,
  home: homeReducer,
});

// reset app state on logout HOR
const resetOnLogout = (reducer, initialState) => (state, action) => {
  if (action.type === actionTypes.LOGOUT.success) {
    // Delete whole app state except some fixtures.
    state = {
      app: state.app, // handle app reducer inside itself
    };
  }
  return reducer(state, action);
};
rootReducer = resetOnLogout(rootReducer, {});

// catch all _FAILUREs HOR
const errorReporting = (reducer, initialState) => (state, action) => {
  if (
    action.type.endsWith(`_${promiseTypeSuffixes[2]}`) &&
    action.type !== actionTypes.LOGIN.failure &&
    action.type !== actionTypes.REGISTER.failure
  ) {
    // TODO: connect some errorReporting
    alert(action);
  }
  return reducer(state, action);
};
rootReducer = errorReporting(rootReducer, {});

export default rootReducer;
