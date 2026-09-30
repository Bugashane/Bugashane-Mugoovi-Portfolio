const statusOrder = { current: 0, upcoming: 1, future: 2, past: 3 };
const gradients = [
  "linear-gradient(145deg, #1b2520 0%, #8a7040 50%, #271b18 100%)",
  "linear-gradient(145deg, #182527 0%, #5b7f79 48%, #251715 100%)",
  "linear-gradient(145deg, #251d17 0%, #a06345 52%, #131816 100%)",
  "linear-gradient(145deg, #211923 0%, #734d66 54%, #131816 100%)"
];

const sortedProjects = [...projects].sort((a, b) => {
  const statusDifference = statusOrder[a.status] - statusOrder[b.status];
  return statusDifference || projects.indexOf(a) - projects.indexOf(b);
});

let currentIndex = Math.max(0, sortedProjects.findIndex((project) => project.status === "current"));
const carousel = document.querySelector(".carousel");
const startupProject = new URLSearchParams(window.location.search).get("project");

if (startupProject) {
  const startupIndex = sortedProjects.findIndex((project) => project.slug === startupProject);
  if (startupIndex >= 0) currentIndex = startupIndex;
  window.history.replaceState({}, "", "index.html#top");
}

function labelFor(status) {
  if (status === "current") return "Current Project";
  if (status === "upcoming") return "Upcoming Release";
  if (status === "reel") return "Demo Reel";
  if (status === "future") return "Future";
  return "Past Project";
}

function getWrappedIndex(index) {
  return (index + sortedProjects.length) % sortedProjects.length;
}

function posterMarkup(project, index) {
  if (project.poster) {
    return `<img class="poster" src="${project.poster}" alt="${project.title} poster" />`;
  }

  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3);

  return `
    <div class="poster-fallback" style="--poster-gradient: ${gradients[index % gradients.length]}">
      <div class="poster-mark">${initials}</div>
    </div>
  `;
}

function statusMarkup(project) {
  const statusChips = [`<div class="status-pill status-main">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 2.7 2.82 5.72 6.31.92-4.56 4.45 1.08 6.28L12 17.1l-5.65 2.97 1.08-6.28-4.56-4.45 6.31-.92L12 2.7Z" />
        </svg>
        <span>${labelFor(project.status)}</span>
      </div>`];

  if (project.slug === "finding-your-dog") {
    statusChips.push(`<div class="status-pill">In Post-Production</div>`);
  }

  statusChips.push(`<div class="status-pill">${project.format}</div>`);
  if (project.roleTag) statusChips.push(`<div class="status-pill role-pill">${project.roleTag}</div>`);
  if (project.tempPoster) statusChips.push(`<div class="status-pill temp-poster-pill">Temporary Poster</div>`);

  return `<div class="card-labels">${statusChips.join("")}</div>`;
}

function positionFor(index) {
  const offset = index - currentIndex;
  const wrappedOffset =
    Math.abs(offset) > sortedProjects.length / 2
      ? offset - Math.sign(offset) * sortedProjects.length
      : offset;

  if (wrappedOffset === 0) return "center";
  if (wrappedOffset === -1) return "left";
  if (wrappedOffset === 1) return "right";
  if (wrappedOffset === -2) return "far-left";
  if (wrappedOffset === 2) return "far-right";
  return "hidden";
}

function updateCarousel() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.dataset.position = positionFor(Number(card.dataset.index));
  });
}

function buildCarousel() {
  carousel.innerHTML = "";

  sortedProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.index = String(index);
    card.dataset.position = positionFor(index);
    card.setAttribute(
      "aria-label",
      [project.title, labelFor(project.status), project.roleTag].filter(Boolean).join(", ")
    );
    card.innerHTML = `
      ${posterMarkup(project, index)}
      ${statusMarkup(project)}
      <div class="card-copy">
        <h2>${project.title}</h2>
        <p>${project.logline}</p>
        <span class="learn-more">Learn More</span>
      </div>
    `;

    card.addEventListener("click", () => {
      const position = card.dataset.position;
      if (position === "center") {
        window.location.href = `project.html?project=${project.slug}`;
        return;
      }

      if (["left", "right", "far-left", "far-right"].includes(position)) {
        currentIndex = index;
        updateCarousel();
      }
    });

    carousel.appendChild(card);
  });
}

function moveCarousel(direction) {
  currentIndex = getWrappedIndex(currentIndex + direction);
  updateCarousel();
}

function buildShowcase() {
  const list = document.querySelector(".showcase-list");
  const groups = new Map();

  sortedProjects.forEach((project) => {
    const group = project.showcaseGroup || "Other Work";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(project);
  });

  list.innerHTML = Array.from(groups, ([group, items]) => `
    <section class="showcase-group">
      <h3>${group}</h3>
      <div class="showcase-projects">
        ${items
          .map(
            (project) => `
              <a class="showcase-project" href="project.html?project=${project.slug}">
                <span>${project.title}</span>
                <small>${project.roleTag || project.format}</small>
              </a>
            `
          )
          .join("")}
      </div>
    </section>
  `).join("");
}

function setupShowcase() {
  const handle = document.querySelector(".showcase-handle");
  const drawer = document.querySelector(".showcase-drawer");
  const closeButton = drawer.querySelector(".panel-close");
  let isOpen = false;
  let touchStartX = 0;

  function setOpen(nextOpen) {
    isOpen = nextOpen;
    drawer.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("showcase-is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    handle.setAttribute("aria-expanded", String(isOpen));
  }

  handle.addEventListener("click", () => setOpen(!isOpen));
  closeButton.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) setOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (isOpen && !drawer.contains(event.target) && !handle.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const distance = endX - touchStartX;
    if (!isOpen && touchStartX > window.innerWidth - 56 && distance < -48) setOpen(true);
    if (isOpen && distance > 48) setOpen(false);
  }, { passive: true });
}

document.querySelector(".prev").addEventListener("click", () => moveCarousel(-1));
document.querySelector(".next").addEventListener("click", () => moveCarousel(1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveCarousel(-1);
  if (event.key === "ArrowRight") moveCarousel(1);
});

buildCarousel();
buildShowcase();
setupShowcase();
