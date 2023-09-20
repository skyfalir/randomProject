import { create } from '../posts/index.mjs';

/**
 * Sets a listener on the 'submit' event of the #createPostForm HTML form element
 * and creates a new post using the form data when submitted.
 */
export function setPostFormListener() {
    const form = document.querySelector('#createPostForm');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);

            // Handle the media field to convert it into an array of URLs
            const mediaValue = formData.get('media');
            const mediaArray = mediaValue.split(',').map(url => url.trim());

            // Update the formData with the array
            formData.set('media', mediaArray);

            const post = Object.fromEntries(formData.entries());
            try {
                await create(post);
                console.log(post);
                alert(`Post '${post.title}' created!`);

                //window.location.reload();

            } catch (error) {
                console.error(error);

                alert("Error creating post");
            }
        });
    }
}


  