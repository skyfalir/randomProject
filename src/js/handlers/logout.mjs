import { isLoggedIn } from "../api/helpers/storage.mjs";
import { remove } from "./storage/index.mjs";

/**
 * Logout function that removes authentication token and reloads page.
 */
export function logout() {
    const logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', () => {
      if (isLoggedIn()) { // check if user is logged in before logging out
        remove('token');
        location.reload();
      } else {
        console.log('User is already logged out.');
      }
    }); 
}
 