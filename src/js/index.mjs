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
	avatarImg.src = `${profileData.avatar}`;
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
		let offset = 0;
		let isLoading = false; // Flag to prevent multiple loading
		const toggleActiveButton = document.getElementById('toggleActiveButton');
	  
		// Function to load more posts when scrolling to the bottom
		async function loadMorePosts() {
		  if (isLoading) {
			return; // Prevent multiple loading
		  }
	  
		  isLoading = true;
		  try {
			const newPosts = await postmethod.getPosts(postCount, offset, isActive);
			if (newPosts.length > 0) {
			  templates.renderPostTemplates(newPosts, postsContainer);
			  offset += postCount; // Increase the offset
			  listeners.filterPosts();
			} else {
			  // No more posts to load, remove the scroll event listener
			  window.removeEventListener('scroll', onScroll);
			}
		  } catch (error) {
			console.error(error);
		  } finally {
			isLoading = false;
		  }
		}
	  
		function onScroll() {
		  if (
			window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 100
		  ) {
			// User has scrolled to the bottom, load more posts
			loadMorePosts();
		  }
		}
	  
		try {
		  if (id) {
			const post = await postmethod.get(id);
			templates.renderPostTemplate(post, postsContainer);
		  } else {
			// Initial load of posts
			const posts = await postmethod.getPosts(postCount, offset, isActive);
			templates.renderPostTemplates(posts, postsContainer);
	  
			toggleActiveButton.addEventListener('click', async (event) => {
			  event.preventDefault();
			  isActive = !isActive; // Toggle the active state
			  toggleActiveButton.textContent = isActive
				? 'Show all posts'
				: 'Show active only';
			  clearPostsContainer(postsContainer);
			  offset = 0; // Reset offset when changing filters
			  loadMorePosts(); // Load the initial set of posts
			});
	  
			// Add scroll event listener for infinite scrolling
			window.addEventListener('scroll', onScroll);
		  }
		} catch (error) {
		  console.error(error);
		}
	  }
	  showPosts();
	  search();
	  
	}	  
