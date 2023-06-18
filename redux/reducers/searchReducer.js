import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    source: '',
    dest: '',
    results: [],
  },
  reducers: {
    setSource(state, {payload}) {
      state.source = payload;
    },
    setDest(state, {payload}) {
      state.dest = payload;
    },
    setResults(state, {payload}) {
      state.results = payload;
    },
    reset() {
      return {
        source: '',
        dest: '',
        results: [],
      };
    },
  },
});

export const {setDest, setSource, reset, setResults} = searchSlice.actions;

export default searchSlice.reducer;
