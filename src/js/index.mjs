import * as templates from './templates/index.mjs';
import * as postmethod from './posts/index.mjs';
import * as listeners from './handlers/index.mjs';
import { isLoggedInNav } from './templates/menu.mjs';
import { redirectIfLoggedIn } from './api/helpers/auth.mjs';
import { search } from './api/helpers/search.mjs';

const path = location.pathname;



if (path === '/login/') {
	listeners.setloginFormListener();
} else if (path === '/register/') {
	listeners.setRegisterFormListener();
} else if (path === '/listings/' || path === '/posts/' || path === '/profile/') {
	listeners.setPostFormListener();
	isLoggedInNav();
	redirectIfLoggedIn();

	/**
	 * shows posts based on the ID provided in the URL -
	 * or all posts if no ID is provided.
	 * 
	 * id : 144f0728-c997-4fa7-b7aa-08712999b1c4
	 */
	async function showPosts() {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get('id');
		const postsContainer = document.querySelector('#userPost');

		if (id) {
			try {
				const post = await postmethod.get(id);
				templates.renderPostTemplate(post, postsContainer);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const posts = await postmethod.getPosts();
				templates.renderPostTemplates(posts, postsContainer);
			} catch (error) {
				console.error(error);
			}
		}
	}

	showPosts();
	search();
} else if (path === '/posts/edit/') {
	listeners.setEditPostFormListener();
}

