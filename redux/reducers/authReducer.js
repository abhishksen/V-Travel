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

    set_service(state, {payload}) {
      state.service_type = payload;
    },
  },
});

export const {setUser, setLoading, set_service} = authSlice.actions;

export default authSlice.reducer;
