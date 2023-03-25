import { displayMessage, clearMessage } from './render.js';
const validate = (username, comment) => {
  const commentError = document.getElementById('commentError');
  if (!username || !comment) {
    displayMessage(commentError);
    return false;
  } else {
    clearMessage(commentError);
  }

  return true;
};
export default validate;
