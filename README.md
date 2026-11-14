# Kumar Anshu — Portfolio

A responsive React portfolio built with Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Run locally

1. Install Node.js 18+.
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.
4. Run `npm run build` to create the deployable `dist` folder.

## Deploy

### Vercel
Import this repository in Vercel. Framework preset: **Vite**; build command: `npm run build`; output directory: `dist`.

### Netlify
Import the repository in Netlify. Build command: `npm run build`; publish directory: `dist`.

## Personalize

- Replace `public/resume.pdf` with your final resume, keeping that filename. The current PDF contains only details supplied in the brief.
- Project data and contact details are in `src/data.js`. Replace project repository/demo URLs and the email placeholder with real destinations.
- Project artwork is drawn with CSS as lightweight placeholders. Swap the `.project-art` blocks in `src/App.jsx` for optimized local images when screenshots are available.
- Fill graduation year, CGPA, coursework, and any real achievements in `src/data.js` before publishing.
- Connect GitHub by creating a repository, then push this project and import it into Vercel or Netlify.

The contact form validates input and provides a clear success state. It is front-end only until connected to a form service or backend endpoint.
