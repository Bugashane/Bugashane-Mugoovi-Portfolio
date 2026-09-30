# Bugashane Mugoovi Film Portfolio

Open `index.html` in a browser to preview the portfolio homepage.

## Contact Links

- Name: Bugashane Mugoovi
- Email: `smugoovi@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/bugashane-mugoovi/`
- IMDb link: currently blank in `index.html` and `project.html`
- Resume link: points to `Bugashane_Mugoovi_Resume.html`

To add IMDb later, open `index.html` and `project.html`, find the `IMDb` link, and paste your IMDb page URL into the empty `href`:

```html
<a href="https://www.imdb.com/name/YOUR_IMDB_ID/" class="text-link" target="_blank" rel="noopener noreferrer">IMDb</a>
```

To replace the public HTML resume with a PDF later, place the PDF in this folder, then update the `Resume` link in `index.html`, `project.html`, and `contact.html`:

```html
<a href="Bugashane_Mugoovi_Resume.pdf" class="text-link" target="_blank" rel="noopener noreferrer">Resume</a>
```

## Contact Form

The Contact page uses Formspree so it can submit without opening a visitor's mail app or exposing a private key.

1. Create a Formspree account and create a form that delivers to `smugoovi@gmail.com`.
2. Confirm the email address when Formspree asks.
3. Copy the form endpoint, such as `https://formspree.io/f/abcdwxyz`.
4. In `contact.html`, replace the empty `data-endpoint=""` on the `<form>` with that endpoint.
5. Publish the site and send a test message. The form includes a hidden honeypot field and Formspree's own spam protection.

There is also a private helper page named `resume-updater.html`. It is not linked from the public portfolio. Open it directly if you want to add a new experience, replace an older experience, edit current experience bullets, update skills, and download a fresh `Bugashane_Mugoovi_Resume.html`.

## Projects

Edit `projects-data.js` to update project copy, status, roles, Showcase grouping, temporary-poster flags, posters, and videos.

Use:

```js
status: "current" // current homepage feature
status: "upcoming" // upcoming release, shown after the current feature
status: "past"    // past project
```

Use `roleTag` for the short role shown on project cards and pages, `showcaseGroup` for the Showcase drawer section, and `tempPoster: true` when a placeholder poster should be labeled.

Use `productionStatus` only when it is useful for a public-facing label. Right now the site only displays it on Finding Your Dog.

## Media

Posters are stored in `assets/posters`. Web-ready videos are stored in `assets/videos`.

Project galleries are stored in `assets/gallery`, and Wartime PDFs are stored in `assets/docs/wartime`.

Large source videos should be compressed before adding to this folder, or hosted externally on YouTube/Vimeo. Punk House currently uses this YouTube video:

```text
https://youtu.be/WOkyFRa-SfM
```

I removed the blank Producer Reel panel for now because the project pages now have real footage, photos, and process materials. Add a reel later only if you have a finished producer reel that improves the homepage immediately.
