import { BASE_MICROVERSE_URL } from './constants.js';
import createApp from './app.js';
export const getComments = async (movieId) => {
    const appId = await createApp();
    try {
        const response = await fetch(`${BASE_MICROVERSE_URL}/${appId}/comments?item_id=${movieId}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Could not fetch comments. Please try again later.');
    }

}


export const giveComments = async ({ movieId, username, comment }) => {
    const appId = await createApp();
    const response = await fetch(`${BASE_MICROVERSE_URL}/${appId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item_id: movieId,
            username: username,
            comment: comment
        })
    });
    const data = await response.json();
    return data.result;
}