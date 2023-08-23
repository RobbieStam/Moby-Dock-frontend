function createPostElement (data) {
  const post = document.createElement("div");
  post.className = "post-container";

  const title = document.createElement("h3");
  title.textContent = data["title"];
  post.appendChild(title);

  const author = document.createElement("h3");
  author.textContent = data["author"];
  post.appendChild(author);

  const genre = document.createElement("h3")
  genre.textContent = data["genre"];
  post.appendChild(genre);

  return post;
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
      genre: form.get("genre")
    })
  }

  const result = await fetch("http://localhost:4000/lenders", options);

  if (result.status == 201) {
    window.location.reload();
    alert({ message: 'Book Successfully Posted.'})
  }
})

async function loadPosts () {

  const response = await fetch("http://localhost:4000/lenders", options);

  if (response.status == 200) {
    const posts = await response.json();

    const container = document.getElementById("posts")

    posts.forEach(p => {
      const elem = createPostElement(p);
      container.appendChild(elem);
    })
  } else {
    window.location.assign("./index.html")
  }
}

loadPosts();
