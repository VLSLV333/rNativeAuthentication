import AsyncStorage from '@react-native-async-storage/async-storage';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
  refreshToken: null,
};

const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    authenticate: (state, { payload }) => {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.isAuthenticated = true;
      AsyncStorage.setItem('token', payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('expireTime');
    },
    renewHandler: (state, { payload }) => {
      state.token = payload.token;
      state.refreshToken = payload.latestRefreshToken;
      state.isAuthenticated = true;
      AsyncStorage.setItem('token', payload.token);
    },
  },
});

export default authSlice.reducer;

export const { authenticate, logout, renewHandler } = authSlice.actions;
