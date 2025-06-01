const postForm = document.getElementById("post-form");
const postContent = document.getElementById("post-content");
const postsWrapper = document.getElementById("posts-wrapper");
const editInput = document.getElementById("postId");
let posts = [];

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (postContent.value === "") {
    return;
  }
  const content = postContent.value;
  const post = {
    author: "Mariam",
    postDate: new Date().toLocaleString(),
    content: content,
  };
  posts.push(post);
  if (editInput.value) {
    // Editing existing post
    const postId = editInput.value;
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      postContent.value = "";
      editInput.value = "";
      displayPosts();
    } else {
      console.error("Error updating post");
    }
  } else {
    // Create posts
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      postContent.value = "";
      displayPosts();
    } else {
      console.error("Error creating post");
    }
  }
});

// Handel Enter key to post and enter+shift to move to a new line
postContent.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    postForm.requestSubmit();
  }
});

async function displayPosts() {
  const response = await fetch("http://localhost:3000/posts");
  const posts = await response.json();

  postsWrapper.innerHTML = "";
  posts.forEach((post) => {
    // Create the post container
    const postElement = document.createElement("div");
    postElement.classList.add(
      "post",
      "mb-3",
      "mt-3",
      "p-2",
      "border",
      "rounded",
      "position-relative"
    );

    // Create user name
    const userNameWrapper = document.createElement("div");
    userNameWrapper.classList.add("d-flex", "align-items-center");
    const userName = document.createElement("h4");
    userName.innerText = post.author;
    const userIcon = document.createElement("i");
    userIcon.classList.add("fa-solid", "fa-circle-user", "fs-4", "me-2");

    // Create date
    const dateElement = document.createElement("span");
    dateElement.textContent = `Posted on: ${post.postDate}`;
    dateElement.classList.add("text-muted");

    // Create post content
    const contentElement = document.createElement("p");
    contentElement.classList.add("mt-3");
    contentElement.textContent = post.content;

    // Create edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    editBtn.classList.add(
      "btn",
      "btn-primary",
      "position-absolute",
      "top-0",
      "end-0",
      "m-2"
    );
    editBtn.addEventListener("click", function (e) {
      e.preventDefault();
      let editPost = post.content;
      postContent.value = editPost;
      editInput.value = post.id;
    });

    // Append
    userNameWrapper.appendChild(userIcon);
    userNameWrapper.appendChild(userName);
    postElement.appendChild(userNameWrapper);
    postElement.appendChild(dateElement);
    postElement.appendChild(contentElement);
    postElement.appendChild(editBtn);
    postsWrapper.appendChild(postElement);
  });
}

// Call it once at page load
displayPosts();
