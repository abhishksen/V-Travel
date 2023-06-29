import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {isLoggedIn: false},
  reducers: {
    setUser(state, {payload}) {
      return payload;
    },

    setLoading(state, {payload}) {
      state.isLoading = payload;
    },
  },
});

export const {setUser, setLoading} = authSlice.actions;

export default authSlice.reducer;
