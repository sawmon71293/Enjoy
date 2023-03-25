import { displayMessage, clearMessage } from './render.js';
const validate = (username, comment) => {
  const name = document.getElementById('nameError');
  const commentError = document.getElementById('commentError');
  if (!username) {
    displayMessage(name);
    return false;
  } else {
    clearMessage(name);
  }
  if (!comment) {
    displayMessage(commentError);
    return false;
  } else {
    clearMessage(commentError);
  }

  return true;
};
export default validate;
