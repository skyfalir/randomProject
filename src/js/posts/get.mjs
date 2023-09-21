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
	console.log( data)
	return data
	
}

/**
 * Retrieves all posts from the social API.
 *
 * @return {Promise} A Promise that resolves with an object containing posts.
 */

export async function getPosts() {
	const getPostURL = `${API_AUCTION_URL}${actions}?_seller=true&_active=true`;

	const response = await authFetch(getPostURL);
	//console.log(await response.json())
	return await response.json();

	
}
