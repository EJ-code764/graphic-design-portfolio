# EJ Studio — Graphic Design Portfolio

A standalone **React + Vite + JavaScript (JSX)** portfolio. No database, backend, or TypeScript.

## Run locally

Requirements: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (often `http://localhost:5173`).

## Add your own projects

1. Put your image files inside `public/projects/`. Prefer optimized `.webp` images (or JPG/PNG).
2. Open `src/data/projects.js`.
3. Add an object like this to the array:

```js
{
  id: 'my-campaign',
  title: 'My Campaign',
  category: 'Social Media',
  year: '2026',
  summary: 'A short description of the design.',
  cover: '/projects/my-campaign-cover.webp',
  images: [
    '/projects/my-campaign-cover.webp',
    '/projects/my-campaign-slide-2.webp',
    '/projects/my-campaign-slide-3.webp',
  ],
  featured: true,
  demo: false,
  beforeAfter: {
    before: '/projects/my-original.webp',
    after: '/projects/my-redesign.webp',
  },
}
```

- Each project automatically becomes **one card**. All items in `images` display in that card's gallery.
- Category filter buttons are automatically generated from the distinct `category` values in the data file.
- To skip before-and-after for a project, set `beforeAfter: null`.
- Use unique `id` values. Set `featured: true` for the featured filter.
- `demo: true` labels a project as a sample; use `demo: false` for your actual work.
- The starter demo SVG designs are fictional examples. **Remove or replace them before sharing the site with clients.**
- Gallery images should be your own or used with appropriate permission. Obtain client permission before publishing confidential work.

## Update branding, contact links, résumé and profile photo

Open `src/data/site.js`:

- `profileImage`: upload `public/profile/me.jpg` and set `profileImage: '/profile/me.jpg'`.
- `resumeUrl`: add your real PDF at `public/resume.pdf`, then set `resumeUrl: '/resume.pdf'`.
- `email`: set your real email so the **Hire Me** button goes to the correct inbox.
- `behanceUrl`: replace the Behance homepage URL with your own Behance profile URL.
- Edit `name`, `about`, `intro`, `services`, and `tools` to reflect your actual skills.
- Color variables live near the top of `src/styles.css`. Current design uses blue and purple EJ Studio styling, Montserrat headings, and Inter body text.

**Important:** `public/resume.html`, `your-email@example.com`, and the Behance homepage are placeholders. Update them before sharing the public portfolio.

## Features

- Full-screen image modal, image zoom, arrow-key navigation, thumbnail navigation, Escape-to-close.
- Multi-image campaigns: one project card, many images.
- Auto-generated category filters and featured-only toggle.
- Drag-to-compare before-and-after slider for projects that supply two images.
- Resume, Hire Me, and Behance buttons.
- Dark/light theme toggle, responsive desktop/tablet/mobile layout.
- Profile-photo placeholder.

## Build & deploy

```bash
npm run build
npm run preview
```

Deploy with Vercel or Netlify (build command `npm run build`, output directory `dist`). To add new projects later, update the image files and `projects.js`, then redeploy.

This graphic design portfolio is **separate** from the video editing portfolio, with no crosslinks.
