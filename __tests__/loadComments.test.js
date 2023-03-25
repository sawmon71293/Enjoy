import { getComments } from '../src/modules/comments.js';
import counter from '../src/modules/helper.js';
import loadMovieComments from '../src/modules/loadComments.js';

jest.mock('../src/modules/comments.js');
jest.mock('../src/modules/helper.js');

describe('loadMovieComments', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div
        id='movieModal'
        data-id=''
      ><div id='commentsSection'></div</div>`;
  });

  it('should load comments for the specified movie ID and update the modal', async () => {
    const movieId = 123;
    const mockComments = [
      {
        creation_date: '2022-01-01',
        username: 'user1',
        comment: 'Comment 1',
      },
      {
        creation_date: '2022-01-02',
        username: 'user2',
        comment: 'Comment 2',
      },
    ];
    getComments.mockResolvedValue(mockComments);
    counter.mockReturnValue(mockComments.length);
    const modal = document.querySelector('#movieModal');
    const commentsSection = modal.querySelector('#commentsSection');

    await loadMovieComments(movieId);

    expect(getComments).toHaveBeenCalledWith(movieId);

    expect(commentsSection.innerHTML).toMatchSnapshot();
  });

  it('should not update the modal if comments cannot be retrieved', async () => {
    const movieId = 456;
    getComments.mockResolvedValue(null);
    const modal = document.querySelector('#movieModal');
    const commentsSection = modal.querySelector('#commentsSection');

    await loadMovieComments(movieId);

    expect(getComments).toHaveBeenCalledWith(movieId);

    expect(commentsSection.innerHTML).toBe('');
  });
});
