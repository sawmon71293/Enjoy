import validate from '../src/modules/validate.js';
import { displayMessage, clearMessage } from '../src/modules/render.js';

// mock the displayMessage and clearMessage functions
jest.mock('../src/modules/render', () => ({
  displayMessage: jest.fn(),
  clearMessage: jest.fn(),
}));

describe('validate function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns false if username is empty', () => {
    const result = validate('', 'comment');
    expect(result).toBe(false);
    expect(displayMessage).toHaveBeenCalledTimes(1);
  });

  it('returns false if comment is empty', () => {
    const result = validate('username', '');
    expect(result).toBe(false);
    expect(displayMessage).toHaveBeenCalledTimes(1);
  });

  it('returns true if username and comment are not empty', () => {
    const result = validate('username', 'comment');
    expect(result).toBe(true);
    expect(displayMessage).not.toHaveBeenCalled();
    expect(clearMessage).toHaveBeenCalledTimes(1);
  });
});
