const statusOrder = { current: 0, future: 1, past: 2 };
const sortedProjects = [...projects].sort((a, b) => {
  const statusDifference = statusOrder[a.status] - statusOrder[b.status];
  return statusDifference || projects.indexOf(a) - projects.indexOf(b);
});

const gradients = [
  "linear-gradient(145deg, #1b2520 0%, #8a7040 50%, #271b18 100%)",
  "linear-gradient(145deg, #182527 0%, #5b7f79 48%, #251715 100%)",
  "linear-gradient(145deg, #251d17 0%, #a06345 52%, #131816 100%)",
  "linear-gradient(145deg, #211923 0%, #734d66 54%, #131816 100%)"
];

function labelFor(status) {
  if (status === "current") return "Current Project";
  if (status === "reel") return "Demo Reel";
  if (status === "future") return "Future";
  return "Past Project";
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

const params = new URLSearchParams(window.location.search);
const slug = params.get("project");
const project =
  sortedProjects.find((item) => item.slug === slug && item.kind !== "reel") ||
  sortedProjects.find((item) => item.kind !== "reel");
const projectIndex = sortedProjects.indexOf(project);
const detail = document.querySelector("#project-detail");
const longDetail = window.projectDetails?.[project.slug];
const heroDetail = longDetail?.[0];
const bodyDetails = longDetail?.slice(1);
const eyebrowParts = [labelFor(project.status)];
if (project.slug === "finding-your-dog") eyebrowParts.push(project.productionStatus);
eyebrowParts.push(project.format);

function renderDetailSections(sections) {
  if (!sections?.length) return "";

  return sections
    .map(
      (section) => `
        <section class="detail-section">
          <h2>${section.title}</h2>
          ${section.items.map((item) => `<p>${item}</p>`).join("")}
        </section>
      `
    )
    .join("");
}

function renderHeroDetail(section) {
  if (!section) return `<p class="project-overview">${project.details}</p>`;

  return `
    <section class="hero-overview">
      <h2>${section.title}</h2>
      ${section.items.map((item) => `<p>${item}</p>`).join("")}
    </section>
  `;
}

function renderProjectVideo(project) {
  if (!project.video) return "";

  const fallbackHref = project.videoUrl || project.video;

  return `
    <section class="project-video-section">
      <div class="video-box">
        ${
          project.videoType === "youtube"
            ? `<iframe width="560" height="315" src="${project.video}" title="${project.title} video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
            : `<video src="${project.video}" controls playsinline></video>`
        }
      </div>
      ${
        project.videoType === "youtube"
          ? `<p class="video-help">If the embedded player does not load, this video may be unlisted or blocked from local playback. <a class="video-fallback-link" href="${fallbackHref}" target="_blank" rel="noopener noreferrer">Press here to watch it on YouTube.</a></p>`
          : ""
      }
    </section>
  `;
}

function renderGalleryButton(image, index, galleryKey, className) {
  return `
    <button class="${className}" type="button" data-gallery="${galleryKey}" data-gallery-index="${index}" aria-label="Open photo ${index + 1}">
      <img src="${image.src}" alt="${image.alt}" loading="lazy" />
    </button>
  `;
}

function renderGallery(project) {
  if (project.slug === "wartime") return "";

  const gallery = window.projectGalleries?.[project.slug];
  if (!gallery?.length) return "";

  return `
    <section class="project-gallery" aria-label="${project.title} photo gallery">
      <div class="gallery-heading">
        <p class="eyebrow">Gallery</p>
        <h2>Production Photos</h2>
      </div>
      <div class="gallery-grid">
        ${gallery
          .map((image, index) => renderGalleryButton(image, index, project.slug, "gallery-item"))
          .join("")}
      </div>
    </section>
  `;
}

function renderWartimeProcess() {
  if (project.slug !== "wartime") return "";

  const images = window.wartimeProcessImages || [];
  const docs = window.wartimeDocuments || [];

  return `
    <section class="wartime-process">
      <div class="gallery-heading">
        <p class="eyebrow">Process</p>
        <h2>Planning Materials</h2>
      </div>
      ${
        images.length
          ? `<div class="process-image-grid">
              ${images
                .map((image, index) => renderGalleryButton(image, index, "wartime-process", "process-image"))
                .join("")}
            </div>`
          : ""
      }
      ${
        docs.length
          ? `<div class="pdf-links">
              <p>Here are a few PDFs, including the script and some of the thoughts that went into making the final video look the way it looks.</p>
              ${docs
                .map(
                  (doc) => `
                    <a href="${doc.href}" target="_blank" rel="noopener noreferrer">${doc.label}</a>
                  `
                )
                .join("")}
            </div>`
          : ""
      }
    </section>
  `;
}

function setupLightbox() {
  const galleries = {
    ...(window.projectGalleries || {}),
    "wartime-process": window.wartimeProcessImages || []
  };
  const buttons = document.querySelectorAll("[data-gallery][data-gallery-index]");
  if (!buttons.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close photo">Close</button>
    <button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous photo">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m15.7 5.3-6 6a1 1 0 0 0 0 1.4l6 6 1.4-1.4L11.82 12l5.3-5.3-1.42-1.4Z" />
      </svg>
    </button>
    <figure class="lightbox-frame">
      <img src="" alt="" />
      <figcaption></figcaption>
    </figure>
    <button class="lightbox-nav lightbox-next" type="button" aria-label="Next photo">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8.3 18.7 6-6a1 1 0 0 0 0-1.4l-6-6-1.4 1.4 5.28 5.3-5.3 5.3 1.42 1.4Z" />
      </svg>
    </button>
  `;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector("figcaption");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const previousButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");
  let activeGallery = "";
  let activeIndex = 0;

  function showPhoto(galleryKey, index) {
    const items = galleries[galleryKey] || [];
    if (!items.length) return;

    activeGallery = galleryKey;
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = `${activeIndex + 1} / ${items.length}`;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    image.removeAttribute("src");
  }

  function movePhoto(direction) {
    showPhoto(activeGallery, activeIndex + direction);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      showPhoto(button.dataset.gallery, Number(button.dataset.galleryIndex));
    });
  });

  image.addEventListener("click", closeLightbox);
  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", () => movePhoto(-1));
  nextButton.addEventListener("click", () => movePhoto(1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") movePhoto(-1);
    if (event.key === "ArrowRight") movePhoto(1);
  });
}

document.title = `${project.title} | Bugashane Mugoovi`;
const homeHref = `index.html?project=${project.slug}#top`;
document.querySelectorAll('a[href="index.html#top"]').forEach((link) => {
  link.href = homeHref;
});
detail.innerHTML = `
  <section class="project-hero">
    <a class="back-link" href="${homeHref}">Back</a>
    <div class="project-poster-frame">
      ${posterMarkup(project, projectIndex)}
    </div>
    <div class="project-info">
      <p class="eyebrow">${eyebrowParts.join(" / ")}</p>
      <h1>${project.title}</h1>
      <p class="project-logline">${project.logline}</p>
      <div class="panel-meta">
        <span>${project.year}</span>
        <span>${project.role}</span>
        ${project.slug === "finding-your-dog" ? `<span>${project.productionStatus}</span>` : ""}
        <span>${project.format}</span>
      </div>
      ${renderHeroDetail(heroDetail)}
    </div>
  </section>
  ${
    bodyDetails?.length
      ? `<section class="project-writing">${renderDetailSections(bodyDetails)}</section>`
      : ""
  }
  ${renderWartimeProcess()}
  ${renderProjectVideo(project)}
  ${renderGallery(project)}
`;

setupLightbox();
