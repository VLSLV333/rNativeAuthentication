import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate } from "./store/authSlice";

import AppLoading from "expo-app-loading";

import { logout } from "./store/authSlice";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import IconButton from "./components/ui/IconButton";

import { Colors } from "./constants/styles";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();

  const iconPressHandler = () => {
    dispatch(logout());
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              color={tintColor}
              icon="exit"
              onPress={iconPressHandler}
              size={24}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [searchingForLocalToken, setSearchingForLocalToken] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkLocalToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(authenticate({token}));
      }
    };

    try {
      checkLocalToken();
    } catch (e) {}
    setSearchingForLocalToken(false);
  }, []);

  if (searchingForLocalToken) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
