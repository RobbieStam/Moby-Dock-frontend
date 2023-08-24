function createPostElement (data) {
  const post = document.createElement("div");
  post.className = "post-container";

  const title = document.createElement("h2");
  title.textContent = data["title"];
  post.appendChild(title);

  const author = document.createElement("h3");
  author.textContent = `Author:  ${data["author"]}`;
  post.appendChild(author);

  const genre = document.createElement("h3")
  genre.textContent = `Genre: ${data["genre"]}`;
  post.appendChild(genre);

  const email = document.createElement("h3")
  email.textContent = `Contact: ${data["email"]}`;
  post.appendChild(email);

  return post;
}

function managePostElement (data) {
  const post = document.createElement("div");
  post.className = "post-container";

  const title = document.createElement("h2");
  title.textContent = data["title"];
  post.appendChild(title);

  const author = document.createElement("h3");
  author.textContent = `Author:  ${data["author"]}`;
  post.appendChild(author);

  const genre = document.createElement("h3")
  genre.textContent = `Genre: ${data["genre"]}`;
  post.appendChild(genre);

  const email = document.createElement("h3")
  email.textContent = `Contact: ${data["email"]}`;
  post.appendChild(email);

  const button = document.createElement("btn")
  button.textContent = "Delete Post"
  button.className = "delete-btn"
  button.setAttribute('post_id', data["id"])
  post.appendChild(button);

  button.addEventListener('click', async (e) => {
    const postToDelete = e.currentTarget.getAttribute('post_Id')
   
    const confirmation = confirm('Are you sure you want to delete this post? Click OK to confirm.')

    if (confirmation) {
       const options = {
        method:'DELETE'
      }
      const response = await fetch (`https://frolin-library-api.onrender.com/trades/${postToDelete}`, options)
  
      if(response.ok) {
        window.location.reload();
      }
    } 
  })
  return post;
}

function clearPosts () {
  const posts = document.getElementById("posts")
  posts.childElementCount;

  while(posts.lastChild) {
    posts.lastChild.remove();
  }
  }


document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: form.get("title"),
      author: form.get("author"),
      genre: form.get("genre"),
      email: form.get("email")
    })
  }

  const result = await fetch("https://frolin-library-api.onrender.com/trades", options);

  if (result.status == 201) {
    window.location.reload();
    alert('Book Succesfully Uploaded!, Keep an eye on your email for trade offers.')
  }
})

async function loadPosts () {
  clearPosts();
  const response = await fetch("https://frolin-library-api.onrender.com/trades");

  if (response.status == 200) {
    const posts = await response.json();
    const container = document.getElementById("posts");

    posts.forEach(p => {
      const elem = createPostElement(p);
      container.appendChild(elem);
    })
  } else {
    window.location.assign("./home.html")
  }
  
}

async function loadUserPosts () {
  clearPosts();
  const options = {
    headers: {
      'Authorization': localStorage.getItem("token")
    }
  }

  const response = await fetch("https://frolin-library-api.onrender.com/trades", options);

  if (response.status == 200) {
    const posts = await response.json();

    const container = document.getElementById("posts");

    posts.forEach(p => {
      const elem = managePostElement(p);
      container.appendChild(elem);
    })
  } else {
    window.location.assign("./home.html");
  }

}



