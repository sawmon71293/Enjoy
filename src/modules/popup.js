import { giveComments } from './comments.js';
import { getShowById } from './shows.js';
import { show } from './render.js';
import validate from './validate.js';
import loadMovieComments from './loadComments.js';
import counter from './helper.js';

export const popup = async (movieId) => {
  const modal = document.querySelector('#movieModal');
  const commentFormBtn = modal.querySelector('.movieComment');
  const commentForm = document.querySelector('#commentForm');
  const commentsSection = modal.querySelector('#commentsSection');
  commentsSection.innerHTML = '';

  const data = await getShowById(movieId);
  modal.querySelector('.movie-title').textContent = data.name;
  modal.querySelector('.movie-img').src = data.image.original;
  modal.querySelector('.summary').innerHTML = data.summary;
  modal.querySelector('.genres').textContent = data.genres;
  show();
  loadMovieComments(movieId);

  commentFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const comment = document.getElementById('insights').value;
    if (validate(username, comment)) {
      giveComments({ movieId, username, comment });
      appendNewComment(commentsSection, username, comment);
      updateCommentHeader(commentsSection);
      commentForm.reset();
    }
  });

  function appendNewComment(commentsSection, username, comment) {
    const newCommentElement = document.createElement('p');
    newCommentElement.textContent = `${new Date()
      .toISOString()
      .slice(0, 10)} ${username}: ${comment}`;
    commentsSection.appendChild(newCommentElement);
  }

  function updateCommentHeader(commentsSection) {
    const commentHeader = commentsSection.querySelector('h6');
    commentHeader.textContent = `Comments (${counter(
      commentsSection.querySelectorAll('p')
    )})`;
  }
};
