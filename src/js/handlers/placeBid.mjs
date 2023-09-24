import { API_AUCTION_URL } from '../api/constants.mjs';
import { authFetch } from '../posts/authFetch.mjs';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const actions = `/listings/${id}/bids`;

export async function placeBid(data) {
	try {
		const response = await authFetch(`${API_AUCTION_URL}${actions}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			console.log('POST request successful');
			alert(`Bid placed!`);
			window.location.reload();
		} else {
			console.error('POST request failed');
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}
