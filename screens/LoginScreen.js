import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../store/errorSlice';

import { authenticate } from '../store/authSlice';

import AuthContent from '../components/Auth/AuthContent';

import { loginUser } from '../util/auth';

import LoadingOverlay from '../components/ui/LoadingOverlay';

import ErrorScreen from '../components/ui/ErrorScreen';

function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errorSlice.errorMessage);

  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const { authId: token, refreshToken } = await loginUser(email, password);
      
      const timeWhenTokenExpiresMiliseconds = new Date(
        new Date().getTime() + 57 * 60 * 1000
      )
        .getTime()
        .toString();

      AsyncStorage.setItem('expireTime', timeWhenTokenExpiresMiliseconds);

      dispatch(authenticate({ token, refreshToken }));
    } catch (e) {
      if (e.response.data.error.message === 'EMAIL_NOT_FOUND') {
        dispatch(
          setError(
            'This email is not yet registered. Please check email, or create new user:)'
          )
        );
      } else if (e.response.data.error.message === 'INVALID_PASSWORD') {
        dispatch(
          setError('You have provided wrong password. Please check it:)')
        );
      } else {
        dispatch(setError('Something went wrong. Please, try again later:)'));
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay message="Logging in..." />;
  }

  if (errorMessage) {
    return <ErrorScreen errorText={errorMessage} />;
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
