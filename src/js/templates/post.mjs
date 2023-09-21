import { placeBid } from "../handlers/placeBid.mjs";
import { put } from "../posts/put.mjs";

/**
 * Creates the template for a post.
 *
 * @param {object} postData - The post data.
 * @returns {HTMLDivElement} The post template.
 */
export function postTemplate(postData) {
	const postWrapper = document.createElement('div');
	postWrapper.classList.add('post', 'card-body', 'mx-auto', 'p-5');

	const container = document.createElement('div');
	container.classList.add('card-body', 'my-2', 'text-center');
	

	/* Title */
	const postTitle = document.createElement('h3');
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
	anchor.href = '../listing/' + `?id=${postData.id}`;
	anchor.style = 'text-decoration: none';
	anchor.appendChild(postTitle);

	/* Image */
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

	const postImage = document.createElement('img');
	postImage.classList.add( 'img-fluid', 'rounded-0', 'card-img');

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

	

	/* Body */
	const bids = document.createElement('p');
	bids.classList.add('m-0');
	bids.innerText = `Bids: ${postData._count.bids}`;
	const postBody = document.createElement('div');
	const postBodySpacer = document.createElement('hr');
	const postDescription = document.createElement('p');
	postBody.classList.add(
		'post-body',
		'card-text',
		'm-0',
		'p-3',
		'bg-dark',
		'text-light'
	);
	postDescription.innerText = postData.description;
	postBody.append(postDescription, postBodySpacer, bids);


	/* Details Container */

	const postDetailsContainer = document.createElement('div');
	postDetailsContainer.classList.add(
		'd-flex',
		'details-container',
		'accent',
		'p-md-3',
		'rounded-bottom',
		'align-items-center',
		'justify-space-between'
	);
	const authorBody = document.createElement('span');
	const author = document.createElement('p');
	authorBody.classList.add('d-flex', 'align-items-center');
	author.classList.add('align-items-center', 'mb-0');
	author.innerText = `Author: ${postData.seller.name}`;

	const authorAvatar = document.createElement('img');
	authorAvatar.classList.add('avatarimg');
	authorAvatar.src = postData.seller.avatar;

	authorBody.append(author, authorAvatar);

	/* Buttons */

	const postButtonGroup = document.createElement('div');
	postButtonGroup.classList.add('btn-group', 'p-1');

	const bidButton = document.createElement('button');
	bidButton.classList.add('btn', 'btn-sm', 'btn-outline-primary');
	bidButton.innerText = 'View Listing';
	postDetailsContainer.appendChild(authorBody);
	postButtonGroup.appendChild(bidButton);
	postDetailsContainer.appendChild(postButtonGroup);

	// append elements to container
	container.appendChild(anchor);
	postWrapper.appendChild(container);
	container.appendChild(postImage);
	container.appendChild(postBody);
	
	container.appendChild(postDetailsContainer);


	//get path
	const path = location.pathname;

	if (path === '/listing/') {
		postWrapper.classList.remove('post')
		postWrapper.classList.add('m-0', 'p-0');
		container.classList.remove('card-body', 'my-2', 'text-center');
		container.classList.add(
			'd-grid',
			'grid-cols-1',
			'text-center',
		)

		postWrapper.appendChild(anchor);
		postWrapper.appendChild(container);
		container.appendChild(postImage);
		container.appendChild(postBody);
		postWrapper.appendChild(postDetailsContainer);
	
		//get last bid

		const lastBidAmount = Number(postData.bids[postData.bids.length - 1]?.amount + 1) || 0 + 1;

		// Set bidding form container
		const formContainer = document.createElement('div');
		formContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center');

		const bidForm = document.createElement('form');
		// Set label for input box
		const bidLabel = document.createElement('label');
		bidLabel.textContent = 'Bid Amount:';
		bidLabel.classList.add('text-light', 'mx-2');
		bidLabel.setAttribute('for', 'bidInput');

		// Create Input for bidding
		const bidInput = document.createElement('input');
		bidInput.setAttribute('type', 'number');
		bidInput.setAttribute('name', 'amount');
		bidInput.setAttribute('id', 'bidInput');
		// get last bid amount and display it while setting minimum bid amount.
		bidInput.setAttribute('value', `${lastBidAmount}`);
		bidInput.setAttribute('min', `${lastBidAmount}`);
		// Append all elements to form
		bidForm.appendChild(bidLabel);
		bidForm.appendChild(bidInput);
		
		// Create button to place bids
		const bidButton = document.createElement('button');
		bidButton.textContent = 'Place bid'
		bidButton.classList.add('btn','btn-secondary','mx-3')
		bidButton.addEventListener('click', async function (event) {
			event.preventDefault();
			
			const formData = new FormData(bidForm);
			const bid = formData.get('amount');

			const data = {
				amount: Number(bid)
			};

			console.log(data) // what will this return 
			try {
				placeBid(data);
			} catch (error) {
				console.log(error);
			}

			
		});

		bidForm.appendChild(bidButton);

		formContainer.appendChild(bidForm);

		// Append form to post
		postWrapper.appendChild(formContainer);
		return postWrapper;
	} else {
		return postWrapper;
	}
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
