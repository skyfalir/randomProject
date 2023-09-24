import { create } from '../posts/index.mjs';

export function setPostFormListener() {
	const form = document.querySelector('#createPostForm');

	if (form) {
		form.addEventListener('submit', async function (event) {
			event.preventDefault();

			const formData = new FormData(event.target);

			const requestData = {
				title: formData.get('title'),
				description: formData.get('description'),
				tags: formData.get('tags')
					? formData
							.get('tags')
							.split(',')
							.map((tag) => tag.trim())
					: [],
				media: formData.get('media')
					? formData
							.get('media')
							.split(',')
							.map((url) => url.trim())
					: [],
				endsAt: new Date(formData.get('endsAt')).toISOString(),
			};
			try {
				await create(requestData);
				alert(`Post '${requestData.title}' created!`);
				window.location.reload();

			} catch (error) {
				console.error(error);
			}
		});
	}
}
