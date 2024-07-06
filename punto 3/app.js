document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            return response.json();
        })
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${post.title}`;
        postList.appendChild(listItem);
    });
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};
