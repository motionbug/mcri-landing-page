# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# MCRI — Claude Code Project Guide
**MATTER Career Readiness Institute** | Astro 6 + Tailwind CSS 4 + GitHub Pages

---

## What This Project Is

A redesigned public website for the MATTER Career Readiness Institute (MCRI) — a post-secondary technology institution in Victoria Falls, Zimbabwe. The site serves three audiences simultaneously:

1. **Primary:** Apple community and potential employer partners evaluating the program
2. **Secondary:** Jamf stakeholders wanting program context
3. **Secondary:** Parents and students learning about the program

The site is 5 pages + 2 sub-pages. It is a static marketing site — no backend, no auth, no database.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6.1 |
| Styling | Tailwind CSS 4.2 (CSS-first, no config file) |
| Content | Astro Content Collections + Markdown |
| Icons | Lucide (`lucide-astro`) |
| Hosting | GitHub Pages (subpath: `/mcri`) |
| CI/CD | GitHub Actions |
| Transitions | `<ClientRouter />` from `astro:transitions` |

**Critical:** The site is hosted at `https://robatjamf.github.io/mcri/` — not at the root. The `base: '/mcri'` in `astro.config.mjs` handles this. Always use `import.meta.env.BASE_URL` for internal links and asset paths. Never hardcode `/mcri/`.

---

## Astro 6 — Key Differences from Docs

- Content collections config: **`src/content.config.ts`** (NOT `src/content/config.ts`) — both files exist; `src/content/config.ts` is a legacy Astro 3/4 leftover and is **not active**
- Collections use the glob loader: `loader: glob({ pattern: '**/*.md', base: './src/content/...' })`
- View Transitions: `import { ClientRouter } from 'astro:transitions'` (not `ViewTransitions`)
- Google Fonts `@import url(...)` must come **before** `@import "tailwindcss"` in global.css

---

## Repository Structure

```
mcri-landing-page/
├── .github/workflows/deploy.yml   # GitHub Actions → GitHub Pages
├── docs/                          # Planning documents (read-only reference)
├── public/
│   ├── images/
│   │   ├── hero-home.jpg          # Home hero (one of 3 in random rotation)
│   │   ├── students.jpg           # Full cohort group photo
│   │   ├── campus.jpg             # Students in courtyard
│   │   ├── campus2.jpg            # Campus exterior (About hero)
│   │   ├── campus3.jpg            # Aerial campus view
│   │   ├── support-employer-partner.jpg
│   │   ├── support-classroom.jpg
│   │   ├── support-donate-items.jpg
│   │   ├── hub-map.png            # World map with hub pins
│   │   ├── team/                  # kelly-watkins-conrad.jpg, valeria-tschida.jpg, dave-saltmarsh.jpg
│   │   └── logos/                 # mcri-logo.png, mcri-logo-icon.png, jamf-cei.png,
│   │                              #   jamf-cei-white.png, jamf-white.png, mainsl.png,
│   │                              #   matter-ngo.png, matter-ngo-white.png,
│   │                              #   matter-ngo-icon.png, tradition.png
│   └── docs/
│       └── mcri-employment-partner-brief.pdf
├── src/
│   ├── content.config.ts          # Zod schemas — Astro 6 Content Layer API
│   ├── content/
│   │   ├── curriculum/            # apple.md, swift.md, jamf.md, essential-skills.md,
│   │   │                          #   agentic-ai.md, macos.md
│   │   ├── team/                  # kelly-watkins-conrad.md, valeria-tschida.md, dave-saltmarsh.md
│   │   ├── partners/              # jamf.md, mainsl.md, tradition-bank.md, matter-ngo.md
│   │   ├── support/               # employer-partner.md, donate-items.md, donate-money.md
│   │   └── projects/              # Empty — placeholder for Phase 4
│   ├── components/                # All reusable .astro components (see list below)
│   ├── layouts/
│   │   └── BaseLayout.astro       # <head>, Nav, Footer, ClientRouter
│   ├── pages/
│   │   ├── index.astro
│   │   ├── curriculum/index.astro
│   │   ├── curriculum/teal-plus.astro
│   │   ├── curriculum/kinder-to-career.astro
│   │   ├── student-work.astro
│   │   ├── about.astro
│   │   └── support.astro
│   ├── data/nav.ts                # Navigation link config
│   └── styles/global.css          # Tailwind 4 @theme + base styles
├── astro.config.mjs
└── package.json
```

---

## Tailwind CSS 4 — How It Works Here

No `tailwind.config.mjs`. All configuration lives in `src/styles/global.css` under `@theme {}`.

```css
/* src/styles/global.css — imports must be in this order */
@import url("https://fonts.googleapis.com/...");  /* FIRST */
@import "tailwindcss";

@theme {
  --color-mcri-navy:   #0F2B4C;
  --color-cei-orange:  #E8531A;
  --color-mcri-teal:   #1A7A6E;
  --color-v-ochre:     #C8833A;
  --color-canopy:      #2D6A4F;
  --color-warm-white:  #FAF8F5;
  --color-charcoal:    #1C1C1E;
  --color-slate:       #4A5568;
  --color-mist:        #E8E6E1;
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body:    "Inter", sans-serif;
}
```

Use token class names (`bg-mcri-navy`, `text-cei-orange`) — never raw hex values inline.

---

## Brand Colours

| Token | Hex | Use for |
|---|---|---|
| `mcri-navy` | `#0F2B4C` | Nav, footer, dark section backgrounds |
| `cei-orange` | `#E8531A` | Primary CTA buttons, highlights |
| `mcri-teal` | `#1A7A6E` | Secondary CTAs, accents, MissionStack Purpose row |
| `v-ochre` | `#C8833A` | Eyebrow labels, MissionStack Strategy row |
| `canopy` | `#2D6A4F` | Success states, MissionStack Goal row |
| `warm-white` | `#FAF8F5` | Page background, card surfaces |
| `charcoal` | `#1C1C1E` | Body text on light backgrounds |
| `slate` | `#4A5568` | Secondary text, captions |
| `mist` | `#E8E6E1` | Borders, dividers |

**Contrast rule:** Never place `v-ochre` or `canopy` text on `warm-white` — contrast fails WCAG AA.

---

## Component Library

| Component | Purpose | Notes |
|---|---|---|
| `Nav.astro` | Sticky nav, mobile hamburger | Scroll-aware backdrop blur at 80px |
| `Footer.astro` | 3-column footer | LinkedIn → company page, not personal |
| `Hero.astro` | Full-viewport home hero | Random bg image on each load (inline script) |
| `PageHero.astro` | Interior page hero with breadcrumb | |
| `StatsBar.astro` | Animated employment counters | Intersection Observer, no library |
| `LogoBar.astro` | Employer logo row | |
| `SplitSection.astro` | 50/50 text + image | `imagePosition="left\|right"`, accepts `<slot>` |
| `CalloutBand.astro` | Full-width colour band | `background="teal\|navy\|orange"` |
| `CTABand.astro` | End-of-page CTA | 1 or 2 buttons |
| `MissionStack.astro` | Goal/Strategy/Mission/Purpose/Belief stacked rows | Navy bg, brand-coloured slashes, staircase indent |
| `BenefitsAndEquity.astro` | 2-col: student benefits + gender equity | |
| `IconCardRow.astro` | 3-col icon cards | Used for Sustainability on About |
| `HubMap.astro` | World map + hub/country stats | White bg (map image has white bg) |
| `TeamGrid.astro` | 3-col bio cards from `team` collection | |
| `TeamCard.astro` | Individual bio card | |
| `SubpageLinkCards.astro` | 2-col feature link cards | |
| `CurriculumGrid.astro` | 3×2 curriculum track grid | From `curriculum` collection |
| `CurriculumCard.astro` | Individual track card with badge | |
| `CurriculumBadge.astro` | Credly embed with fallback | |
| `ApprenticeshipFeature.astro` | Teal full-width apprenticeship callout | |
| `BadgeShowcase.astro` | Centred MCRI Professional badge | |
| `PortfolioGrid.astro` | Student project grid | Shows `EmptyState` when collection empty |
| `EmptyState.astro` | Placeholder for empty collections | |
| `SupportCards.astro` | ⚠️ Not used on support page | Kept for potential reuse |
| `DonationCards.astro` | ⚠️ Not used on support page | Kept for potential reuse |

### Hero Random Image Rotation
`Hero.astro` uses a `<script is:inline>` that reads `data-base` from the section element and picks randomly from `['hero-home.jpg', 'students.jpg', 'campus.jpg']` on each page load. The server-rendered default is `hero-home.jpg` to prevent flash.

### Hydration
- Inline `<script>` — Nav (mobile toggle, scroll blur), Hero (random bg), StatsBar (counter animation)
- Everything else — zero JS

---

## About Page — Section Order

1. PageHero (campus2.jpg, dark overlay)
2. SplitSection — Victoria Falls, Zimbabwe + feeder schools
3. MissionStack — Goal / Strategy / Mission / Purpose / Belief
4. BenefitsAndEquity — student benefits + gender equity
5. IconCardRow — sustainability (solar, local construction, universal design)
6. HubMap — world map, 28 hubs / 8 countries
7. TeamGrid — Kelly, Valeria, Dave
8. CEI Mission Statement + SubpageLinkCards
9. CTABand

---

## Support Page — Design Decision

The support page uses **three self-contained inline cards** — not the `SupportCards` or `DonationCards` components. This was a deliberate redesign to eliminate duplication (cards linking to expanded sections that repeated the same information). Each card now contains its full content:
- Card 1 (Employer Partner): description + PDF download + contact CTA
- Card 2 (Donate Items): description + contact CTA
- Card 3 (Financial): description + Benevity button + MATTER button

---

## Key People & Links

| Person | Role | Email | LinkedIn |
|---|---|---|---|
| Kelly Watkins Conrad | Senior Program Engineer, Jamf CEI | — | `linkedin.com/in/kellywc/` |
| Valeria Tschida, MAT | Senior Community Education Program Manager, Jamf | — | `linkedin.com/in/valeria-tschida-5697185/` |
| David J. Saltmarsh, EdD. | Senior Director, Community Education Initiatives, Jamf | dave.saltmarsh@jamf.com | `linkedin.com/in/davesaltmarsh/` |

**Footer LinkedIn:** Company page → `linkedin.com/company/matterinnovationcentre/`
**Jamf CEI link:** `jamf.com/corporate-responsibility/giving-back/`
**MATTER NGO MCRI article:** `matter.ngo/the-matter-career-readiness-institute-making-the-impossible-possible/`

---

## Logos — What Exists vs What's Missing

| File | Status | Notes |
|---|---|---|
| `mcri-logo.png` | ✅ | Coloured, used on light bg — **no white version exists** |
| `jamf-cei.png` | ✅ | Dark text version |
| `jamf-cei-white.png` | ✅ | White text version for dark bg |
| `jamf-white.png` | ✅ | White text — only Jamf logo we have |
| `mainsl.png` | ✅ | Colour — used for both LogoBar and StatsBar |
| `tradition.png` | ✅ | Colour — used for both LogoBar and StatsBar |
| `matter-ngo.png` | ✅ | Dark text |
| `matter-ngo-white.png` | ✅ | White text |
| `jamf.png` (colour) | ❌ | Missing — no colour Jamf logo |
| `mcri-logo-white.png` | ❌ | Missing — no white MCRI logo |
| `mainsl-white.png` | ❌ | Missing — Mains'l StatsBar entry uses colour logo |
| `tradition-white.png` | ❌ | Missing — Tradition StatsBar entry uses colour logo |

---

## Content Gaps (outstanding)

| Gap | Page | Owner |
|---|---|---|
| Credly badge IDs for curriculum tracks | `/curriculum` | Kelly |
| TEAL+ model body copy | `/curriculum/teal-plus` | Valeria/Kelly |
| Kinder-to-Career body copy | `/curriculum/kinder-to-career` | Dave |
| Student project descriptions + screenshots | `/student-work` | Rob/Dave |
| Confirm Benevity donation link is live | `/support` | Dave |
| White MCRI logo | Nav, Footer | Rob |
| White logos for Mains'l and Tradition Bank | StatsBar | Rob |
| Team headshots already committed ✅ | About | Done |
| Employment Partner Brief PDF committed ✅ | Support | Done |
| Hub map image committed ✅ | About | Done |

---

## Phase Status

- **Phase 1** — Design system + Home + About ✅ **Complete**
- **Phase 2** — Curriculum ✅ **Built** (awaiting Credly badge IDs from Kelly)
- **Phase 3** — Support ✅ **Built** (awaiting donation link confirmation from Dave)
- **Phase 4** — Student Work ⏳ Placeholder built, awaiting project content
- **Phase 5** — TEAL+ and Kinder-to-Career ⏳ Placeholder built, awaiting body copy

---

## Build & Deploy

```bash
npm run dev       # Dev server at localhost:4321/mcri/
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

Deploy is automatic — push to `main` triggers GitHub Actions → GitHub Pages.

---

## Reference Documents

All planning documents live in `docs/`:

| File | Contents |
|---|---|
| `docs/brand-guide.md` | Color palette, typography, voice/tone |
| `docs/sitemap-ia.md` | Full site structure, content blocks, audience notes |
| `docs/wireframes.md` | Section-by-section build specs for all 5 pages |
| `docs/build-plan.md` | Repo structure, schemas, config templates |

---

## BaseLayout Props

```astro
interface Props {
  title: string;
  description: string;
  ogImage?: string;  // defaults to '/images/og-default.jpg'
}
```

Every page must pass unique `title` and `description`.

---

## Accessibility Requirements (WCAG 2.1 AA)

- All images: descriptive `alt`. Decorative only: `alt=""`.
- First element in `<body>`: `.skip-link` → `#main-content`
- Every `<section>`: `aria-labelledby` pointing to its heading
- Icon-only buttons: `aria-label`
- Touch targets: minimum 44×44px (`min-h-11 min-w-11`)
- Respect `prefers-reduced-motion` — handled globally in `global.css`
