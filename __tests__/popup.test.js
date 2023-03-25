import { popup } from '../src/modules/popup.js';
import { getShowById } from '../src/modules/shows.js';
import loadMovieComments from '../src/modules/loadComments.js';
import { show } from '../src/modules/render.js';

// mock the getShowById and loadMovieComments functions
jest.mock('../src/modules/shows.js');
jest.mock('../src/modules/loadComments.js');

// mock the show function
jest.mock('../src/modules/render.js', () => ({
  show: jest.fn(),
}));

describe('popup function', () => {
  beforeEach(() => {
    // clear the HTML after each test case
    document.body.innerHTML = '';
  });

  it('updates the movie modal with the correct data and clears comments section', async () => {
    // set up the test data
    const data = {
      id: 1,
      name: 'Test Show',
      image: {
        original: 'test.jpg',
      },
      summary: '<p>Test summary</p>',
      genres: ['Comedy', 'Drama'],
    };

    // mock the getShowById function to return the test data
    getShowById.mockResolvedValueOnce(data);

    // set up the HTML elements for the movie modal
    document.body.innerHTML = `
      <div id="movieModal">
        <div class="modal-content">
          <h2 class="movie-title"></h2>
          <img class="movie-img" />
          <div class="summary"></div>
          <div class="genres"></div>
          <div id="commentsSection"></div>
          <button class="movieComment"></button>
        </div>
      </div>
    `;

    const commentsSection = document.querySelector('#commentsSection');

    // call the popup function with the movie ID
    await popup(1);

    // check if the getShowById function was called with the correct ID
    expect(getShowById).toHaveBeenCalledTimes(1);
    expect(getShowById).toHaveBeenCalledWith(1);

    // check if the movie modal was updated with the correct data
    expect(document.querySelector('.movie-title').textContent).toBe(
      'Test Show'
    );
    expect(document.querySelector('.genres').textContent).toBe('Comedy,Drama');
    expect(document.querySelector('.movie-img').src).toBe(
      'http://localhost/test.jpg'
    );
    expect(document.querySelector('.summary').innerHTML).toBe(
      '<p>Test summary</p>'
    );

    // check if the comments section was cleared
    expect(commentsSection.innerHTML).toBe('');

    // check if the loadMovieComments function was called with the correct ID
    expect(loadMovieComments).toHaveBeenCalledTimes(1);
    expect(loadMovieComments).toHaveBeenCalledWith(1);

    // check if the show function was called to display the modal
    expect(show).toHaveBeenCalledTimes(1);
  });
});
