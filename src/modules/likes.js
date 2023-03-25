import { BASE_MICROVERSE_URL } from './constants.js';
import createApp from './app.js';

export const getLikes = async () => {
  const id = await createApp();
  const likes = await fetch(`${BASE_MICROVERSE_URL}/${id}/likes`, {
    method: 'GET',
  });
  let data = [];
  try {
    data = await likes.json();
  } catch (err) {
    throw new Error(err);
  }
  return data;
};

export const postLikes = async (idOfMovie) => {
  const id = await createApp();
  const likeData = {
    item_id: idOfMovie,
  };
  const response = await fetch(`${BASE_MICROVERSE_URL}/${id}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likeData),
  });

  return response;
};
