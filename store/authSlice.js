import AsyncStorage from "@react-native-async-storage/async-storage";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  needsNewToken: false,
};

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    authenticate: (state, { payload }) => {
      state.token = payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem("token", payload);

      const timeWhenTokenExpiresMiliseconds = new Date(
        new Date().getTime() + 57 * 60 * 1000
      )
        .getTime()
        .toString();

      AsyncStorage.setItem("expireTime", timeWhenTokenExpiresMiliseconds);

      //   const userEnteredIn50Minutes = new Date(
      //     new Date().getTime() + 50 * 60 * 1000
      //   ).getTime();

      //   //   AsyncStorage.setItem("token", payload);

      //   //   setTimeout(() => {
      //   //     console.log("vlad auth");
      //   //   }, 1000);

      //   //    1000 * 60 * 60 = 1 hour

      //   const test = JSON.stringify(new Date());
      //   const test2 = new Date().toString();

      //   // console.log(test)
      //   // console.log(test2)

      //   console.log(timeWhenTokenExpires);

      //   // console.log(new Date(new Date().getTime() + 60*60*1000).getTime() > new Date(timeWhenTokenExpires).getTime())
      //   // console.log(new Date(timeWhenTokenExpires).getTime() > new Date(new Date().getTime() + 50*60*1000).getTime())

      //   // const sevenMinutes = (new Date(timeWhenTokenExpires) - new Date(userEnteredIn50Minutes)) / 60 / 1000

      //   const sevenMinutesInMiliseconds =
      //     new Date(timeWhenTokenExpires).getTime() -
      //     new Date(userEnteredIn50Minutes).getTime();

      //   console.log(sevenMinutesInMiliseconds);

      //   const milisecondsDifferenceBetwenFutureAndNowString =
      //     sevenMinutesInMiliseconds.toString();

      //   const milisecondsDifferenceBetwenFutureAndNowNumber = Number(
      //     milisecondsDifferenceBetwenFutureAndNowString
      //   );

      //   console.log(milisecondsDifferenceBetwenFutureAndNowNumber);

      //   console.log(
      //     (new Date(timeWhenTokenExpires) - new Date(userEnteredIn50Minutes)) / 60 / 1000
      //   );

      //   console.log(
      //     (new Date(timeWhenTokenExpires).getTime() - new Date(userEnteredIn50Minutes).getTime())
      //   );

      //   console.log(sevenMinutes * 60 * 1000)

      //   const transform1 = new Date(JSON.parse(test));
      //   const transform2 = new Date(test2);

      //   const checkIfSame1 = JSON.stringify(transform1);
      //   const checkIfSame2 = transform2.toString();

      // console.log(checkIfSame1)
      // console.log(checkIfSame2)
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.needsNewToken = false;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("expireTime");
    },
    timeOutHandler: (state, { payload }) => {
    //   setTimeout(() => {
    //     state.needsNewToken = true;

    //     // AsyncStorage.removeItem("expireTime");

    //     console.log("removed");

    //     // AsyncStorage.removeItem("token");

    //     //   }, payload);
    //   }, 3000);
    },
  },
});

export default authSlice.reducer;

export const { authenticate, logout, timeOutHandler } = authSlice.actions;
