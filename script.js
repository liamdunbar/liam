const views = document.querySelectorAll(".view");
const entries = document.querySelectorAll(".entry");
const updatesContainer = document.getElementById("updates");

/* LEVEL SWITCH */
entries.forEach(entry => {
  entry.onclick = () => {
    const target = entry.dataset.target;

    views.forEach(v => v.classList.add("hidden"));
    document.getElementById(target).classList.remove("hidden");

    if (target === "level4" && updatesContainer.children.length === 0) {
      loadUpdates();
    }
  };
});

/* LOAD UPDATES (STATIC RENDER) */
async function loadUpdates() {
  const res = await fetch("updates/updates.json");
  const data = await res.json();

  data.updates.forEach(update => {
    const post = document.createElement("div");
    post.className = "update-post";

    post.innerHTML = `
      <div class="update-header">
        <img class="update-avatar" src="assets/profile.jpg">
        <div class="update-title">
          <span class="update-name">${update.displayName}</span>
          <span class="update-meta">${update.username} · ${update.date}</span>
        </div>
      </div>

      <div class="update-text">${update.text}</div>
    `;

    if (update.image) {
      const img = document.createElement("img");
      img.src = update.image;
      img.className = "update-image";
      post.appendChild(img);
    }

    updatesContainer.appendChild(post);
  });
}
