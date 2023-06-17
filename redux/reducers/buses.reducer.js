import {createSlice} from '@reduxjs/toolkit';

const busesSlice = createSlice({
  name: 'buses',
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

export const {setbuses, setLoading} = busesSlice.actions;

export default busesSlice.reducer;
