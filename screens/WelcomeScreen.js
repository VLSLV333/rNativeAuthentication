import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { timeOutHandler } from "../store/authSlice";

import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Button from "../components/ui/Button";

import getSecretMessage from "../util/requestToFirebase";

import { Colors } from "../constants/styles";

function WelcomeScreen() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(timeOutHandler());

    const getExpireTime = async () => {
      const data = await AsyncStorage.getItem('expireTime')
      console.log(data, 'inside')
      return data
    }

    console.log(getExpireTime())


    // setTimeout(() => {
    //   state.needsNewToken = true;

    //   // AsyncStorage.removeItem("expireTime");

    //   console.log("removed");

    //   // AsyncStorage.removeItem("token");

    //   //   }, payload);
    // }, 3000);


  }, []);

  const needsNewToken = useSelector((state) => state.authSlice.needsNewToken);

  // console.log(needsNewToken);











  const [secretMessage, setSecretMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.authSlice.token);

  const buttonHandler = async () => {
    setLoading(true);
    const secret = await getSecretMessage(token);
    setSecretMessage(secret);
    setLoading(false);
  };

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
        {loading && <ActivityIndicator size={"small"} color="white" />}
        {secretMessage && <Text style={styles.text}>{secretMessage}</Text>}
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  conditionalContainer: {
    marginTop: 20,
  },
  text: {
    color: Colors.primary800,
  },
});
