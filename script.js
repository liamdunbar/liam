const terminal = document.getElementById("terminalBody");

/* ===== TYPEWRITER (ORIGINAL, UNTOUCHED) ===== */
function typeText(text, speed = 15, done) {
  terminal.textContent = "";
  let i = 0;

  const interval = setInterval(() => {
    terminal.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (done) done();
    }
  }, speed);
}

/* ===== BOOT (ORIGINAL) ===== */
typeText(
`[SYS] Initializing kernel...
[SYS] Loading terminal interface...
[OK ] Access granted

SELECT A LEVEL`
);

/* ===== DATA (ORIGINAL) ===== */
const DATA = {
  level1: `
SUBJECT PROFILE — LEVEL 1

Name: Froylan Fahlan Aditya
Alias: Liam Dunbar
Age: 18
Origin: Indonesia

Froylan Fahlan Aditya, known online as Liam Dunbar, is an 18-year-old from Indonesia.
He has a calm but introspective presence. He speaks Indonesian and English with a
preference for a UK accent, and he's currently learning German.
`,

  level2a: `
PSYCHOLOGICAL RECORD — LEVEL 2

Social Anxiety
Depression
Intermittent Explosive Disorder
Complex PTSD
Autism Spectrum Disorder
Borderline Personality Traits
Executive Dysfunction
Dissociative Symptoms
Chronic Loneliness and Alienation
`,

  level2b: `
MUSIC ARCHIVE — LEVEL 2

Lost Boy — Ruth B.
Mirror — Lil Wayne ft. Bruno Mars
Iris — Goo Goo Dolls
Somewhere I Belong — Linkin Park
Unwell — Matchbox Twenty
`
};

/* ===== LEVEL HANDLER (ORIGINAL + LEVEL 4) ===== */
document.querySelectorAll(".entry").forEach(entry => {
  entry.onclick = () => {
    const view = entry.dataset.view;

    if (view === "level3") {
      typeText(`LEVEL 3 — RESTRICTED\n\nACCESS DENIED`);
      return;
    }

    if (view === "level4") {
      loadUpdates();
      return;
    }

    typeText(`[SYS] Loading data...\n\n${DATA[view]}`);
  };
});

/* ===== LEVEL 4 — JSON ONLY, NO EXTRA ===== */
function loadUpdates() {
  terminal.innerHTML = "";

  fetch("updates/updates.json")
    .then(res => res.json())
    .then(data => {
      data.updates.forEach(update => {
        const block = document.createElement("div");

        block.style.borderTop = "1px solid #f2e86d";
        block.style.borderBottom = "1px solid #f2e86d";
        block.style.padding = "12px 0";
        block.style.marginBottom = "16px";

        block.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="assets/profile.jpg"
                 style="width:40px;height:40px;border-radius:50%;border:1px solid #f2e86d;object-fit:cover;">
            <div>
              <strong>${update.displayName}</strong>
              <span style="opacity:.75"> ${update.username} · ${update.date}</span>
            </div>
          </div>

          <div style="margin-top:10px;">
            ${update.text}
          </div>
        `;

        if (update.image) {
          const img = document.createElement("img");
          img.src = update.image;
          img.style.marginTop = "10px";
          img.style.maxWidth = "100%";
          img.style.maxHeight = "320px";
          img.style.border = "1px solid #f2e86d";
          block.appendChild(img);
        }

        terminal.appendChild(block);
      });
    });
}
