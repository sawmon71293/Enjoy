import { displayMessage, clearMessage } from './render.js';
const validate = (username, comment) => {
  const name = document.getElementById('nameError');
  const commentError = document.getElementById('commentError');
  if (!username) {
    console.log(!username);
    displayMessage(name);
    return false;
  }

  if (!comment) {
    displayMessage(commentError);
    return false;
  }
  clearMessage(name);
  clearMessage(commentError);

  return true;
};
export default validate;
