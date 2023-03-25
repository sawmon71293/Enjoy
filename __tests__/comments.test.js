import { getComments, giveComments } from '../src/modules/comments.js';
import { BASE_MICROVERSE_URL } from '../src/modules/constants.js';
import createApp from '../src/modules/app.js';

jest.mock('../src/modules/app.js'); // mock the createApp function

describe('getComments', () => {
  it('should fetch comments and return data on success', async () => {
    const movieId = '12345';
    const appId = 'myAppId';
    const comments = [{ id: 1, comment: 'Great movie!' }];

    createApp.mockResolvedValue(appId);
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(comments),
    });

    const result = await getComments(movieId);

    expect(createApp).toHaveBeenCalledTimes(1);
    expect(createApp).toHaveBeenCalledWith();

    const expectedUrl = `${BASE_MICROVERSE_URL}/${appId}/comments?item_id=${movieId}`;
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' });

    expect(result).toEqual(comments);
  });

  it('should throw an error if the request fails', async () => {
    const movieId = '12345';
    const error = new Error('Could not fetch comments');

    createApp.mockRejectedValue(error);

    await expect(getComments(movieId)).rejects.toThrowError(error);
  });
});

describe('giveComments', () => {
  it('should send a POST request and return data on success', async () => {
    const movieId = '12345';
    const username = 'testuser';
    const comment = 'Great movie!';
    const appId = 'myAppId';
    const response = { result: 'OK' };

    createApp.mockResolvedValue(appId);
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    const result = await giveComments({ movieId, username, comment });

    expect(createApp).toHaveBeenCalledWith();

    const expectedUrl = `${BASE_MICROVERSE_URL}/${appId}/comments`;
    const expectedBody = JSON.stringify({
      item_id: movieId,
      username: username,
      comment: comment,
    });
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: expectedBody,
    });

    expect(result).toEqual(response.result);
  });

  it('should throw an error if the request fails', async () => {
    const movieId = '12345';
    const username = 'testuser';
    const comment = 'Great movie!';
    const error = new Error('Could not post comment');

    createApp.mockRejectedValue(error);

    await expect(
      giveComments({ movieId, username, comment })
    ).rejects.toThrowError(error);
  });
});
