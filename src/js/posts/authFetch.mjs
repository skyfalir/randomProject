import { load } from '../handlers/storage/index.mjs';

/**
 * Returns an object containing the headers necessary for making authorized requests.
 *
 * @return {Object} An object with the 'Content-Type' and 'Authorization' headers.
 */
export function headers() {
	const token = load('token');

	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
}

/**
 * fetches a resource using an authorization token.
 *
 * @param {string} url - The URL of the resource to be fetched.
 * @param {object} [options={}] - An optional object containing parameters for the fetch request.
 * @return {Promise<Response>} A Promise that resolves to a Response object representing the response to the request.
 */
export async function authFetch(url, options = {}) {
	return fetch(url, {
		...options,
		headers: headers(),
	});
}
