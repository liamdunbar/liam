// ===== SAFE LOAD =====
document.addEventListener("DOMContentLoaded", () => {

  // MODALS
  const settingsModal = document.getElementById("settingsModal");
  const modeModal = document.getElementById("modeModal");

  const startBtn = document.querySelector(".start-btn");
  const plusBtn = document.querySelector(".plus");
  const closeButtons = document.querySelectorAll(".close-btn");
  const saveBtn = document.querySelector(".save-btn");

  // PROFILE ELEMENTS
  const displayNameTop = document.getElementById("displayNameTop");
  const displayNameCard = document.getElementById("displayNameCard");
  const conversationTitle = document.getElementById("conversationTitle"); // ✅ NEW
  const usernameHandle = document.getElementById("usernameHandle");
  const dateText = document.getElementById("dateText");
  const avatarSmall = document.getElementById("avatarSmall");
  const avatarBig = document.getElementById("avatarBig");

  const inputs = settingsModal.querySelectorAll("input");
  const imageSelect = settingsModal.querySelector("select");

  // CHAT
  const chatArea = document.getElementById("chatArea");
  const sendBtn = document.querySelector(".send");
  const textInput = document.getElementById("textInput");

  const senderBtn = document.querySelector(".mode-btn.sender");
  const receiverBtn = document.querySelector(".mode-btn.receiver");

  let currentMode = "sender";

  // OPEN SETTINGS
  startBtn.addEventListener("click", () => {
    settingsModal.classList.add("active");
  });

  // OPEN MODE SELECT
  plusBtn.addEventListener("click", () => {
    modeModal.classList.add("active");
  });

  // CLOSE BUTTONS
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      settingsModal.classList.remove("active");
      modeModal.classList.remove("active");
    });
  });

  // CLICK OUTSIDE
  window.addEventListener("click", (e) => {
    if (e.target === settingsModal) settingsModal.classList.remove("active");
    if (e.target === modeModal) modeModal.classList.remove("active");
  });

  // SAVE PROFILE
  saveBtn.addEventListener("click", () => {

    const newDisplayName = inputs[0].value;
    const newUsername = inputs[1].value;
    const newDate = inputs[2].value;
    const newImage = imageSelect.value;

    if (newDisplayName) {
      displayNameTop.textContent = newDisplayName;
      displayNameCard.textContent = newDisplayName;
      if (conversationTitle) {
        conversationTitle.textContent = "First conversation with " + newDisplayName;
      }
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
      const path = "updates/media/" + newImage;
      avatarSmall.src = path;
      avatarBig.src = path;
    }

    settingsModal.classList.remove("active");
  });

  // MODE SELECT
  senderBtn.addEventListener("click", () => {
    currentMode = "sender";
    modeModal.classList.remove("active");
  });

  receiverBtn.addEventListener("click", () => {
    currentMode = "receiver";
    modeModal.classList.remove("active");
  });

  // SEND MESSAGE
  sendBtn.addEventListener("click", () => {

    const text = textInput.value.trim();
    if (!text) return;

    const msgRow = document.createElement("div");
    msgRow.classList.add("msg-row");

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    if (currentMode === "sender") {
      msgRow.classList.add("right");
      bubble.classList.add("blue");
    } else {
      msgRow.classList.add("left");
      bubble.classList.add("dark");
    }

    bubble.textContent = text;
    msgRow.appendChild(bubble);
    chatArea.appendChild(msgRow);

    textInput.value = "";
  });

});
