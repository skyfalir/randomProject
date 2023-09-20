import { API_SOCIAL_URL } from '../api/constants.mjs';
import { authFetch } from './authFetch.mjs';

/**
 * removes a post with the given ID.
 *
 * @param {number} id - The ID of the post to remove.
 * @return {Promise<void>} A Promise that resolves when the post is successfully removed, or rejects with an error if it could not be removed.
 */

const actions = '/posts';
const method = 'delete';

export async function removePost(id) {
	const createPostURL = `${API_SOCIAL_URL}${actions}/${id}`;
	const response = await authFetch(createPostURL, {
		method,
	});
	if (response.ok) {
		return console.log('deleted');
	  } else {
		throw new Error("Unable to delete post");
	  }
}