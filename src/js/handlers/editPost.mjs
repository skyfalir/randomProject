import { get, update, removePost } from '../posts/index.mjs';

/**
 * Sets up a listener for the edit post form and handles form submission and deletion.
 *
 * @async
 * @return {Promise<void>} Promise that resolves when setup is complete
 */
export async function setEditPostFormListener() {
	let form;
	try {
		form = document.querySelector('#editForm');
	} catch (err) {
		console.log(err);
	}

	const url = new URL(location.href);
	const id = url.searchParams.get('id');

	if (form) {
		try {
			const post = await get(id);
			form.title.value = post.title;
			form.body.value = post.body;
			form.media.value = post.media;
		  } catch (err) {
			console.error(err);
			throw new Error('Failed to retrieve post data');
		  }

		form.addEventListener('submit', async (event) => {
			event.preventDefault();
			const form = event.target;
			const formData = new FormData(form);
			const post = Object.fromEntries(formData.entries());
			post.id = id;

			try {
				await update(post);

				alert(`Post '${post.title}' updated.`);

				window.location.href = '/feed/';
			} catch (err) {
				console.log(err);

				throw new Error('something went wrong');
			}
		});

		
		const deleteButton = document.querySelector('#deleteButton');

		deleteButton.addEventListener('click', async () => {
			try {
				await removePost(id);

				alert(`Post '${id}' deleted!`);

				window.location.href = '/feed/';
			} catch (error) {
				console.error(error);

				alert('there was a problem deleting this post');
			}
		});
	}
}
