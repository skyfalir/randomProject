//clears posts
export function clearPostsContainer(postsContainer) {
	while (postsContainer.firstChild) {
		postsContainer.removeChild(postsContainer.firstChild);
	}
}
