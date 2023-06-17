import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './authReducer';
import searchReducer from './searchReducer';
import stopsReducer from './stops.reducer';
import busesReducer from './buses.reducer';

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  stop: stopsReducer,
  buses: busesReducer,
});
