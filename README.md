# Bugashane Mugoovi Film Portfolio

Open `index.html` in a browser to preview the portfolio homepage.

## Contact Links

- Name: Bugashane Mugoovi
- Email: `smugoovi@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/bugashane-mugoovi/`
- IMDb link: currently blank in `index.html` and `project.html`
- Resume link: currently blank in `index.html` and `project.html`

To add IMDb later, open `index.html` and `project.html`, find the `IMDb` link, and paste your IMDb page URL into the empty `href`:

```html
<a href="https://www.imdb.com/name/YOUR_IMDB_ID/" class="text-link" target="_blank" rel="noopener noreferrer">IMDb</a>
```

To add a resume later, export your resume as a PDF, place it in this folder, then open `index.html` and `project.html`, find the `Resume` link, and change the empty `href` to the PDF filename:

```html
<a href="Bugashane_Mugoovi_Resume.pdf" class="text-link" target="_blank" rel="noopener noreferrer">Resume</a>
```

## Projects

Edit `projects-data.js` to update project copy, status, roles, posters, and videos.

Use:

```js
status: "current" // current homepage feature
status: "past"    // past project
```

Use `productionStatus` only when it is useful for a public-facing label. Right now the site only displays it on Finding Your Dog.

## Media

Posters are stored in `assets/posters`. Web-ready videos are stored in `assets/videos`.

Project galleries are stored in `assets/gallery`, and Wartime PDFs are stored in `assets/docs/wartime`.

Large source videos should be compressed before adding to this folder, or hosted externally on YouTube/Vimeo. Punk House currently uses this YouTube video:

```text
https://youtu.be/WOkyFRa-SfM
```

I removed the blank Producer Reel panel for now because the project pages now have real footage, photos, and process materials. Add a reel later only if you have a finished producer reel that improves the homepage immediately.
