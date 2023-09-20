import { filterPosts } from "../../handlers/filterPosts.mjs";

/**
 * This function adds an event listener to an input element with the id 'searchInput'. 
 * It uses a debounce function (delay) to delay the execution of filterPosts function by 300ms 
 * after each keyup event on the searchInput element.
 *
 * @param {Function} func - The function to be executed after a delay.
 * @param {number} delay - The time in milliseconds to delay the execution of func.
 * @return {Function} Returns a function that will execute func after delay milliseconds, 
 * with arguments passed to it.
 */

export function search() {
    

    const delay =
		(func, delay) =>
		(...args) =>
			setTimeout(func, delay, ...args);

	const searchInput = document.querySelector('#searchInput');
    if(searchInput) {

	searchInput.addEventListener(
		'keyup',
		delay((event) => {
			event.preventDefault();
			filterPosts();
		}, 300)
	);
}
}

// I know seperating this might be convoluted but it works