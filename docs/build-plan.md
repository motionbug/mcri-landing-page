# MCRI Technical Build Plan
**MATTER Career Readiness Institute — Astro + GitHub Pages**
Version 1.1 | March 2026

---

## Stack Summary

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Astro 6.x | Static-first, zero client JS by default, native content collections, excellent image optimization, View Transitions API. Astro 6 brings improved build performance, stable Content Layer API, and the `astro:env` module for environment safety. |
| **Styling** | Tailwind CSS 4.x + CSS custom properties | Tailwind 4 is CSS-first — no `tailwind.config.mjs` file. All configuration (theme tokens, custom utilities, dark mode) lives directly in `global.css` using `@theme`. Significantly faster builds via the new Oxide engine. |
| **Content** | Astro Content Collections (Markdown + frontmatter) | Curriculum tracks, team bios, partner logos, support options, and student projects are all data-driven — not hardcoded. Content Collections give us type-safe frontmatter with Zod schemas. |
| **Hosting** | GitHub Pages | Free, fits the nonprofit context, integrates directly with the existing `robatjamf/mcri` repo. |
| **CI/CD** | GitHub Actions | Automated build and deploy on push to `main`. |
| **Images** | Astro `<Image />` component | Automatic WebP conversion, responsive `srcset`, lazy loading, prevents layout shift. |
| **Icons** | Lucide (via `@lucide/astro`) | Tree-shakeable, consistent line style, works natively in `.astro` files. |
| **Transitions** | Astro View Transitions API | Page-to-page transitions without a full SPA framework. |
| **Animations** | CSS transitions + Intersection Observer (vanilla JS) | Stat counter animation on scroll. No animation library needed — keeps the bundle lean. |

---

## Repository Structure

```
robatjamf/mcri/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deploy workflow
├── public/
│   ├── images/
│   │   ├── hero-students-working.jpg
│   │   ├── students-collaborating.jpg
│   │   ├── classroom-instruction.jpg
│   │   ├── apprenticeship-team.jpg
│   │   ├── campus-exterior.jpg
│   │   ├── team/
│   │   │   ├── kelly-watkins-conrad.jpg
│   │   │   ├── valeria-tschida.jpg
│   │   │   └── dave-saltmarsh.jpg
│   │   └── logos/
│   │       ├── mcri-logo.png
│   │       ├── mcri-logo-white.png
│   │       ├── jamf-cei.png
│   │       ├── jamf-cei-white.png
│   │       ├── jamf.png
│   │       ├── jamf-white.png
│   │       ├── mainsl.png
│   │       ├── mainsl-white.png
│   │       ├── tradition.png
│   │       ├── tradition-white.png
│   │       ├── matter-ngo.png
│   │       └── matter-ngo-white.png
│   ├── docs/
│   │   └── mcri-employment-partner-brief.pdf  # Extract from Slack
│   └── favicon.ico
├── src/
│   ├── content/
│   │   ├── config.ts               # Zod schemas for all collections
│   │   ├── curriculum/             # One .md per track
│   │   │   ├── apple.md
│   │   │   ├── swift.md
│   │   │   ├── jamf.md
│   │   │   ├── essential-skills.md
│   │   │   ├── agentic-ai.md
│   │   │   └── macos.md
│   │   ├── team/                   # One .md per team member
│   │   │   ├── kelly-watkins-conrad.md
│   │   │   ├── valeria-tschida.md
│   │   │   └── dave-saltmarsh.md
│   │   ├── partners/               # One .md per employer partner
│   │   │   ├── jamf.md
│   │   │   ├── mainsl.md
│   │   │   ├── tradition-bank.md
│   │   │   └── matter-ngo.md
│   │   ├── support/                # One .md per support option
│   │   │   ├── employer-partner.md
│   │   │   ├── donate-items.md
│   │   │   └── donate-money.md
│   │   └── projects/               # One .md per student project
│   │       └── (empty at launch, populated Phase 4)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── PageHero.astro
│   │   ├── StatsBar.astro
│   │   ├── LogoBar.astro
│   │   ├── SplitSection.astro
│   │   ├── CalloutBand.astro
│   │   ├── CTABand.astro
│   │   ├── CurriculumGrid.astro
│   │   ├── CurriculumCard.astro
│   │   ├── CurriculumBadge.astro
│   │   ├── ApprenticeshipFeature.astro
│   │   ├── BadgeShowcase.astro
│   │   ├── TeamGrid.astro
│   │   ├── TeamCard.astro
│   │   ├── IconCardRow.astro
│   │   ├── HubMap.astro
│   │   ├── SupportCards.astro
│   │   ├── PortfolioGrid.astro
│   │   ├── EmptyState.astro
│   │   └── DonationCards.astro
│   ├── layouts/
│   │   └── BaseLayout.astro        # <head>, Nav, Footer, ViewTransitions
│   ├── pages/
│   │   ├── index.astro             # Home
│   │   ├── curriculum/
│   │   │   ├── index.astro         # Curriculum main
│   │   │   ├── teal-plus.astro     # TEAL+ sub-page
│   │   │   └── kinder-to-career.astro  # K2C sub-page
│   │   ├── student-work.astro
│   │   ├── about.astro
│   │   └── support.astro
│   ├── data/
│   │   └── nav.ts                  # Navigation link config
│   └── styles/
│       └── global.css              # CSS custom properties, base reset, font imports
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Content Collection Schemas (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const curriculumCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    icon: z.string(),           // Lucide icon name, e.g. "apple", "code", "shield"
    order: z.number(),          // Display order in grid
    credentials: z.array(z.string()),
    credlyBadges: z.array(z.object({
      name: z.string(),
      badgeId: z.string().optional(),  // Credly badge ID — optional until collected
      imageSrc: z.string().optional(), // Fallback static image
    })).optional(),
  }),
});

const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    photo: z.string(),
    linkedin: z.string().url(),
    order: z.number(),
  }),
});

const partnersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    logoWhite: z.string(),
    href: z.string().url().optional(),
    employedCount: z.number(),
    order: z.number(),
  }),
});

const supportCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    ctaExternal: z.boolean().default(false),
    anchorId: z.string(),
    order: z.number(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    student: z.string().optional(),
    description: z.string(),
    imageSrc: z.string(),
    projectUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  curriculum: curriculumCollection,
  team: teamCollection,
  partners: partnersCollection,
  support: supportCollection,
  projects: projectsCollection,
};
```

---

## `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://robatjamf.github.io',
  base: '/mcri',
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: [],  // All images are local — no external domains needed
  },
});
```

**Critical note:** The `base: '/mcri'` is required because the site is hosted at a subpath on GitHub Pages (`robatjamf.github.io/mcri/`), not at the root. All internal links and asset paths must use Astro's `import.meta.env.BASE_URL` or the `base` config to avoid 404s.

**Tailwind 4 integration note:** Tailwind 4 no longer uses `@astrojs/tailwind`. Instead it plugs in directly as a Vite plugin via `@tailwindcss/vite`. No `tailwind.config.mjs` file is needed — all configuration moves into `global.css`.

---

## `src/styles/global.css` (Tailwind 4 — CSS-first config)

Tailwind 4 replaces `tailwind.config.mjs` entirely. Theme tokens, custom colors, fonts, and dark mode are all defined with `@theme` and `@import` in CSS:

```css
@import "tailwindcss";

@theme {
  /* Brand color tokens */
  --color-mcri-navy:  #0F2B4C;
  --color-cei-orange: #E8531A;
  --color-mcri-teal:  #1A7A6E;
  --color-v-ochre:    #C8833A;
  --color-canopy:     #2D6A4F;
  --color-warm-white: #FAF8F5;
  --color-charcoal:   #1C1C1E;
  --color-slate:      #4A5568;
  --color-mist:       #E8E6E1;

  /* Typography */
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body:    "Inter", sans-serif;

  /* Type scale */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3.5rem;
}

/* Dark mode via class strategy */
@variant dark (&:where(.dark, .dark *));

/* Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap");

/* Base reset */
*, *::before, *::after { box-sizing: border-box; }

body {
  font-family: var(--font-body);
  color: var(--color-charcoal);
  background-color: var(--color-warm-white);
  line-height: 1.7;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  line-height: 1.2;
}

/* Skip link for accessibility */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--color-cei-orange);
  color: white;
  padding: 8px 16px;
  z-index: 9999;
  &:focus { top: 0; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

With Tailwind 4, brand colors defined under `@theme` are automatically available as Tailwind utility classes: `bg-mcri-navy`, `text-cei-orange`, `border-mcri-teal`, etc. No separate CSS custom property declarations needed for Tailwind usage — the `@theme` block handles both.

---

## GitHub Actions Deploy Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**GitHub Pages setup:** In repo Settings → Pages → Source: set to "GitHub Actions" (not the legacy "Deploy from branch" option).

---

## Credly Badge Integration

Credly provides an embed script and a `<div>` placeholder. The approach:

```astro
---
// src/components/CurriculumBadge.astro
interface Props {
  badgeId?: string;
  fallbackImage?: string;
  badgeName: string;
}
const { badgeId, fallbackImage, badgeName } = Astro.props;
---

{badgeId ? (
  <div
    data-iframe-width="150"
    data-iframe-height="270"
    data-share-badge-id={badgeId}
    data-share-badge-host="https://www.credly.com"
  ></div>
  <script
    type="text/javascript"
    async
    src="//cdn.credly.com/assets/utilities/embed.js"
  ></script>
) : fallbackImage ? (
  <img src={fallbackImage} alt={`${badgeName} badge`} width="150" height="150" />
) : (
  <div class="badge-placeholder" aria-label={`${badgeName} badge — coming soon`}>
    <span>🏅</span>
    <p>{badgeName}</p>
  </div>
)}
```

**Important:** Credly's embed script runs after page load. Do not use `is:inline` — let it load asynchronously. The Curriculum page should not block rendering waiting for Credly.

---

## Accessibility Requirements (WCAG 2.1 AA)

| Requirement | Implementation |
|---|---|
| Color contrast ≥ 4.5:1 (normal text) | Verified in brand guide; use `oklch()` or hex values as specified |
| Semantic HTML | `<main>`, `<nav>`, `<section aria-labelledby>`, `<article>`, `<header>`, `<footer>` throughout |
| Alt text on all images | Required frontmatter field `imageAlt` in content collections; enforced by Zod schema |
| Keyboard navigation | All interactive elements reachable via Tab; focus rings visible (not `outline: none` without replacement) |
| Skip link | `<a href="#main-content" class="skip-link">Skip to main content</a>` as first element in `<body>` |
| Screen reader labels | All icon-only buttons get `aria-label`; Credly badge embeds get surrounding `<figure>` with `<figcaption>` |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables counter animation and page transitions |
| Mobile touch targets | All interactive elements ≥ 44×44px touch target (use `min-h-[44px] min-w-[44px]` in Tailwind) |

---

## Performance Targets

Target: **Lighthouse 95+** across Performance, Accessibility, Best Practices, SEO.

| Optimization | Method |
|---|---|
| **Zero layout shift** | Explicit `width` and `height` on all `<Image />` components; font preloading |
| **Image optimization** | Astro `<Image />` → WebP output, responsive `srcset`, lazy loading (except hero: `loading="eager"`) |
| **No unused JS** | Astro's partial hydration: `client:load` only for Nav (mobile menu); `client:visible` only for StatsBar counter animation. Everything else is static HTML. |
| **Font loading** | Google Fonts with `display=swap`; preconnect hint in `<head>` |
| **CSS bundle** | Tailwind 4's Oxide engine is significantly faster than v3's PurgeCSS pipeline; scans source files automatically with no manual content paths needed |
| **No third-party blocking scripts** | Credly script is `async`; no analytics until explicitly added (and when added, use `type="module"` deferred script) |
| **HTML minification** | Astro minifies HTML in production builds by default |

---

## Phase Plan

### Phase 1 — Design System + Home + About
**Goal:** Establish the design system, all reusable components, and the two narrative pages.

**Deliverables:**
- [x] `global.css` with all CSS custom properties
- [x] `BaseLayout.astro` (head, nav, footer, ViewTransitions)
- [x] `Nav.astro`, `Footer.astro`
- [x] All shared layout components: `Hero`, `PageHero`, `SplitSection`, `CTABand`, `CalloutBand`, `IconCardRow`
- [x] `StatsBar.astro` with counter animation
- [x] `LogoBar.astro`
- [x] `HubMap.astro`
- [x] `TeamGrid.astro` + `TeamCard.astro` with content collection
- [x] `index.astro` (Home) — fully built
- [x] `about.astro` — fully built
- [x] Content collections: `team/`, `partners/`
- [ ] All photography committed to `public/images/`
- [x] GitHub Actions deploy workflow live

**Prerequisite content needed before Phase 1:** Photography library (from Rob); all team photos; all logo files; Jamf CEI logo files.

---

### Phase 2 — Curriculum
**Goal:** The most content-rich page. Requires curriculum data and (ideally) Credly badge IDs.

**Deliverables:**
- [x] `CurriculumGrid.astro` + `CurriculumCard.astro`
- [x] `CurriculumBadge.astro` with Credly integration (with static fallback)
- [x] `ApprenticeshipFeature.astro`
- [x] `BadgeShowcase.astro`
- [x] Content collection: `curriculum/` — all 6 track `.md` files
- [x] `curriculum/index.astro` — fully built
- [x] Placeholder sub-pages: `teal-plus.astro`, `kinder-to-career.astro` (with "Content coming soon" state)

**Prerequisite content needed before Phase 2:** Credly badge IDs from Kelly; curriculum `.md` content reviewed/approved.

---

### Phase 3 — Support
**Goal:** Conversion-focused page with clear paths and working external links.

**Deliverables:**
- `SupportCards.astro`
- `DonationCards.astro`
- Content collection: `support/`
- `support.astro` — fully built
- Employment Partner Brief PDF in `public/docs/`

**Prerequisite content needed before Phase 3:** PDF extracted from Slack (committed to repo); Benevity and MATTER donation links confirmed active; Dave's contact email confirmed.

---

### Phase 4 — Student Work
**Goal:** Portfolio/gallery with real student projects.

**Deliverables:**
- `PortfolioGrid.astro` + `EmptyState.astro`
- Content collection: `projects/`
- `student-work.astro` — fully built (with empty state if no projects yet)
- At least 4–8 project entries in `projects/` collection

**Prerequisite content needed before Phase 4:** Student project descriptions, screenshots/icons, and published links. Student name consent confirmed.

---

### Phase 5 — Sub-pages (TEAL+ and Kinder-to-Career)
**Goal:** Complete the About section with the two pedagogical sub-pages.

**Deliverables:**
- `teal-plus.astro` — fully written and built
- `kinder-to-career.astro` — fully written and built

**Prerequisite content needed before Phase 5:** Full body copy for both pages from Valeria/Kelly (TEAL+) and Dave (Kinder-to-Career).

---

## Content Checklist Before Launch (Phase 1–3 minimum)

| Item | Owner | Status |
|---|---|---|
| All photography downloaded from Slack, renamed, committed | Rob | ⬜ |
| MCRI logo files (color + white) | Rob | ⬜ |
| Jamf CEI logo files (color + white) | Rob/Kelly | ⬜ |
| Employer logo files (Jamf, Mains'l, Tradition, MATTER NGO) | Rob | ⬜ |
| Team headshots (Kelly, Valeria, Dave) | Dave/Kelly | ⬜ |
| Employment Partner Brief PDF | Rob/Dave | ⬜ |
| Credly badge IDs (all curriculum tracks) | Kelly | ⬜ |
| TEAL+ sub-page body copy | Valeria/Kelly | ⬜ |
| Kinder-to-Career sub-page body copy | Dave | ⬜ |
| Student project list with descriptions + screenshots | Rob/Dave | ⬜ |
| Confirm Benevity donation link is live | Dave | ⬜ |
| Confirm MATTER donation link is live | Dave | ⬜ |
| Hub map image at sufficient resolution | Rob | ⬜ |

---

## Recommended First Commands

```bash
# Initialize project (in existing repo, replace existing site)
npm create astro@latest . -- --template minimal --typescript strict --no-git

# Install Tailwind 4 (Vite plugin approach — no @astrojs/tailwind needed)
npm install tailwindcss @tailwindcss/vite

# Install Lucide icons
npm install lucide-astro

# Start dev server
npm run dev
```

In `src/styles/global.css`, add `@import "tailwindcss";` as the first line — that's all Tailwind 4 needs to activate. No `npx tailwind init`, no config file.

**Note on existing site:** The current GitHub Pages site is a simple static HTML build. The Astro project will replace it entirely. Recommend creating a `v1-archive` branch to preserve the old site before beginning Phase 1.

---

## SEO & Meta

Each page should have unique `<title>` and `<meta name="description">` tags. Managed in `BaseLayout.astro` via props:

```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
}
const { title, description, ogImage = '/images/og-default.jpg' } = Astro.props;
---
<title>{title} | MATTER Career Readiness Institute</title>
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:type" content="website" />
```

Recommended OG image: A clean branded card (1200×630) with MCRI logo, tagline, and a warm student photo. This appears when the site is shared on LinkedIn, Slack, etc. — important for the Apple/Jamf community audience.

---

## Decision Log (Opinionated Recommendations)

**1. Why not use the AgenceX template directly?**
The AgenceX template is a good design reference, but cloning it means taking on someone else's component structure, naming conventions, and any future maintenance debt. Since this site has a well-defined, limited scope (5 pages + 2 sub-pages), building components from scratch against the design system means the codebase is fully owned and understood. Estimated component build time for Phase 1 is the same as the time spent adapting a template.

**2. Why no CMS (Contentful, Sanity, etc.)?**
The content is updated infrequently (program changes, new graduates, new photos). A git-based workflow (edit a `.md` file, commit, auto-deploy) is the right fit for a small team without a dedicated web person. A CMS adds login management overhead, API costs, and complexity for no practical benefit given the update frequency.

**3. Why not Next.js or SvelteKit?**
A static marketing site with 5–7 pages does not need SSR, API routes, or React component hydration. Astro ships zero JavaScript by default and achieves better Lighthouse scores for this use case out of the box. The developer experience for content-driven sites in Astro is also superior to Next.js.

**4. Student Work page — launch as "Coming Soon"?**
Recommended: Yes. Build the page structure in Phase 1, use the `<EmptyState />` component, and populate content in Phase 4 when student projects are collected and consent is confirmed. A clean placeholder is better than delaying the launch of the other four pages.

**5. Dark mode — implement from day one?**
Recommended: Yes, but as a secondary priority within Phase 1. Implement the CSS custom property structure (dark mode overrides) so it's cheap to add later — but don't delay Phase 1 launch for it. The light mode experience is the default and the priority.
