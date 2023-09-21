import { getCredit, getName, isLoggedIn } from "../api/helpers/storage.mjs";
import { logout } from "../handlers/logout.mjs";
import { getProfile } from "../posts/getProfile.mjs";

/**
 * Checks if the user is logged in and updates the navigation bar accordingly.
 */
const profile = await getProfile();
export function isLoggedInNav(){
    const navMenu = document.querySelector('#navMenu');

    if (isLoggedIn()) {
        const name = getName();
        const credits = profile.credits;


        navMenu.innerHTML += 
        `<li class="nav-item mx-2 text-center">
            <a class="nav-link text-secondary" href="/profile/">${name}</a>
               <p>Credits: ${credits}</p> 
        </li>
        <li class="nav-item">
            <button class="btn btn-secondary" id="logoutBtn" >Logout</button>
        </li>`;

        logout();

    } else{
        navMenu.innerHTML += 
        `<li class="nav-item">
            <a class="btn mx-1 btn-secondary" href="/login/">Login</a>
        </li>
        <li class="nav-item">
            <a class="btn mx-1 btn-secondary" href="/register/">Register</a>
        </li>`;
    }
}