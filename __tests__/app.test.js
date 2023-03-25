import createApp from '../src/modules/app.js';
import { BASE_MICROVERSE_URL } from '../src/modules/constants.js';

describe('createApp function', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should create a new app if there is no app ID in local storage', async () => {
    const mockResponse = '123456';
    const mockFetch = jest.fn(() => ({
      text: jest.fn(() => Promise.resolve(mockResponse)),
    }));
    window.fetch = mockFetch;

    const result = await createApp();
    expect(mockFetch).toHaveBeenCalledWith(BASE_MICROVERSE_URL, {
      method: 'POST',
    });
    expect(result).toEqual(mockResponse);
    expect(localStorage.getItem('JavaScriptCapstoneAppId')).toEqual(
      mockResponse
    );
  });

  it('should return the app ID from local storage if it exists', async () => {
    const mockResponse = '123456';
    localStorage.setItem('JavaScriptCapstoneAppId', mockResponse);
    const mockFetch = jest.fn(() => ({
      text: jest.fn(() => Promise.resolve('654321')),
    }));
    window.fetch = mockFetch;

    const result = await createApp();
    expect(mockFetch).not.toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});
