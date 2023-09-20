import { API_SOCIAL_URL } from '../constants.mjs';

/**
 * logs a user in.
 *
 * @param {Object} profile - the social profile object to use for login
 * @return {Promise<Object>} Returns a Promise that resolves with a JSON object containing the response to the request if the login is successful, otherwise throws an Error with the first error message from the JSON response object.
 */

const action = '/auth/login';
const method = 'post';

export async function login(profile) {
	const loginURL = API_SOCIAL_URL + action;
	const body = JSON.stringify(profile);

	const response = await fetch(loginURL, {
		headers: {
			'content-Type': 'application/json',
		},
		method,
		body,
	});

		const json = await response.json();

		if (response.ok) {

		return json;
	} else {
		// Login failed, display error message to user.
		throw new Error(json.errors[0].message);
	}
}
