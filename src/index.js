import counter from "./modules/helper.js";
import shows from "./modules/shows.js";
import { populateView } from "./modules/render.js";
import './index.css';


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
});


