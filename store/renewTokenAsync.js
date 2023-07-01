import AsyncStorage from '@react-native-async-storage/async-storage';

import { renewHandler, logout } from './authSlice';

import { setError } from './errorSlice';

import { API_KEY } from '../util/auth';

import axios from 'axios';

export const renewTokenAsync = () => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const refreshToken = getState((state) => state.authSlice.refreshToken);

      const responseWithRefreshInfo = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
        `grant_type=refresh_token&refresh_token=${refreshToken}`
      );

      const token = responseWithRefreshInfo.data.id_token;
      const latestRefreshToken = responseWithRefreshInfo.data.refresh_token;

      return { token, latestRefreshToken };
    };
    try {
      const { token, latestRefreshToken } = await fetchData();

      const timeWhenTokenExpiresMiliseconds = new Date(
        new Date().getTime() + 57 * 60 * 1000
      )
        .getTime()
        .toString();
      AsyncStorage.setItem('expireTime', timeWhenTokenExpiresMiliseconds);
      dispatch(renewHandler({ token, latestRefreshToken }));
    } catch (err) {
      dispatch(setError('Long time no see! Please, log in again:)'));
      dispatch(logout());
    }
  };
};
