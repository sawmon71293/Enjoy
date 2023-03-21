const renderCard = (id, url, name, likes, element) => {
    const card = document.createElement('div');
    card.className='col'
    card.innerHTML = `
                <div class="card card-sm">
                  <img
                    class="card-img-top"
                    src=${url}
                    alt=${name}
                  />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <h5 class="card-title">${name}</h5>
                      <div class="heart">
                        <div>
                          <ion-icon name="heart-outline"></ion-icon>
                        </div>
                        <div><span>${likes}${likes === 1 ? 'Like' : 'Likes'}</span></div>
                      </div>
                    </div>
                    <a id=${id} href="#" class="btn btn-outline-primary mt-2">
                      Comments
                    </a>
                  </div>
                </div>
    `;
    element.append(card);
}

export const populateView = (data, element) => {
  element.innerHTML = '';
  for (let i = 0; i < data.length; i += 1) {
    const {
      id, url, name, likes,
    } = data[i];
    renderCard(id, url, name, likes, element);
  }
};