import { API_AUCTION_URL } from '../api/constants.mjs';
import { getName } from '../api/helpers/storage.mjs';
import { authFetch } from './authFetch.mjs';

/**
 * Updates a post using the provided post data.
 *
 * @param {Object} postData - The post data to update.
 * @return {Promise<Object>} - A Promise that resolves with the updated post data.
 */


const actions = `/profile${getName()}/media`;
const method = 'put';

export async function update(postData) {
	const createPostURL = `${API_AUCTION_URL}${actions}/${postData.id}`;

	const response = await authFetch(createPostURL, {
		method,
		body: JSON.stringify(postData),
	});

	return await response.json();
}
