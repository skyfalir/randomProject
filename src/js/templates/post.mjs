/**
 * Creates the template for a post.
 * 
 * @param {object} postData - The post data.
 * @returns {HTMLDivElement} The post template.
 */
export function postTemplate(postData) {
	const postWrapper = document.createElement('div');
	postWrapper.classList.add('post','card-body', 'mx-auto');

	const container = document.createElement('div');
	container.classList.add('card-body', 'my-2', 'text-center');
	postWrapper.appendChild(container);

	/* Title */

	const postTitle = document.createElement('h5');
	postTitle.classList.add(
		'post-title',
		'card-title',
		'bg-dark',
		'rounded-top',
		'p-3',
		'm-0',
		'text-secondary'
	);
	postTitle.innerText = postData.title;

	/* link to post */

	const anchor = document.createElement('a');
	anchor.href = '../Listing/' + `?id=${postData.id}`;
	anchor.style = 'text-decoration: none';
	anchor.appendChild(postTitle);

	container.appendChild(anchor);

	/* Image */

	const postImage = document.createElement('img');
	postImage.classList.add('img-fluid', 'rounded-0', 'card-img');

	const Placeholders = [
		'https://picsum.photos/301',
		'https://picsum.photos/302',
		'https://picsum.photos/303',
	];

	if (isValidImageUrl(postData.media)) {
		postImage.src = postData.media;
	} else {
		const randomIndex = Math.floor(Math.random() * Placeholders.length);
		postImage.src = Placeholders[randomIndex];
	}

	postImage.alt = 'Post Image';

	container.appendChild(postImage);

	/**
	 * Checks if a given URL is a valid image URL.
	 *
	 * @param {string} url - The URL to check.
	 * @return {boolean} Returns true if the URL is a valid image URL, else false.
	 */
	function isValidImageUrl(url) {
		const imageRegex = /\.(jpeg|jpg|gif|png|svg)$/i;
		return imageRegex.test(url);
	}

	/* Body */

	const postBody = document.createElement('p');
	postBody.classList.add(
		'post-body',
		'card-text',
		'mx-auto',
		'm-0',
		'p-3',
		'bg-dark',
		'text-light'
	);
	postBody.innerText = postData.description;
	container.appendChild(postBody);

	/* Details Container */

	const postDetailsContainer = document.createElement('div');
	postDetailsContainer.classList.add(
		'd-flex',
		'details-container',
		'accent',
		'p-md-3',
		'rounded-bottom',
		'align-items-center'
	);
	
	/* Buttons */

	const postButtonGroup = document.createElement('div');
	postButtonGroup.classList.add('btn-group', 'p-1');


	const bidButton = document.createElement('button');
	bidButton.classList.add('btn', 'btn-sm', 'btn-outline-primary');
	bidButton.innerText = 'Place Bid';
	postButtonGroup.appendChild(bidButton);
	postDetailsContainer.appendChild(postButtonGroup);

	/* Post Stats */

	container.appendChild(postDetailsContainer);

	return postWrapper;
}

/**
 * Renders a post template into a parent element.
 *
 * @param {Object} postData - The data for the post to be rendered.
 * @param {HTMLElement} parent - The parent element to which the post template will be appended.
 */
export function renderPostTemplate(postData, parent) {
	parent.append(postTemplate(postData));
}

/**
 * Renders the post templates for a list of posts itno given parent element.
 *
 * @param {Array} postDataList - An array of post data objects to be rendered as templates.
 * @param {HTMLElement} parent - The parent element to which the post templates will be appended.
 */
export function renderPostTemplates(postDataList, parent) {
	if (!Array.isArray(postDataList)) {
		console.error('postDataList is not an array');
		return;
	}
	parent.append(...postDataList.map(postTemplate));
}
