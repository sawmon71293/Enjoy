import { getComments, giveComments } from './comments.js';
import { getShowById } from './shows.js';
import { show } from './render.js';
import validate from './validate.js';

export const popup = () => {
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(movieCard => {
        movieCard.addEventListener('click', async () => {

            const movieTitle = movieCard.querySelector('.movie-title').textContent;
            const movieImgSrc = movieCard.querySelector('.movie-img').src;
            const modal = document.querySelector('#movieModal');
            const commentFormBtn = modal.querySelector('.movieComment');
            const commentForm = document.querySelector('#commentForm');
            const commentsSection = modal.querySelector('#commentsSection');
            commentsSection.innerHTML = '';

            const movieId = movieCard.dataset.id;
            const data = await getShowById(movieId);
            let comments = await getComments(movieId);
            if (Array.isArray(comments)) {
                const commentHeader = document.createElement('h6');
                commentHeader.textContent = `Comments(${comments.length += 1})`;
                commentsSection.appendChild(commentHeader);
                comments.forEach(comment => {
                    const commentElement = document.createElement('p');
                    commentElement.textContent = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
                    commentsSection.appendChild(commentElement);
                });
            }



            modal.querySelector('.movie-title').textContent = movieTitle;
            modal.querySelector('.movie-img').src = movieImgSrc;
            modal.querySelector('.summary').innerHTML = data.summary;
            modal.querySelector('.genres').textContent = data.genres;
            show();



            commentFormBtn.addEventListener('click', async (event) => {
                event.preventDefault();
                const username = document.getElementById('username').value;
                const comment = document.getElementById('insights').value;
                if (validate(username, comment)) {
                    giveComments({ movieId, username, comment });
                    const newCommentElement = document.createElement('p');
                    newCommentElement.textContent = `${new Date().toISOString().slice(0, 10)} ${username}: ${comment}`;
                    commentsSection.appendChild(newCommentElement);
                    commentForm.reset();
                }


            });
        });
    });



}