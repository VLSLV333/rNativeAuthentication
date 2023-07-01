import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { setError } from '../store/errorSlice';
import { renewTokenAsync } from '../store/renewTokenAsync';

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import ErrorScreen from '../components/ui/ErrorScreen';

import Button from '../components/ui/Button';

import getSecretMessage from '../util/requestToFirebase';

import { Colors } from '../constants/styles';

function WelcomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getExpireTime = async () => {
      const expireTimeInMilSecondsString = await AsyncStorage.getItem(
        'expireTime'
      );

      if (expireTimeInMilSecondsString) {
        const timeNowInMiliseconds = new Date().getTime();
        const expireTimeInMilSeconds = Number(expireTimeInMilSecondsString);

        if (timeNowInMiliseconds >= expireTimeInMilSeconds) {
          dispatch(renewTokenAsync());
        } else {
          const newMilisecondsToExpire =
            expireTimeInMilSeconds - timeNowInMiliseconds;
          setTimeout(() => {
            dispatch(renewTokenAsync());
          }, newMilisecondsToExpire);
        }
      } else {
        const timeWhenTokenExpiresMiliseconds = new Date(
          new Date().getTime() + 57 * 60 * 1000
        )
          .getTime()
          .toString();

        AsyncStorage.setItem('expireTime', timeWhenTokenExpiresMiliseconds);
      }
    };

    getExpireTime();
  }, []);

  const errorMessage = useSelector((state) => state.errorSlice.errorMessage);

  const [secretMessage, setSecretMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.authSlice.token);

  const buttonHandler = async () => {
    setLoading(true);
    try {
      const secret = await getSecretMessage(token);
      setSecretMessage(secret);
    } catch (e) {
      if (e.response.data.error.message === 'TOKEN_EXPIRED') {
        dispatch(renewTokenAsync());
        dispatch(setError('Please, try again'));
      } else {
        dispatch(setError('Long time no see! Please, log in again:)'));
        dispatch(logout());
      }
    }

    setLoading(false);
  };

  if (errorMessage) {
    return <ErrorScreen errorText={errorMessage} />;
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, styles.text]}>Welcome!</Text>
      <Text style={styles.text}>You authenticated successfully!</Text>
      <View style={styles.conditionalContainer}>
        {!secretMessage && !loading && (
          <Button onPress={buttonHandler}>
            Get secret message from Firebase
          </Button>
        )}
        {loading && <ActivityIndicator size={'small'} color="white" />}
        {secretMessage && <Text style={styles.text}>{secretMessage}</Text>}
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  conditionalContainer: {
    marginTop: 20,
  },
  text: {
    color: Colors.primary800,
  },
});
