import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './authReducer';
import searchReducer from './searchReducer';
import stopsReducer from './stops.reducer';
import busesReducer from './buses.reducer';
import buses_with_stopsReducer from './buses_with_stops.reducer';
import internalSearchDataReducer from './internalSearchData.reducer';

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  stops: stopsReducer,
  buses: busesReducer,
  buses_with_stops: buses_with_stopsReducer,
  internalSearchData: internalSearchDataReducer,
});
