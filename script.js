const folderContent = {
  certificates: {
    label: "CERTS",
    title: "Certificates",
    html: `
      <div class="empty-state">
        <strong>Nothing filed here just yet.</strong>
        Add your certificates, courses, or workshops when you’re ready. This folder is yours to fill.
      </div>
    `,
  },
  background: {
    label: "BACKGROUND",
    title: "A little about me",
    html: `
      <article class="detail-card">
        <span class="detail-label">THE HUMAN BIT</span>
        <h3>Designer, listener, idea untangler.</h3>
        <p>
          I’m Muhaimin, a UI/UX designer on The Bit-tles team. I care about clear
          visual hierarchy, accessible interactions, and making digital tools
          feel supportive instead of stressful.
        </p>
      </article>
      <article class="detail-card">
        <span class="detail-label">CURRENTLY EXPLORING</span>
        <h3>Designing for everyday wellbeing</h3>
        <p>
          I’m interested in how thoughtful product experiences can make
          complicated, busy days feel a little easier to manage.
        </p>
      </article>
    `,
  },
  achievements: {
    label: "ACHIEVEMENTS",
    title: "Little big wins",
    html: `
      <article class="detail-card">
        <span class="detail-label">DESIGN ITERATION · 11 SEP 2026</span>
        <h3>Turned mentor feedback into a clearer interface</h3>
        <p>
          Helped refine BitTyme’s visual direction with stronger hierarchy,
          brighter cards, and clearer paths through the core features.
        </p>
      </article>
      <article class="detail-card">
        <span class="detail-label">PRODUCT DESIGN · BITTYME</span>
        <h3>Designed around less friction</h3>
        <p>
          Contributed to a voice-first workload assistant concept focused on
          helping students protect their energy and avoid burnout.
        </p>
      </article>
    `,
  },
  projects: {
    label: "PROJECTS",
    title: "Selected work",
    html: `
      <article class="detail-card">
        <span class="detail-label">01 / PRODUCT DESIGN · THE BIT-TLES</span>
        <h3>BitTyme — beating the burnout</h3>
        <p>
          A voice-first workload assistant concept for students. BitTyme helps
          make workload visible, suggests ways to rebalance packed schedules,
          and pairs practical planning with a friendly companion.
        </p>
        <div class="tag-list">
          <span class="tag">UX DESIGN</span><span class="tag">PROTOTYPING</span>
          <span class="tag">WELLBEING</span><span class="tag">MOBILE</span>
        </div>
        <img class="project-preview" src="images/Smart-Greeting-Home.png" alt="BitTyme app home screen design">
        <a class="detail-link" href="https://canva.link/l60hhniv4jvi39q" target="_blank" rel="noreferrer">VIEW THE UI PROTOTYPE ↗</a>
      </article>
      <article class="detail-card">
        <span class="detail-label">THE PROBLEM, THE PROCESS, THE DETAILS</span>
        <p>Explore the project story and design decisions documented in the repository.</p>
        <a class="detail-link" href="README.md">READ THE BITTYME CASE STUDY ↗</a>
      </article>
    `,
  },
  stack: {
    label: "MY STACK",
    title: "Tools & technologies",
    html: `
      <article class="detail-card">
        <span class="detail-label">DESIGN PRACTICE</span>
        <h3>From rough idea to clickable flow</h3>
        <p>
          UI/UX design, interface design, prototyping, user flows, and
          responsive visual systems.
        </p>
        <div class="tag-list">
          <span class="tag">UI/UX</span><span class="tag">USER FLOWS</span>
          <span class="tag">PROTOTYPING</span><span class="tag">VISUAL DESIGN</span>
        </div>
      </article>
      <article class="detail-card">
        <span class="detail-label">BITTYME PROJECT STACK</span>
        <p>React Native · Expo · Supabase</p>
      </article>
      <div class="empty-state">
        <strong>Make this list yours.</strong>
        Add the design apps, tools, and technologies you use day to day.
      </div>
    `,
  },
  contact: {
    label: "CONTACT",
    title: "Let’s make something good.",
    html: `
      <article class="detail-card">
        <span class="detail-label">OPEN CHANNEL</span>
        <h3>Have a project or idea?</h3>
        <p>
          I’m open to thoughtful collaborations and conversations about design.
          Add your preferred email or social link here so people can reach you.
        </p>
      </article>
      <div class="empty-state">
        <strong>Contact details are yours to add.</strong>
        Replace this note with your email address and any professional profile links.
      </div>
    `,
  },
};

const windowElement = document.querySelector("#folder-window");
const windowTitle = document.querySelector("#window-title");
const windowPathName = document.querySelector("#window-path-name");
const folderDetails = document.querySelector("#folder-details");
const closeButton = document.querySelector(".close-control");
const clock = document.querySelector("#clock");
const toast = document.querySelector("#toast");
let toastTimeout;
let lastTrigger;

function openFolder(folderId, trigger) {
  const folder = folderContent[folderId];
  if (!folder) return;

  lastTrigger = trigger;
  windowTitle.textContent = folder.title;
  windowPathName.textContent = folder.label;
  folderDetails.innerHTML = folder.html;
  windowElement.hidden = false;
  closeButton.focus();
}

function closeFolder() {
  windowElement.hidden = true;
  lastTrigger?.focus();
}

document.querySelectorAll("[data-open-folder]").forEach((button) => {
  button.addEventListener("click", () => openFolder(button.dataset.openFolder, button));
});

closeButton.addEventListener("click", closeFolder);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !windowElement.hidden) {
    closeFolder();
    return;
  }

  if (event.key === "Tab" && !windowElement.hidden) {
    const focusable = windowElement.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

function updateClock() {
  clock.textContent = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

updateClock();
setInterval(updateClock, 30_000);

document.querySelector(".dock-mail").addEventListener("click", (event) => {
  openFolder("contact", event.currentTarget);
});

document.querySelector(".dock-folder").addEventListener("click", (event) => {
  openFolder("projects", event.currentTarget);
});

document.querySelector(".dock-home").addEventListener("click", () => {
  lastTrigger = document.querySelector(".dock-home");
  closeFolder();
  toast.textContent = "YOU'RE ALREADY HOME. MAKE YOURSELF COMFY.";
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2200);
});
