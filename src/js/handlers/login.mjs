import { login } from '../api/auth/login.mjs';
import { displayMessage } from '../templates/displayMessage.mjs';
import * as storage from '../handlers/storage/index.mjs';

/**
 * Sets a listener for the login form submission. When the form is submitted,
 * this function extracts the form data and sends it to the `login` function.
 */
export function setloginFormListener() {
	const form = document.querySelector('#loginForm');

	if (form){
	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		const profile = Object.fromEntries(formData.entries());

		const button = form.querySelector('button');
		button.innerText = 'Logging in...';

		const fieldset = form.querySelector('fieldset');
		fieldset.disabled = true;
		
		try{

		const { accessToken, ...user} = await login(profile);
		storage.save('token', accessToken);
		storage.save('profile', user);
		window.location.href = '/feed/';

		}catch(error){
			displayMessage('danger', error, '#showError');
			console.error(error);
		}
		finally{
			button.innerText = 'Login';
			fieldset.disabled = false;
		}
	});
  }
}
