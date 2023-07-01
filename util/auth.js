import axios from 'axios';

export const API_KEY = 'AIzaSyAIr0uwfolFGKg5ea0BQmoWsMzCa9DO3Wg';

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
  const refreshToken = response.data.refreshToken;

  return { authId, refreshToken };
}

export function createUser(email, password) {
  return authenticationHandler('signUp', email, password);
}

export function loginUser(email, password) {
  return authenticationHandler('signInWithPassword', email, password);
}
