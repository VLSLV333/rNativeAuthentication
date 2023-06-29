import axios from "axios";

const API_KEY = "AIzaSyAIr0uwfolFGKg5ea0BQmoWsMzCa9DO3Wg";

export async function authenticationHandler(mode, email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  const authId = response.data.idToken;

  return authId;
}

export function createUser(email, password) {
  return authenticationHandler("signUp", email, password);
}

export function loginUser(email, password) {
  return authenticationHandler("signInWithPassword", email, password);
}
