import { API_AUCTION_URL } from '../api/constants.mjs';
import { authFetch } from './authFetch.mjs';

/**
 * Creates a post by sending a POST request to the API_AUCTION_URL + actions endpoint.
 *
 * @param {Object} postData - The data of the post to be created.
 * @return {Promise} A Promise that resolves with the response data in JSON format.
 */

const actions = '/listings';
const method = 'post';

export async function create(postData) {
	const createPostURL = API_AUCTION_URL + actions;
  
	const response = await fetch(createPostURL, {
	  method,
	  body: JSON.stringify(postData),
	  headers: {
		'Content-Type': 'application/json',
	  },
	});
  
	return await response.json();
  }