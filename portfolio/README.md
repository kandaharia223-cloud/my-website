# Sanullah Feroz — Personal Portfolio

A premium, modern, fully responsive personal portfolio website built with **HTML5**, **CSS3**, and **Vanilla JavaScript** only. No React, Vue, Angular, Tailwind, Bootstrap, or jQuery. Open `index.html` in any browser to view.

## Features

- Sticky navbar with active links, scroll styling, and animated mobile menu
- Full-screen hero with typing effect and a scrolling tech ticker
- About (with profile photo), Skills (incl. AI + Agentic AI categories), Projects (filterable, with a featured project), Services, Journey timeline, Contact, Footer
- Restrained scroll-reveal animations, form validation, accessibility basics
- Light editorial design system: warm paper background, ink text, single warm accent, serif display + clean sans

## Technologies

- HTML5 (semantic structure)
- CSS3 (custom properties, Flexbox, Grid, keyframes)
- Vanilla JavaScript (Intersection Observer, typing effect, filters, form UX)
- Google Fonts: Fraunces (display), Inter (UI), JetBrains Mono (labels)

## Folder Structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/      # Profile & project images
│   └── icons/       # Optional custom icons
└── README.md
```

## How to Run

1. Open the `portfolio` folder.
2. Double-click `index.html`, or right-click → Open with your browser.
3. Or from a terminal:

```bash
# From the portfolio folder — any static server works, e.g.:
npx serve .
# or
python -m http.server 8000
```

Then visit the local URL shown (e.g. `http://localhost:8000`).

## Customize Personal Info

Edit `index.html`:

| Item | Where |
|------|--------|
| Name, title, about text | Hero, About, Footer |
| Email | Contact, Footer, `mailto:` links |
| Skill levels | `.skill-item__level` text + `data-level` (`Learning` / `Familiar` / `Proficient` / `Advanced`) |
| Stats | About section `.stat` cards |
| Projects | `#projects-grid` cards (`data-category`, titles, tags, links) |
| Services / Journey | Respective sections |

Colors and fonts live in `:root` inside `style.css`.

## Images

**Profile photo** — the About section uses `assets/images/profile.png`. Replace that file with
your own portrait (portrait orientation works best; it is cropped to a 4:5 frame). For faster
loading, consider exporting an optimised JPG/WebP and updating the `src` in `index.html`.

**Project cards** — replace `.project-card__placeholder` with:

```html
<img src="assets/images/your-project.jpg" alt="Project name screenshot" loading="lazy">
```

Keep images optimized (WebP/JPG, reasonable dimensions).

## Add Social Links

Search for `TODO: Replace #` in `index.html` (Contact + Footer).

Replace `href="#"` with your real URLs:

- GitHub: `https://github.com/your-username`
- LinkedIn: `https://linkedin.com/in/your-profile`
- X/Twitter: `https://x.com/your-handle`

## Connect Contact Form (EmailJS or Backend)

The form validates and shows a **demo success** message only — it does not send email.

### Option A — EmailJS

1. Create a free [EmailJS](https://www.emailjs.com/) account and email template.
2. Add their browser SDK to `index.html` (before `script.js`).
3. In `script.js`, replace the demo delay in the form submit handler with `emailjs.send(...)`.
4. Prefer public keys with domain restrictions; never commit private secrets.

### Option B — Backend API

```js
await fetch("https://your-api.com/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fullName, email, subject, message }),
});
```

Until then, visitors can use **Email Me** (`mailto:sanullahferoz270@gmail.com`).

## Accessibility & Motion

- Semantic landmarks, labels, focus styles, ARIA on the menu and form
- `prefers-reduced-motion` disables typing/reveal animations

## License

Personal portfolio for **Sanullah Feroz**. © 2026 Sanullah Feroz. All rights reserved.
