/**
 * Exports 3 functions for interacting with the localstorage API.
 * @function save() takes a key and value to store an item in localStorage.
 * @function load() takes a key to load an item from localStorage.
 * @function remove() takes a key to remove an item from localStorage.
 */
export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function load(key) {
    try{
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    }catch{
        return null
    }
}
export function remove(key) {
    localStorage.removeItem(key);
}
