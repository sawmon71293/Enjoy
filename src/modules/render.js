import { postLikes } from './likes.js';

const renderCard = (id, url, name, likes, element) => {

  const card = document.createElement('div');
  card.className = 'col-sm-6 col-md-4 col-lg-3'
  card.innerHTML = `
    <div class="card movie-card" data-id=${id}>
      <img class="card-img-top movie-img" src=${url} alt=${name} />
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title movie-title">${name}</h5>
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
        <a data-id=${id} href="#" class="btn btn-outline-primary mt-2" data-toggle="modal" data-target="#movieModal">Comments</a>
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


export const show = () => {
  const modal = document.querySelector('#movieModal');
  modal.style.display = 'block';
}


export const displayMessage = (element) => {
  element.classList.remove('d-none');// show the error message

};

export const clearMessage = (element) => {
  element.innerText = '';
  element.classList.add('d-none'); // hide the error message

};