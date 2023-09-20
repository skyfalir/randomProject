import { getName, isLoggedIn } from "../api/helpers/storage.mjs";
import { logout } from "../handlers/logout.mjs";

/**
 * Checks if the user is logged in and updates the navigation bar accordingly.
 */
export function isLoggedInNav(){
    const navMenu = document.querySelector('#navMenu');

    if (isLoggedIn()) {
        const name = getName();


        navMenu.innerHTML += 
        `<li class="nav-item mx-2 text-center">
            <a class="nav-link text-secondary" href="/profile/">${name}</a>
                <img src="../assets/img/user.png" class="account-icon" alt="Profile Icon">
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