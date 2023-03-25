import counter from './modules/helper.js';
import { shows } from './modules/shows.js';
import { populateView } from './modules/render.js';
import './index.css';
import { popup } from './modules/popup.js';

const showCount = document.getElementById('show-count');
const movieSection = document.getElementById('movies');

const refresh = async () => {
  const data = await shows();
  const count = counter(data);
  showCount.innerText = count;
  populateView(data, movieSection);
};

document.addEventListener('DOMContentLoaded', async () => {
  await refresh();
  const movies = document.querySelector('#movies');

  movies.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.matches('.comments-btn')) {
      const movieId = event.target.dataset.id;
      popup(movieId);
    }
  });
});
