/**
 * Displays a message of a given type in a specified target element.
 *
 * @param {string} type - The type of message to display ('success', 'warning', 'danger', etc.).
 * @param {string} message - The message to display.
 * @param {string} target - The selector for the element where the message should be displayed.
 */
export function displayMessage(type, message, target){
    const container = document.querySelector(target);

    container.innerHTML = `
        <div class="alert alert-${type}" role="alert">
        ${message}
        </div>`
}