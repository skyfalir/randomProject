import { getProfile, put } from '../posts/index.mjs';


export async function setEditProfileListener() {
	const form = document.querySelector('#editForm');
  const profileData = await getProfile();

  const profileName = document.getElementById('profileName');
  profileName.innerText = `${profileData.name}`;

  const profileEmail = document.getElementById('profileEmail');
  profileEmail.innerText = `${profileData.email}`;

  const profileCredits = document.getElementById('profileCredits');
  profileCredits.innerText = `${profileData.credits}`

	if (form) {
		form.addEventListener('submit', async function (event) {
			event.preventDefault();
      const formData = new FormData(form);
      const imageUrl = formData.get('avatar');
    
      // Create the PUT request body
      const data = {
        avatar: imageUrl,
      };
 
		try {
			put(data);
			alert(`Profile Updated!`);
		} catch (error) {
			 console.log(error);
		}     
  });
	}
}
