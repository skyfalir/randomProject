import { API_SOCIAL_URL } from '../api/constants.mjs';
import { authFetch } from './authFetch.mjs';

/**
 * Creates a post by sending a POST request to the API_SOCIAL_URL + actions endpoint.
 *
 * @param {Object} postData - The data of the post to be created.
 * @return {Promise} A Promise that resolves with the response data in JSON format.
 */

const actions = '/posts';
const method = 'post';

export async function create(postData) {
	const createPostURL = API_SOCIAL_URL + actions;

	const response = await authFetch(createPostURL, {
		method,
		body: JSON.stringify(postData),
	});

	return await response.json();
}
