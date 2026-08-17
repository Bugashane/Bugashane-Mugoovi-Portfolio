document.addEventListener("click", (event) => {
  const link = event.target.closest(".external-link, .video-fallback-link");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) {
    event.preventDefault();
    return;
  }

  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");

  event.preventDefault();
  const newWindow = window.open(href, "_blank", "noopener,noreferrer");
  if (newWindow) {
    newWindow.opener = null;
  }
});
