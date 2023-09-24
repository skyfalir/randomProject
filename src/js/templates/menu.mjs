import {  getName, isLoggedIn  } from '../api/helpers/storage.mjs';
import { logout } from '../handlers/logout.mjs';
import { getProfile } from '../posts/getProfile.mjs';

/**
 * Checks if the user is logged in and updates the navigation bar accordingly.
 */
const profile = await getProfile();
export function isLoggedInNav() {
	const navMenu = document.querySelector('#navMenu');

	if (isLoggedIn()) {
		const name = getName();
		const credits = profile.credits;
        const avatar = profile.avatar

		navMenu.innerHTML += `
        <li class="nav-item mx-2 text-center">
            <a class="nav-link text-primary font-weight-regular" href="/profile/">${name}
            <img src="${avatar}" class="rounded-circle mx-1" alt="Avatar"</img>
            </a>
        </li>
        <li class="nav-item mx-2 text-center"><p class="credits font-weight-bold">Credits: ${credits}</p> </li>
        <li class="nav-item">
            <button class="btn mx-3 btn-secondary" id="logoutBtn" >Logout</button>
        </li>`;

		logout();
	} else {
		navMenu.innerHTML += `<li class="nav-item">
            <a class="btn mx-1 btn-secondary" href="/login/">Login</a>
        </li>
        <li class="nav-item">
            <a class="btn mx-1 btn-secondary" href="/register/">Register</a>
        </li>`;
	}
}
