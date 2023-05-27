import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser(state, {payload}) {
      return payload;
    },
  },
});

export const {setUser} = authSlice.actions;

export default authSlice.reducer;
