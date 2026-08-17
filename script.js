const statusOrder = { current: 0, future: 1, past: 2 };
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
  if (startupIndex >= 0) {
    currentIndex = startupIndex;
  }

  window.history.replaceState({}, "", "index.html#top");
}

function labelFor(status) {
  if (status === "current") return "Current Project";
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

function reelMarkup(project, index) {
  if (project.video) {
    const posterAttribute = project.poster ? ` poster="${project.poster}"` : "";
    return `
      <video class="reel-video" controls preload="metadata"${posterAttribute}>
        <source src="${project.video}" />
      </video>
    `;
  }

  return `
    <div class="reel-placeholder" style="--poster-gradient: ${gradients[index % gradients.length]}">
      <div class="play-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M8 5.14v13.72L18.78 12 8 5.14Z" />
        </svg>
      </div>
      <span>Demo Reel Video</span>
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

  return `
    <div class="card-labels">
      ${statusChips.join("")}
    </div>
  `;
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
    const index = Number(card.dataset.index);
    card.dataset.position = positionFor(index);
  });
}

function buildCarousel() {
  carousel.innerHTML = "";

  sortedProjects.forEach((project, index) => {
    const card = document.createElement("article");
    const cardClasses = ["project-card"];
    if (project.kind === "reel") cardClasses.push("is-reel");
    if (project.kind === "reel" && project.video) cardClasses.push("has-video");
    card.className = cardClasses.join(" ");
    card.dataset.index = String(index);
    card.dataset.position = positionFor(index);
    card.setAttribute("aria-label", `${project.title}, ${labelFor(project.status)}`);
    card.innerHTML = `
      ${project.kind === "reel" ? reelMarkup(project, index) : posterMarkup(project, index)}
      ${statusMarkup(project)}
      <div class="card-copy">
        <h2>${project.title}</h2>
        <p>${project.logline}</p>
        <span class="learn-more">${project.kind === "reel" ? "Play In Place" : "Learn More"}</span>
      </div>
    `;

    card.addEventListener("click", (event) => {
      if (event.target.closest("video")) return;

      const position = card.dataset.position;
      if (project.kind === "reel" && position === "center") return;

      if (position === "center") {
        window.location.href = `project.html?project=${project.slug}`;
        return;
      }

      if (position === "left" || position === "right" || position === "far-left" || position === "far-right") {
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

document.querySelector(".prev").addEventListener("click", () => moveCarousel(-1));
document.querySelector(".next").addEventListener("click", () => moveCarousel(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveCarousel(-1);
  if (event.key === "ArrowRight") moveCarousel(1);
});

buildCarousel();
