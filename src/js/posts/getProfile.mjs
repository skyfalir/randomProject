import { API_AUCTION_URL } from '../api/constants.mjs';
import { getName } from '../api/helpers/storage.mjs';
import { authFetch } from './authFetch.mjs';

/**
 * Updates a post using the provided post data.
 *
 * @param {Object} postData - The post data to update.
 * @return {Promise<Object>} - A Promise that resolves with the updated post data.
 */


const actions = `/profiles/${getName()}`;
const method = 'GET';

export async function getProfile() {
	const getProfileURL = `${API_AUCTION_URL}${actions}`;

	const response = await authFetch(getProfileURL,  {
		method,
		headers: {
			'Content-Type': 'application/json',
		}
	});
	const profileData = response.json();
	return await profileData;
}
