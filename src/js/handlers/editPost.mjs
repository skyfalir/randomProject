import { get, update, removePost } from '../posts/index.mjs';
import { load } from '../handlers/storage/index.mjs';
import { getName } from '../api/helpers/storage.mjs';

/**
 * Sets up a listener for the edit post form and handles form submission and deletion.
 *
 * @async
 * @return {Promise<void>} Promise that resolves when setup is complete
 */
export async function setEditPostFormListener() {
  let form;
  try {
    form = document.querySelector('#editForm');
  } catch (err) {
    console.log(err);
  }

  const name = getName();

  if (form) {
    try {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const details = Object.fromEntries(formData.entries());
        details.id = id;

        try {
          await update(post);

          alert(`Post '${post.title}' updated.`);

          window.location.href = '/feed/';
        } catch (err) {
          console.log(err);

          throw new Error('something went wrong');
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
