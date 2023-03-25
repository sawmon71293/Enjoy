import { BASE_MICROVERSE_URL } from '../src/modules/constants.js';
import createApp from '../src/modules/app.js';
import { getLikes, postLikes } from '../src/modules/likes.js';

jest.mock('../src/modules/app.js');

describe('getLikes', () => {
  it('should send a GET request and return data on success', async () => {
    // mock the response from the API
    const mockData = [
      { id: 1, name: 'Movie 1' },
      { id: 2, name: 'Movie 2' },
    ];
    const appId = '123';
    createApp.mockResolvedValue(appId);
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    // call the function and assert the result
    const result = await getLikes();
    expect(result).toEqual(mockData);

    // assert that the API was called with the correct arguments

    expect(createApp).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_MICROVERSE_URL}/${appId}/likes`,
      { method: 'GET' }
    );
  });

  it('should throw an error on failure', async () => {
    // mock the response from the API

    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject('Network error'));
    const error = new Error('Could not give likes');
    createApp.mockRejectedValue(error);
    // call the function and assert that it throws an error
    await expect(getLikes()).rejects.toThrow(error);
  });
});

describe('postLikes', () => {
  it('should send a POST request and return response on success', async () => {
    // mock the response from the API
    const appId = '123';
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ success: true }),
    };

    createApp.mockResolvedValue(appId);
    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockResponse));

    // call the function and assert the result
    const result = await postLikes(123);
    expect(result).toEqual(mockResponse);

    // assert that the API was called with the correct arguments

    expect(createApp).toHaveBeenCalledWith();
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_MICROVERSE_URL}/${appId}/likes`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: 123 }),
      }
    );
  });

  it('should throw an error on failure', async () => {
    // mock the response from the API
    const error = new Error('Could not give likes');
    createApp.mockRejectedValue(error);
    // call the function and assert that it throws an error
    await expect(postLikes(123)).rejects.toThrow(error);
  });
});
