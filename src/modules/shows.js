import { getLikes } from './likes.js';
import { BASE_SHOWS_URL } from './constants.js';

export const shows = async () => {
  const sanitizedData = [];

  const [data, allLikes] = await Promise.all([
    await fetch(BASE_SHOWS_URL, {
      method: 'GET',
    }),
    await getLikes(),
  ]);
  const shows = await data.json();
  for (let i = 0; i < shows.slice(0, 20)?.length; i += 1) {
    const { id, name, summary, image } = shows[i];
    const likes = allLikes
      .filter((like) => parseInt(like.item_id) === id)
      .reduce((total, like) => total + like.likes, 0);
    sanitizedData.push({
      id: id.toString(),
      name,
      description: summary,
      url: image.original,
      likes,
      comments: [],
    });
  }
  return sanitizedData;
};

export const getShowById = async (id) => {
  const response = await fetch(`${BASE_SHOWS_URL}/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
};
