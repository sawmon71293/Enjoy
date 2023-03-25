import { BASE_MICROVERSE_URL } from './constants.js';

const createApp = async () => {
  const id = localStorage.getItem('JavaScriptCapstoneAppId');
  let appId = id;
  if (!id) {
    const response = await fetch(BASE_MICROVERSE_URL, {
      method: 'POST',
    });
    const data = await response.text();
    localStorage.setItem('JavaScriptCapstoneAppId', data);
    appId = data;
  }
  return appId;
};

export default createApp;
