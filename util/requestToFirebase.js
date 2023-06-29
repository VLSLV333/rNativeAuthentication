import axios from "axios";

const messageLink = `https://learnauthenticationrnative-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=`;

export default async function getSecretMessage(token) {
  const response = await axios.get(messageLink + token);
  const secretMessage = response.data;

  //   console.log(secretMessage);

  return secretMessage;
}
