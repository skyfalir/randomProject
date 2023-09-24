import { API_AUCTION_URL } from "../api/constants.mjs";
import { getName } from "../api/helpers/storage.mjs";
import { authFetch } from "./authFetch.mjs";

const actions = `/profiles/${getName()}/media`
export async function put(data) {

	try {
		// Send the PUT request
		const response = await authFetch(`${API_AUCTION_URL}${actions}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			console.log('PUT request successful');
			console.log(data)
		} else {
			console.error('PUT request failed');
			// You can handle errors here
		}
	} catch (error) {
		console.error('Error:', error);
	}
}
