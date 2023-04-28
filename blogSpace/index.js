const blogList = document.getElementById("blog-list");
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementById("new-post");

let postsArray = [];

const renderPosts = () => {
  let html = "";
  for (let post of postsArray) {
    html += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr />
      `;
  }
  document.getElementById("blog-list").innerHTML = html;
};

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts();
  });

document.getElementById("new-post").addEventListener("submit", (e) => {
  e.preventDefault();
  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  const data = {
    title: postTitle,
    body: postBody,
  };
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPosts();
      form.reset();
    });
});
