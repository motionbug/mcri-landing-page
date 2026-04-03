# Logo & UX Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix broken logo rendering, align card heights, and polish badge sizing and whitespace across the MCRI site.

**Architecture:** Static Astro 6 site with Tailwind CSS 4 (CSS-first config). All changes are component/style edits — no new pages, no JS logic changes. Partner data drives logos via content collections.

**Tech Stack:** Astro 6, Tailwind CSS 4 (CSS-first `@theme`), Markdown content collections

---

## File Map

| File | Responsibility | Action |
|---|---|---|
| `src/styles/global.css` | Tailwind theme tokens | Add `--color-light-navy` |
| `src/content.config.ts` | Content collection schemas | Add `logoHeightSm`, `logoHeightLg` to partners |
| `src/content/partners/jamf.md` | Jamf partner data | Update `logo` to color version |
| `src/content/partners/tradition-bank.md` | Tradition partner data | Add height overrides |
| `src/pages/index.astro` | Home page | Change stats mapping from `logoWhite` to `logo`, pass height fields |
| `src/components/StatsBar.astro` | Employment stats with logos | Light navy bg, dark text, per-logo height |
| `src/components/LogoBar.astro` | Employer partner logo row | Light navy bg, opacity bump, per-logo height |
| `src/components/CurriculumCard.astro` | Individual curriculum card | Add `h-full`, flex-col for height alignment |
| `src/pages/support.astro` | Support page | Card height alignment, image aspect ratios |
| `src/components/Hero.astro` | Home hero | Bump "Powered by" logo size |
| `src/components/Footer.astro` | Site footer | Bump "Powered by" logo size |
| `src/pages/curriculum/index.astro` | Curriculum page | Tighten "Our Approach" whitespace |

---

### Task 1: Add light-navy theme token

**Files:**
- Modify: `src/styles/global.css:5-32`

- [ ] **Step 1: Add the token to `@theme`**

In `src/styles/global.css`, add the new color token after `--color-mist`:

```css
  --color-mist:        #E8E6E1;
  --color-light-navy:  #D6DFE8;
```

- [ ] **Step 2: Verify dev server picks it up**

Run: `curl -s http://localhost:4322/mcri-landing-page/ | grep -c "light-navy"` or just check the dev server isn't erroring.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add light-navy theme token (#D6DFE8)"
```

---

### Task 2: Update partner schema and content data

**Files:**
- Modify: `src/content.config.ts:30-39`
- Modify: `src/content/partners/jamf.md`
- Modify: `src/content/partners/tradition-bank.md`

- [ ] **Step 1: Add optional height fields to partners schema**

In `src/content.config.ts`, update the partners schema (lines 32-39):

```typescript
const partnersCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/partners' }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    logoWhite: z.string(),
    href: z.string().url().optional(),
    employedCount: z.number(),
    order: z.number(),
    logoHeightSm: z.string().optional(),
    logoHeightLg: z.string().optional(),
  }),
});
```

- [ ] **Step 2: Update jamf.md — point logo to color version**

Replace the entire frontmatter of `src/content/partners/jamf.md`:

```yaml
---
name: Jamf
logo: /images/logos/jamf.png
logoWhite: /images/logos/jamf-white.png
href: https://www.jamf.com
employedCount: 13
order: 1
---
```

- [ ] **Step 3: Update tradition-bank.md — add height overrides**

Replace the entire frontmatter of `src/content/partners/tradition-bank.md`:

```yaml
---
name: Tradition Bank
logo: /images/logos/tradition.png
logoWhite: /images/logos/tradition.png
employedCount: 1
order: 3
logoHeightSm: "h-10"
logoHeightLg: "h-12"
---
```

- [ ] **Step 4: Verify content syncs without errors**

Check the dev server terminal for content sync errors. Run:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:4322/mcri-landing-page/
```
Expected: `200`

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/content/partners/jamf.md src/content/partners/tradition-bank.md
git commit -m "feat: update partner schema with logo height overrides and color Jamf logo"
```

---

### Task 3: Update StatsBar component

**Files:**
- Modify: `src/components/StatsBar.astro`
- Modify: `src/pages/index.astro:14-19`

- [ ] **Step 1: Update the Stat interface to include logoHeight**

In `src/components/StatsBar.astro`, replace the interface and props (lines 1-17):

```astro
---
interface Stat {
  logo: string;
  logoAlt: string;
  count: number;
  label: string;
  logoHeight?: string;
}

interface Props {
  stats: Stat[];
  sectionLabel?: string;
}

const {
  stats,
  sectionLabel = 'Zimbabweans employed full-time, working remotely',
} = Astro.props;

const base = import.meta.env.BASE_URL;
---
```

- [ ] **Step 2: Update the template — bg, text colors, dividers, per-logo height**

Replace the `<section>` and its contents (lines 22-58) with:

```astro
<section
  class="bg-light-navy py-12"
  aria-labelledby="stats-label"
>
  <div class="max-w-screen-xl mx-auto px-6">
    <p
      id="stats-label"
      class="text-center text-slate text-xs font-body uppercase tracking-widest mb-8"
    >
      {sectionLabel}
    </p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
      {stats.map((stat, i) => (
        <div
          class={`flex flex-col items-center gap-3 ${i < stats.length - 1 ? 'md:border-r md:border-slate/30' : ''}`}
        >
          <img
            src={`${base}${stat.logo.replace(/^\//, '')}`}
            alt={stat.logoAlt}
            class={`${stat.logoHeight ?? 'h-8'} w-auto object-contain`}
            width="80"
            height="32"
          />
          <span
            class="font-display font-extrabold text-6xl text-cei-orange stat-counter"
            data-target={stat.count}
            aria-label={`${stat.count} employed`}
          >
            0
          </span>
          <span class="font-body text-sm text-mcri-navy text-center">{stat.label}</span>
        </div>
      ))}
    </div>
  </div>
</section>
```

Keep the `<script>` block (lines 60-93) exactly as-is — no changes needed.

- [ ] **Step 3: Update index.astro — map `logo` instead of `logoWhite`, pass height**

In `src/pages/index.astro`, replace lines 14-19:

```typescript
const stats = sorted.map(p => ({
  logo: p.data.logo,
  logoAlt: p.data.name,
  count: p.data.employedCount,
  label: p.data.name,
  logoHeight: p.data.logoHeightSm,
}));
```

- [ ] **Step 4: Visual check**

Open `http://localhost:4322/mcri-landing-page/` in the browser. The StatsBar should now have:
- Light blue-gray background (`#D6DFE8`)
- Color logos (Jamf blue, Mains'l blue, Tradition red/gray, MATTER orange)
- Orange counter numbers
- Dark navy label text
- Tradition Bank logo visibly larger than the others

- [ ] **Step 5: Commit**

```bash
git add src/components/StatsBar.astro src/pages/index.astro
git commit -m "feat: StatsBar — light navy bg, color logos, per-logo sizing"
```

---

### Task 4: Update LogoBar component

**Files:**
- Modify: `src/components/LogoBar.astro`
- Modify: `src/pages/index.astro:21-25`

- [ ] **Step 1: Update LogoBar interface to include logoHeight**

In `src/components/LogoBar.astro`, replace the interface (lines 1-15):

```astro
---
interface Logo {
  src: string;
  alt: string;
  href?: string;
  logoHeight?: string;
}

interface Props {
  heading?: string;
  logos: Logo[];
}

const { heading, logos } = Astro.props;
const base = import.meta.env.BASE_URL;
---
```

- [ ] **Step 2: Update the template — bg, opacity, per-logo height**

Replace the `<section>` (lines 17-60) with:

```astro
<section class="bg-light-navy py-16" aria-labelledby={heading ? 'logobar-heading' : undefined}>
  <div class="max-w-screen-xl mx-auto px-6">
    {heading && (
      <h2
        id="logobar-heading"
        class="font-display font-bold text-xl text-mcri-navy text-center mb-10"
      >
        {heading}
      </h2>
    )}

    <div class="flex flex-wrap items-center justify-center gap-10 md:gap-16">
      {logos.map(logo => (
        logo.href ? (
          <a
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center opacity-80 hover:opacity-100 transition-opacity duration-200"
            aria-label={`${logo.alt} (opens in new tab)`}
          >
            <img
              src={`${base}${logo.src.replace(/^\//, '')}`}
              alt={logo.alt}
              class={`${logo.logoHeight ?? 'h-10'} w-auto object-contain`}
              width="120"
              height="40"
            />
          </a>
        ) : (
          <div class="flex items-center opacity-80">
            <img
              src={`${base}${logo.src.replace(/^\//, '')}`}
              alt={logo.alt}
              class={`${logo.logoHeight ?? 'h-10'} w-auto object-contain`}
              width="120"
              height="40"
            />
          </div>
        )
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update index.astro — pass logoHeight to logos array**

In `src/pages/index.astro`, replace lines 21-25:

```typescript
const logos = sorted.map(p => ({
  src: p.data.logo,
  alt: p.data.name,
  href: p.data.href,
  logoHeight: p.data.logoHeightLg,
}));
```

- [ ] **Step 4: Visual check**

The LogoBar should now match the StatsBar background (light navy). Tradition Bank logo should be larger. All logos should be at 80% opacity, hovering to 100%.

- [ ] **Step 5: Commit**

```bash
git add src/components/LogoBar.astro src/pages/index.astro
git commit -m "feat: LogoBar — light navy bg, opacity 80%, per-logo sizing"
```

---

### Task 5: Fix support page card heights and image aspect ratios

**Files:**
- Modify: `src/pages/support.astro:22,27,82,113`

- [ ] **Step 1: Change grid alignment from `items-start` to `items-stretch`**

In `src/pages/support.astro`, line 22, replace:

```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
```

with:

```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
```

- [ ] **Step 2: Normalize card images to consistent aspect ratio**

In `src/pages/support.astro`, replace all three occurrences of:
```html
<div class="aspect-video bg-mist overflow-hidden">
```
with:
```html
<div class="aspect-[16/10] bg-mist overflow-hidden">
```

There are three instances — lines 27, 82, and 113.

- [ ] **Step 3: Visual check**

Open `http://localhost:4322/mcri-landing-page/support/`. All three cards should be the same height, and the images should all crop to the same consistent height.

- [ ] **Step 4: Commit**

```bash
git add src/pages/support.astro
git commit -m "fix: support page card height alignment and image aspect ratios"
```

---

### Task 6: Fix curriculum card height alignment

**Files:**
- Modify: `src/components/CurriculumCard.astro:33,43`

- [ ] **Step 1: Add `h-full` to root article**

In `src/components/CurriculumCard.astro`, line 33, replace:

```html
<article class="bg-white border border-mist rounded-xl p-8 flex flex-col gap-5 hover:shadow-md transition-shadow duration-200">
```

with:

```html
<article class="bg-white border border-mist rounded-xl p-8 flex flex-col gap-5 hover:shadow-md transition-shadow duration-200 h-full">
```

- [ ] **Step 2: Add `flex-1` to body paragraph so content pushes credentials down**

In `src/components/CurriculumCard.astro`, line 43, replace:

```html
<p class="font-body text-sm text-slate leading-relaxed">{body}</p>
```

with:

```html
<p class="font-body text-sm text-slate leading-relaxed flex-1">{body}</p>
```

- [ ] **Step 3: Visual check**

Open `http://localhost:4322/mcri-landing-page/curriculum/`. The 3x2 grid should have cards in each row at the same height. Credential checklists should align toward the bottom.

- [ ] **Step 4: Commit**

```bash
git add src/components/CurriculumCard.astro
git commit -m "fix: curriculum card height alignment with h-full and flex-1"
```

---

### Task 7: Bump "Powered by" badge sizing

**Files:**
- Modify: `src/components/Hero.astro:59`
- Modify: `src/components/Footer.astro:38`

- [ ] **Step 1: Increase Hero "Powered by" logo**

In `src/components/Hero.astro`, line 59, the logo is already `h-7`. Bump to `h-8`. Replace:

```html
class="h-7 w-auto"
```

with:

```html
class="h-8 w-auto"
```

- [ ] **Step 2: Increase Footer "Powered by" logo**

In `src/components/Footer.astro`, line 38, replace:

```html
class="h-5 w-auto"
```

with:

```html
class="h-6 w-auto"
```

- [ ] **Step 3: Visual check**

Check the hero and footer. The "Powered by Jamf CEI" logos should be noticeably more legible.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/components/Footer.astro
git commit -m "fix: increase Powered by badge sizes for legibility"
```

---

### Task 8: Tighten curriculum "Our Approach" whitespace

**Files:**
- Modify: `src/pages/curriculum/index.astro:49,52`

- [ ] **Step 1: Reduce section padding and divider spacing**

In `src/pages/curriculum/index.astro`, line 49, replace:

```html
<section class="bg-warm-white py-20" aria-labelledby="approach-heading">
```

with:

```html
<section class="bg-warm-white py-14" aria-labelledby="approach-heading">
```

And line 52, replace:

```html
<div class="border-t-2 border-mcri-teal pt-8 mb-8"></div>
```

with:

```html
<div class="border-t-2 border-mcri-teal pt-6 mb-6"></div>
```

- [ ] **Step 2: Visual check**

Open `http://localhost:4322/mcri-landing-page/curriculum/`. The gap between the TEAL+ section and "Our Approach" should feel tighter and more intentional.

- [ ] **Step 3: Commit**

```bash
git add src/pages/curriculum/index.astro
git commit -m "fix: tighten curriculum Our Approach section whitespace"
```

---

### Task 9: Final visual verification and build

- [ ] **Step 1: Visual verification of all affected pages**

Open each page and verify:

- **Home** (`/mcri-landing-page/`): StatsBar + LogoBar both light navy, color logos, Tradition larger, counter numbers orange, "Powered by" badge legible in hero
- **Curriculum** (`/mcri-landing-page/curriculum/`): Card heights aligned in 3x2 grid, "Our Approach" whitespace tighter
- **Support** (`/mcri-landing-page/support/`): Three cards equal height, images same aspect ratio
- **Footer** (any page): "Powered by" logo slightly larger

- [ ] **Step 2: Run the build to verify no errors**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Verify clean git status**

```bash
git status
```

Expected: `nothing to commit, working tree clean`
