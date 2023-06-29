import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setError } from "../store/errorSlice";

import { authenticate } from "../store/authSlice";

import AuthContent from "../components/Auth/AuthContent";

import LoadingOverlay from "../components/ui/LoadingOverlay";

import ErrorScreen from "../components/ui/ErrorScreen";

import { createUser } from "../util/auth";

function SignupScreen() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errorSlice.errorMessage);

  const signUpHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await createUser(email, password);
      dispatch(authenticate(token));
    } catch (e) {
      console.log(e.response.data.error.message);
      if (e.response.data.error.message === "EMAIL_EXISTS") {
        dispatch(
          setError(
            "This email is already registered. Please just login using it:)"
          )
        );
      } else if (
        e.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER"
      ) {
        dispatch(setError("Too much attempts. Please, try again later:)"));
      } else if (e.response.data.error.message === "INVALID_EMAIL") {
        dispatch(setError("Please, provide real email:)"));
      } else {
        dispatch(setError("Something went wrong. Please, try again later:)"));
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay message="Creating your profile..." />;
  }

  if (errorMessage) {
    return <ErrorScreen errorText={errorMessage} />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
