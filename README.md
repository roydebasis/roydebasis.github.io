# Debasis Roy — Senior Software Engineer

A modern, clean, dynamic, one-page portfolio built with plain HTML, CSS, and JavaScript. No build step, no dependencies — just push to GitHub and it works.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The single page (all sections + SEO meta) |
| `styles.css` | All styling, responsive layout, animations |
| `script.js` | Typing effect, scroll reveal, counters, nav, menu |
| `favicon.svg` | Site icon |
| `.nojekyll` | Tells GitHub Pages not to process files with Jekyll |

## Deploy to GitHub Pages

Your portfolio is meant to live at **`https://roydebasis.github.io`** (a user/organization site).

1. Create (or rename) your repository to exactly **`roydebasis.github.io`**.
2. Push all files in this folder to the **`main`** branch (root — not inside a subfolder).
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/roydebasis/roydebasis.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select **Branch: `main`** and **folder: `/ (root)`**, then **Save**.
6. Wait a minute or two, then visit **`https://roydebasis.github.io`**.

> **Tip:** If your repo has a different name (e.g. `portfolio`), the site will be at `https://roydebasis.github.io/portfolio/`. Update the links in the contact section of `index.html` accordingly, or rename the repo to `roydebasis.github.io` for the clean root URL.

## Local preview

Just open `index.html` in a browser, or serve the folder locally:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## Customize

- **Content:** all text lives in `index.html` (search for the name, email, links, experience, projects).
- **Colors:** edit the design tokens at the top of `styles.css` (`:root` variables).
- **Roles in the typing animation:** edit the `roles` array near the top of `script.js`.

## Features

- Responsive design (desktop, tablet, mobile) with a collapsible nav menu
- Animated role typing, scroll-reveal sections, animated stat counters and skill bars
- Domain-specific hero visual: a `funding-intake.pipeline` (Gmail → n8n → OpenAI → scorecard → DocuSeal) that unlocks one stage at a time while earlier stages stay unlocked; the status flips to `complete` on the final stage, then the sequence restarts
- Sticky nav with active-section highlight and scroll-progress bar
- Back-to-top button, smooth scrolling, accessible skip link
- One-click "copy email" button in the contact section (with clipboard fallback)
- Deep Laravel/backend skill coverage (Eloquent, queues, events, service classes, repository pattern)
- Accurate stats: 4 companies since 2017, 9 third-party integrations
- Respects `prefers-reduced-motion` for accessibility
- SEO/Open Graph + Twitter share metadata with `headshot.jfif` as the preview image, and an SVG favicon
