import { isLoggedIn } from "./storage.mjs";

/**
 * Redirects user if they are logged in or not.
 */

const path = location.pathname;
export function redirectIfLoggedIn(){
    if(isLoggedIn()){
        if (path === '/login/' || path === '/register/') {
           location.href = '/feed/';
        }
    } else{
        if (path === '/feed/' || path === '/profile/') {
            location.href = '/login/';
        }
    }
    
}