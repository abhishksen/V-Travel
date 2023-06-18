import {createSlice} from '@reduxjs/toolkit';

const buses_with_stops_slice = createSlice({
  name: 'buses_with_stops',
  initialState: {
    isLoading: false,
    data: [],
  },
  reducers: {
    setbuses(state, {payload}) {
      return {
        isLoading: false,
        data: payload,
      };
    },

    setLoading(state, {payload}) {
      state.isLoading = payload;
    },
  },
});

export const {setbuses, setLoading} = buses_with_stops_slice.actions;

export default buses_with_stops_slice.reducer;
