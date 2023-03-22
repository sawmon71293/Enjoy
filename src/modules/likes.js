import {BASE_MICROVERSE_URL} from './constants.js';
import createApp from './app.js';

export const getLikes = async () => {
  const id = await createApp();
  const likes = await fetch(`${BASE_MICROVERSE_URL}/${id}/likes`,
    {
      method: 'GET',
    });
  let data = [];
  try {
    data = await likes.json();
  } catch (err) {
    data = [];
  }
  return data;
};