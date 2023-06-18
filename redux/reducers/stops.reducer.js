import {createSlice} from '@reduxjs/toolkit';

const stopsReducer = createSlice({
  name: 'stops',
  initialState: {
    stops: [],
    isLoading: false,
  },
  reducers: {
    setStops(state, {payload}) {
      return {
        stops: payload,
        isLoading: false,
      };
    },

    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    },
  },
});

export const {setStops, setIsLoading} = stopsReducer.actions;

export default stopsReducer.reducer;
