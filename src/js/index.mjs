import * as templates from './templates/index.mjs';
import * as postmethod from './posts/index.mjs';
import * as listeners from './handlers/index.mjs';
import { isLoggedInNav } from './templates/menu.mjs';
import { redirectIfLoggedIn } from './api/helpers/auth.mjs';
import { search } from './api/helpers/search.mjs';
import { clearPostsContainer } from './api/helpers/clearPosts.mjs';

const path = location.pathname;


if (path === '/login/') {
	listeners.setloginFormListener();
} else if (path === '/register/') {
	listeners.setRegisterFormListener();
} else if (path === '/profile/') {
	listeners.setEditProfileListener();
	const profileData = await postmethod.getProfile();
	const avatarImg = document.querySelector('#avatarImg');
	avatarImg.src = `${profileData.avatar}`
} else if (path === '/listings/' || path === '/listing/') {
	listeners.setPostFormListener();
	isLoggedInNav();
	redirectIfLoggedIn();

	/**
	 * shows posts based on the ID provided in the URL
	 * or all posts if no ID is provided.
	 */
	async function showPosts() {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get('id');
		const postsContainer = document.querySelector('#userPost');
		const postCount = 10;
		let isActive = true; // Default active state for list view
		const toggleActiveButton = document.getElementById('toggleActiveButton');
		try {
			if (id) {
				const post = await postmethod.get(id);
				templates.renderPostTemplate(post, postsContainer);
			} else {
				const posts = await postmethod.getPosts(postCount, isActive);
				templates.renderPostTemplates(posts, postsContainer);
				
				toggleActiveButton.addEventListener('click', async (event) => {
					event.preventDefault();
					isActive = !isActive; // Toggle the active state
					toggleActiveButton.textContent = isActive
						? 'Show all posts'
						: 'Show active only';
					clearPostsContainer(postsContainer);
					try {
						const posts = await postmethod.getPosts(postCount, isActive);
						templates.renderPostTemplates(posts, postsContainer);
						console.log(posts)
					} catch (error) {
						console.error(error);
					}
				});
			}
		} catch (error) {
			console.error(error);
		}
	}
	showPosts();
	search();
}

