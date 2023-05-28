import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    source: '',
    dest: '',
  },
  reducers: {
    setSource(state, {payload}) {
      state.source = payload;
    },
    setDest(state, {payload}) {
      state.dest = payload;
    },
    reset() {
      return {
        source: '',
        dest: '',
      };
    },
  },
});

export const {setDest, setSource, reset} = searchSlice.actions;

export default searchSlice.reducer;
