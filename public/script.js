// ELEMENTS
const settingsModal = document.getElementById("settingsModal");
const startBtn = document.querySelector(".start-btn");
const closeButtons = document.querySelectorAll(".close-btn");
const saveBtn = document.querySelector(".save-btn");

// Editable elements
const displayNameTop = document.getElementById("displayNameTop");
const displayNameCard = document.getElementById("displayNameCard");
const usernameHandle = document.getElementById("usernameHandle");
const dateText = document.getElementById("dateText");
const avatarSmall = document.getElementById("avatarSmall");
const avatarBig = document.getElementById("avatarBig");

// Modal inputs
const inputs = settingsModal.querySelectorAll("input");
const imageSelect = settingsModal.querySelector("select");


// OPEN SETTINGS
startBtn.addEventListener("click", () => {
  settingsModal.classList.add("active");
});


// CLOSE BUTTONS
closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    settingsModal.classList.remove("active");
  });
});


// CLICK OUTSIDE TO CLOSE
window.addEventListener("click", (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.remove("active");
  }
});


// SAVE LOGIC
saveBtn.addEventListener("click", () => {

  const newDisplayName = inputs[0].value;
  const newUsername = inputs[1].value;
  const newDate = inputs[2].value;
  const newImage = imageSelect.value;

  if (newDisplayName) {
    displayNameTop.textContent = newDisplayName;
    displayNameCard.textContent = newDisplayName;
  }

  if (newUsername) {
    usernameHandle.textContent = newUsername.startsWith("@")
      ? newUsername
      : "@" + newUsername;
  }

  if (newDate) {
    dateText.textContent = newDate;
  }

  if (newImage) {
    const imagePath = "updates/media/" + newImage;
    avatarSmall.src = imagePath;
    avatarBig.src = imagePath;
  }

  settingsModal.classList.remove("active");
});
