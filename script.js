const terminal = document.getElementById("terminalBody");

/* SAFE TYPEWRITER (NO INPUT DELETION) */
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

/* BOOT LOG */
typeText(
`[SYS] Initializing kernel...
[SYS] Loading terminal interface...
[OK ] Access granted

SELECT A LEVEL`
);

/* DATA */
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

His heart is drawn to Austria and Germany — places he dreams of living in someday,
hoping to find peace within himself and a sense of belonging he's been searching for.

A quiet soul carrying many storms inside.
Empathetic. Protective. Human.
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

/* LEVEL CLICK HANDLER */
document.querySelectorAll(".entry").forEach(entry => {
  entry.onclick = () => {
    const view = entry.dataset.view;

    if (view === "level3") {
      passwordGate();
    } else {
      typeText(`[SYS] Loading data...\n\n${DATA[view]}`);
    }
  };
});

/* PASSWORD GATE — ALWAYS DENIES */
function passwordGate() {
  terminal.innerHTML = `
LEVEL 3 — RESTRICTED

ENTER PASSWORD:

<div class="command">
  <span>&gt;</span>
  <input id="pw" autofocus />
</div>
`;

  const pw = document.getElementById("pw");

  pw.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      typeText(
`[ERR] ACCESS DENIED
[LOG] Unauthorized attempt recorded

Entering restricted command mode...

Type "help"`,
20,
commandMode
      );
    }
  });
}

/* RESTRICTED COMMAND MODE */
function commandMode() {
  terminal.innerHTML += `
<div class="command">
  <span>&gt;</span>
  <input id="cmd" autofocus />
</div>
`;

  const cmdInput = document.getElementById("cmd");

  cmdInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const cmd = e.target.value.trim().toLowerCase();
      let out = "\nUNKNOWN COMMAND";

      if (cmd === "help") {
        out = "\nAVAILABLE COMMANDS:\nhelp\ncontact";
      }

      if (cmd === "contact") {
        out = `
CONTACT INFORMATION

Instagram: @simplefroy
WhatsApp: +62 851-6184-0928
Telegram: @Wakeyliam
Snapchat: zfroyden
Twitter: @FahlanAditya
`;
      }

      terminal.textContent += `\n> ${cmd}\n${out}`;
      e.target.value = "";
    }
  });
}
