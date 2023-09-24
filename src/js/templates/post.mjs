import { placeBid } from '../handlers/placeBid.mjs';

/**
 * Creates the template for a post.
 *
 * @param {object} postData - The post data.
 * @returns {HTMLDivElement} The post template.
 */
export function postTemplate(postData) {
	const postWrapper = document.createElement('div');
	postWrapper.classList.add('post', 'card-body', 'mx-auto');

	const container = document.createElement('div');
	container.classList.add('card-body', 'my-2', 'w-limit', 'text-center', 'mx-auto');

	const spacer = document.createElement('hr');
	spacer.classList.add('border-primary', 'border-4', 'my-5', 'w-100', 'mx-auto');

	/* Title */
	const postTitle = document.createElement('h2');
	postTitle.classList.add(
		'post-title',
		'card-title',
		'bg-secondary',
		'rounded-top',
		'p-3',
		'm-0',
		'text-primary',
		'text-center'
	);
	postTitle.innerText = postData.title;

	/* link to post */

	const anchor = document.createElement('a');
	anchor.href = '../listing/' + `?id=${postData.id}`;
	anchor.style = 'text-decoration: none';
	anchor.appendChild(postTitle);

	/* Temp Image */

	// // const postImage = document.createElement('img');
	// // postImage.classList.add('img-fluid', 'rounded-0', 'card-img');
	// // postImage.src = postData.media;
	// // console.log(postData.media)
	// // postImage.onerror = function () {
	// // 	postImage.src = 'https://placehold.co/600x400/black/BA2D0B?font=montserrat&text=no+image';
	// // }
	// // postImage.alt = 'Post Image';

	/* Body */
	const bids = document.createElement('p');
	bids.classList.add('m-0', 'bidcount');
	bids.innerText = `Bids: ${postData._count.bids}`;
	const postBody = document.createElement('div');
	const postBodySpacer = document.createElement('hr');
	const postDescription = document.createElement('p');
	postBody.classList.add('post-body', 'card-text', 'p-3', 'bg-secondary', 'text-light');
	postDescription.classList.add('my-3');
	postDescription.innerText = ` Description: ${postData.description}`;

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
	author.classList.add('align-items-center', 'text-primary', 'author');
	author.innerText = `${postData.seller.name}`;

	const authorAvatar = document.createElement('img');
	authorAvatar.classList.add('avatarimg');
	authorAvatar.src = postData.seller.avatar;

	authorBody.append(authorAvatar, author);

	/* Buttons */

	const postButtonGroup = document.createElement('div');
	postButtonGroup.classList.add('btn-group', 'p-1', 'mx-auto');

	const bidButton = document.createElement('button');
	bidButton.classList.add('btn', 'btn-sm', 'btn-outline-primary');
	bidButton.innerText = 'View Listing';
	bidButton.onclick = function () {
		window.location.href = '../listing/' + `?id=${postData.id}`;
	};
	postButtonGroup.appendChild(bidButton);
	postTitle.appendChild(authorBody);
	postDetailsContainer.appendChild(postButtonGroup);
	
	
	/* Images */

	const prevButton = document.createElement('button');
	prevButton.textContent = 'Previous Image';
	prevButton.classList.add('btn', 'btn-primary', 'btn-sm');

	const nextButton = document.createElement('button');
	nextButton.textContent = 'Next Image';
	nextButton.classList.add('btn', 'btn-primary', 'btn-sm');

	const imgNavBtnGroup = document.createElement('div');
	imgNavBtnGroup.classList.add('btn-group', 'p-1');
	imgNavBtnGroup.appendChild(prevButton);
	imgNavBtnGroup.appendChild(nextButton);
	const postImage = document.createElement('img');
	let currentIndex = 0;

	// Function to update the displayed image
	function updateImage() {
		postImage.src = postData.media[currentIndex];
		postImage.alt = `Image ${currentIndex + 1}`;
		postImage.classList.add('img-fluid', 'rounded-0', 'card-img');
		postImage.onerror = function () {
			postImage.src =
				'https://placehold.co/600x400/black/BA2D0B?font=montserrat&text=no+image';
		};
	}

	// shows the previous image
	prevButton.addEventListener('click', function () {
		currentIndex = (currentIndex - 1 + postData.media.length) % postData.media.length;
		updateImage();
	});

	// shows the next image
	nextButton.addEventListener('click', function () {
		currentIndex = (currentIndex + 1) % postData.media.length;
		updateImage();
	});

	// Initialize with the first image
	updateImage();
	console.log(postData.media);
	postBody.append(imgNavBtnGroup, postDescription, postBodySpacer, bids);
	// Append elements to the container
	container.appendChild(anchor);
	container.appendChild(postImage); // Append the image element
	container.appendChild(postBody);
	container.appendChild(postDetailsContainer);
	postWrapper.appendChild(container);
	postWrapper.appendChild(spacer);

	//get path
	const path = location.pathname;

	if (path === '/listing/') {
		console.log(postImage);
		postWrapper.removeChild(spacer);
		function handleScreenSize() {
			console.log('handleScreenSize called');
			const windowWidth = window.innerWidth;

			postWrapper.classList.remove('card-body', 'post', 'mx-auto', 'p-3');
			postWrapper.classList.add('w-limit', 'p-2', 'w-100', 'h-100', 'mx-auto');
			container.classList.remove('w-limit', 'card-body', 'my-2');
			container.classList.add('d-flex', 'w-100');
			postImage.classList.add('m-auto', 'w-75');
			postImage.classList.remove('fluid-img', 'w-100');

			if (windowWidth < 900) {
				// Responsive layout for small screens
				container.classList.remove('d-flex', 'text-center', 'w-100');
				postWrapper.classList.remove(
					'w-limit',
					'p-2',
					'w-100',
					'h-100',
					'mx-auto'
				);
				postWrapper.classList.add('post', 'card-body', 'mx-auto');
				container.appendChild(anchor);
				postWrapper.appendChild(container);
				container.appendChild(postImage);
				container.appendChild(postBody);
				container.appendChild(postDetailsContainer);
			} else {
				postWrapper.appendChild(anchor);
				postWrapper.appendChild(container);
				container.appendChild(postImage);
				container.appendChild(postBody);
				postWrapper.appendChild(postDetailsContainer);
			}
		}
		window.addEventListener('resize', handleScreenSize);
		handleScreenSize();

		postDetailsContainer.removeChild(postButtonGroup);

		const bidderDetails = document.createElement('div');
		bidderDetails.classList.add('my-2', 'd-flex', 'bidder-details', 'flex-column');

		// Loop through the array and create a <p> element for each bidder
		postData.bids.forEach((bid) => {
			const bidderInfo = document.createElement('span');
			bidderInfo.classList.add(
				'd-flex',
				'align-content-center',
				'justify-content-center',
				'flex-row',
				'card-info',
				'bg-secondary',
				'text-light',
				'bg-dark',
				'rounded',
				'p-2',
				'my-1'
			);
			// Unsure if innerHTML is a security risk here, but the API should provide sanitized data.
			bidderInfo.innerHTML = `
			<p class="text-primary my-auto mx-auto"> ${bid.bidderName} bid:</p>
			<span class="credits"> ${bid.amount}c</span>`;
			bidderDetails.appendChild(bidderInfo);
		});

		postBody.appendChild(bidderDetails);

		//get last bid

		const lastBidAmount =
			Number(postData.bids[postData.bids.length - 1]?.amount + 1) || 0 + 1;

		// Set bidding form container
		const formContainer = document.createElement('div');
		formContainer.classList.add('p-0', 'm-0');

		const bidForm = document.createElement('form');
		bidForm.classList.add(
			'd-flex',
			'justify-content-center',
			'align-items-center',
			'text-center'
		);
		// Set label for input box
		const bidLabel = document.createElement('label');
		bidLabel.textContent = 'Your bid: ';
		bidLabel.classList.add('text-primary', 'font-weight-bold', 'mx-2');
		bidLabel.setAttribute('for', 'bidInput');

		// Create Input for bidding
		const bidInput = document.createElement('input');
		bidInput.classList.add('form-control', 'bid-input');
		bidInput.setAttribute('type', 'number');
		bidInput.setAttribute('name', 'amount');
		bidInput.setAttribute('id', 'bidInput');
		// get last bid amount, display it and set minimum bid amount.
		bidInput.setAttribute('value', `${lastBidAmount}`);
		bidInput.setAttribute('min', `${lastBidAmount}`);
		// Append all elements to form
		bidForm.appendChild(bidLabel);
		bidForm.appendChild(bidInput);

		// Create button to place bids
		const bidButton = document.createElement('button');
		bidButton.textContent = 'Place bid';
		bidButton.classList.add('btn', 'btn-secondary', 'mx-1');
		bidButton.addEventListener('click', async function (event) {
			event.preventDefault();

			const formData = new FormData(bidForm);
			const bid = formData.get('amount');

			const data = {
				amount: Number(bid),
			};
			try {
				placeBid(data);
			} catch (error) {
				console.log(error);
			}
		});

		bidForm.appendChild(bidButton);

		formContainer.appendChild(bidForm);

		// Append bid form to post
		postDetailsContainer.appendChild(formContainer);
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
