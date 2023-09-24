import { API_AUCTION_URL } from '../api/constants.mjs';
import { authFetch } from './authFetch.mjs';

/**
 * Retrieves a post by ID from the social API.
 *
 * @param {string} id - the ID of the post to retrieve
 * @return {Promise<object>} A Promise that resolves with the retrieved post.
 * @throws {Error} If ID is missing.
 */

const actions = '/listings';

export async function get(id) {
	if (!id) {
		throw new Error('Missing post Id');
	}
	const getPostURL = `${API_AUCTION_URL}${actions}/${id}?_seller=true&_bids=true`;
	

	const response = await authFetch(getPostURL);
	
	
	const data = await response.json();
	return data
	
}

/**
 * Retrieves all posts from the social API.
 *
 * @return {Promise} A Promise that resolves with an object containing posts.
 */

export async function getPosts(postCount,isActive) {
	const activeFlag = isActive ? '&_active=true' : '';
	const getPostURL = `${API_AUCTION_URL}${actions}?_seller=true${activeFlag}`;
	const response = await authFetch(getPostURL);
	const data = await response.json();
	const limit = data.slice(0, postCount);
	return limit;

	
}
