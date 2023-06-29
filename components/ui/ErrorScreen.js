import { View, Text, StyleSheet } from "react-native";

import { useDispatch } from "react-redux";
import { setError } from "../../store/errorSlice";

import Button from "./Button";

import { Colors } from "../../constants/styles";

export default function ErrorScreen({ errorText }) {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(setError(null));
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, styles.text]}>Sorry!</Text>
      <Text style={styles.text}>{errorText}</Text>
      <Button onPress={closeHandler} containerStyle={styles.btnStyle}>
        <Text>Close</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    color: Colors.primary800,
    textAlign: "center",
    marginBottom: 25,
  },
  btnStyle: {
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
