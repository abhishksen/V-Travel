import {createSlice} from '@reduxjs/toolkit';

const intervalSearchSlice = createSlice({
  name: 'internalSearchData',
  initialState: {
    source: null,
    dest: null,
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

export const {setDest, setSource, reset, setResults} =
  intervalSearchSlice.actions;

export default intervalSearchSlice.reducer;
