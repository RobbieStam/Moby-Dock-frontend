function createPostElement (data) {
  const post = document.createElement("div");
  post.className = "post-container";

  const title = document.createElement("h2");
  title.textContent = data["title"];
  post.appendChild(header);

  const author = document.createElement("p");
  author.textContent = data["author"];
  post.appendChild(content);

  return post;
}
