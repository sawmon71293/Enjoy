import { getComments } from './comments.js';
import counter from './helper.js';

const loadMovieComments = async (movieId) => {
  const modal = document.querySelector('#movieModal');
  modal.dataset.id = movieId;
  const commentsSection = modal.querySelector('#commentsSection');
  commentsSection.innerHTML = '';
  console.log(movieId);
  const comments = await getComments(movieId);

  console.log('comments' + comments);
  if (!Array.isArray(comments)) {
    return;
  }

  const commentHeader = document.createElement('h6');
  commentHeader.textContent = `Comments (${counter(comments)})`;
  commentsSection.appendChild(commentHeader);

  const fragment = document.createDocumentFragment();
  for (const { creation_date, username, comment } of comments) {
    const commentElement = document.createElement('p');
    commentElement.textContent = `${creation_date} ${username}: ${comment}`;
    fragment.appendChild(commentElement);
  }

  commentsSection.appendChild(fragment);
};

export default loadMovieComments;
