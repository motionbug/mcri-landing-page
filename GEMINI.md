# GEMINI.md - MATTER Career Readiness Institute (MCRI) Landing Page

This file provides context and guidelines for interacting with the MCRI Landing Page project.

## Project Overview

The MCRI Landing Page is a static-first, high-performance website for the MATTER Career Readiness Institute, a post-secondary technology education program in Victoria Falls, Zimbabwe. It serves as a narrative and informational hub for students, employer partners, and donors.

- **Framework:** Astro 6.x (Static-first, zero client JS by default)
- **Styling:** Tailwind CSS 4.x (CSS-first configuration via `@theme`)
- **Icons:** Lucide (via `lucide-astro`)
- **Content:** Astro Content Layer (Markdown files with Zod-validated frontmatter)
- **Hosting:** GitHub Pages (`motionbug.github.io/mcri-landing-page/`)
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`)

## Building and Running

### Prerequisites
- Node.js >= 22.12.0 (configured in `package.json` engines)
- npm

### Key Commands
- `npm run dev`: Starts the local development server at `localhost:4321`.
- `npm run build`: Builds the production-ready static site to the `dist/` directory.
- `npm run preview`: Previews the production build locally.
- `npm run astro -- [command]`: Runs Astro CLI commands (e.g., `astro check`).

## Development Conventions

### 1. Content-Driven Architecture
Most page content is driven by **Content Collections** located in `src/content/`. 
- **Schemas:** Defined in `src/content.config.ts` using Zod.
- **Collections:** `curriculum`, `team`, `partners`, `support`, `projects`.
- **Adding Content:** To add a new team member or partner, create a new `.md` file in the corresponding subdirectory of `src/content/`.

### 2. Styling (Tailwind 4)
This project uses **Tailwind CSS 4.x**, which is CSS-first. 
- **Configuration:** No `tailwind.config.mjs` exists. All theme tokens (colors, fonts, etc.) are defined in `src/styles/global.css` using the `@theme` block.
- **Theme Tokens:** Brand colors like `--color-mcri-navy`, `--color-cei-orange`, and `--color-mcri-teal` are automatically available as Tailwind classes (e.g., `bg-mcri-navy`).

### 3. Layouts & Components
- **BaseLayout:** All pages must use `src/layouts/BaseLayout.astro`, which handles the `<head>`, `Nav`, `Footer`, and `ViewTransitions`.
- **Navigation:** Navigation links are managed in `src/data/nav.ts`.
- **Assets:** Static images and documents are stored in `public/images/` and `public/docs/`. Use Astro's `<Image />` component for automatic optimization.
- **Base URL:** The site is hosted on a subpath. Always use `import.meta.env.BASE_URL` or ensure links/assets are handled by Astro's `base` configuration in `astro.config.mjs`.

### 4. Performance & Accessibility
- **Target:** Lighthouse scores of 95+ across all categories.
- **Accessibility:** Adhere to WCAG 2.1 AA. Use semantic HTML, ensure proper color contrast, and provide descriptive `alt` text for images (enforced by Zod schemas).
- **Client JS:** Minimize the use of client-side JavaScript. Only hydrate components when absolutely necessary (e.g., mobile menu, counter animations) using `client:load` or `client:visible`.

## Key Files
- `astro.config.mjs`: Project configuration, site URL, and Vite plugins.
- `src/content.config.ts`: Zod schemas for all content collections.
- `src/styles/global.css`: Tailwind 4 theme and global CSS rules.
- `src/data/nav.ts`: Central source of truth for navigation links.
- `docs/build-plan.md`: Comprehensive technical strategy and phase plan.

## Recent Improvements (April 2026)
- **Typography Consolidation:** Merged `text-5xl` and `text-6xl` into a single `text-5xl` (3.5rem) for a more consistent type scale.
- **Accessibility:** Replaced generic "Learn More" headings with descriptive text.
- **Empty States:** Added `EmptyState` component coverage to `TeamGrid` and `LogoBar` to handle missing content gracefully.
- **Badge Integration:** Integrated the official MCRI Professional badge image into the `BadgeShowcase` component.
- **Logo Visibility:** Improved partner logo visibility on dark backgrounds in the `StatsBar` using robust CSS filters and updated scale factors.

## TODOs / Roadmap
- [ ] Implement Phase 4 (Student Work) with real project data.
- [x] Finalize content for `teal-plus.astro` and `kinder-to-career.astro`. (Placeholders active)
- [x] Verify Credly badge IDs for all curriculum tracks. (MCRI Professional image integrated; others pending)

