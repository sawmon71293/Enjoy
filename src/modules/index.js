const movieSection = document.getElementById('movies');
import counter from "./helper.js";
import shows from "./shows.js";
const showCount = document.getElementById('show-count');
import { populateView } from "./render.js";

const refresh = async () => {
  const data = await shows();
  const count = counter(data);
  showCount.innerText = count;
  populateView(data, movieSection);
};

document.addEventListener('DOMContentLoaded', async () => {
  await refresh();
});
