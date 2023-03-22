import { postLikes } from './likes.js';

const renderCard = (id, url, name, likes, element) => {

  const card = document.createElement('div');
  card.className = 'col'
  card.innerHTML = `
    <div class="card card-sm">
      <img class="card-img-top" src=${url} alt=${name} />
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">${name}</h5>
          <div class="heart">
            <div>
              <button class="like" data-id=${id}>
                <ion-icon class="heartshape" name="heart-outline"></ion-icon>
              </button>
            </div>
            <div>
              <span class="like-count">${likes}${likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>
        <a id=${id} href="#" class="btn btn-outline-primary mt-2">Comments</a>
      </div>
    </div>
  `;
  const heart = card.querySelector('.heartshape');
  if (likes > 0) {
    heart.classList.add('multiple-likes');
  }

  const likeButton = card.querySelector('.like');

  likeButton.addEventListener('click', async () => {
    await postLikes(id);
    likes += 1;
    const likeCountSpan = card.querySelector('.like-count');
    likeCountSpan.textContent = `${likes}${likes === 1 ? 'Like' : 'Likes'}`;
    if (likes > 0) {
      const heart = card.querySelector('.heartshape');
      heart.classList.add('multiple-likes');
    }
  });
  element.append(card);
};

export const populateView = async (data, element) => {
  element.innerHTML = '';
  for (let i = 0; i < data.length; i += 1) {
    const {
      id, url, name, likes,
    } = data[i];
    renderCard(id, url, name, likes, element);
  }
};
