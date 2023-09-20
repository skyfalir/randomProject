import * as storage from "../../handlers/storage/index.mjs";

/**
 * Returns a boolean indicating whether the user is currently logged in by checking for the presence of a token in storage.
 *
 * @return {boolean} Returns true if the user is logged in and false otherwise.
 */
export function isLoggedIn(){
    return storage.load('token') ? true : false;
}

/**
 * Retrieves the name from the user's profile stored in the application's local storage.
 *
 * @return {string} The name of the user if found, otherwise null.
 */
export function getName() {
    try {
      const profile = storage.load('profile');
      if (profile && profile.hasOwnProperty('name')) {
        return profile.name;
      }
    } catch {
      return null;
    }
  }
  