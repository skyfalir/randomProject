import { API_SOCIAL_URL } from '../api/constants.mjs';
import { authFetch } from './authFetch.mjs';

/**
 * Updates a post using the provided post data.
 *
 * @param {Object} postData - The post data to update.
 * @return {Promise<Object>} - A Promise that resolves with the updated post data.
 */

const actions = '/posts';
const method = 'put';

export async function update(postData) {
	const createPostURL = `${API_SOCIAL_URL}${actions}/${postData.id}`;

	const response = await authFetch(createPostURL, {
		method,
		body: JSON.stringify(postData),
	});

	return await response.json();
}
