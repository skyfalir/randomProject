
/**
 * Filters a list of posts by a search term and displays matching posts.
 *
 * @param {string} searchInput - the search term to filter posts by.
 */
export function filterPosts() {
  const searchError = document.querySelector('#searchError');
  searchError.style.display = 'none';

    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        post.style.display = 'none';
    });

    const searchTerm = searchInput.value.toLowerCase();

    let foundMatch = false;

    posts.forEach(post => {
        const title = post.querySelector('.post-title');
        const body = post.querySelector('.post-body');
  
        if (title && title.textContent.toLowerCase().indexOf(searchTerm) > -1) {
            post.style.display = 'block';
            foundMatch = true;
        } 
        
        if (body && body.textContent.toLowerCase().indexOf(searchTerm) > -1) {
            post.style.display = 'block';
            foundMatch = true;
        }
    });
    if (!foundMatch) {
      searchError.style.display = 'block';
  }
}