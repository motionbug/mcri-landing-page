# Logo & UX Refinements — Design Spec

**Branch:** `feature/logo-and-ux-refinements`
**Date:** 2026-04-03
**Scope:** Must + Should fixes from UX audit

---

## Context

The site's logo rendering has several broken states: invisible logos on wrong-colored backgrounds, inconsistent sizing, and missing color variants. A full UX audit also surfaced card alignment issues, undersized badges, and excessive whitespace in a few areas.

## Decisions Made (via visual brainstorming)

- **StatsBar + LogoBar background:** Change from `bg-mcri-navy` / `bg-warm-white` to a new token `light-navy` (`#D6DFE8`)
- **Logo strategy:** Use native color logos everywhere — no CSS filters, no white logo variants needed for these sections
- **Tradition Bank logo:** Enlarge relative to other logos
- **New asset:** `jamf.png` (color, transparent bg) — converted from official EPS via Ghostscript. Replaces the invisible `jamf-white.png` usage on light backgrounds.

---

## 1. StatsBar Component (`StatsBar.astro`)

### Background & text color
- Change `bg-mcri-navy` → `bg-light-navy` (new theme token `#D6DFE8`)
- Section label: `text-white/60` → `text-slate`
- Counter numbers: `text-cei-orange` stays (good contrast on light bg)
- Stat labels: `text-white/70` → `text-mcri-navy`
- Dividers: `border-mcri-teal/40` → `border-slate/30`

### Logo source
- Stop using `logoWhite` field — use `logo` (color) for StatsBar too
- This means `index.astro` maps `p.data.logo` instead of `p.data.logoWhite` for the stats array

### Logo sizing
- Default: keep `h-8`
- Tradition Bank: increase to `h-10` (needs per-logo size override or a CSS class on the Tradition entry)

**Approach for per-logo sizing:** Add optional `logoHeightSm` and `logoHeightLg` fields to the partner schema. `logoHeightSm` is used by StatsBar (default `h-8`), `logoHeightLg` is used by LogoBar (default `h-10`). Only Tradition Bank sets them (`h-10` / `h-12`). Components read `stat.logoHeightSm ?? 'h-8'` etc.

---

## 2. LogoBar Component (`LogoBar.astro`)

### Background
- Change `bg-warm-white` → `bg-light-navy` to match StatsBar (unified employer block)

### Text color
- Heading: `text-mcri-navy` stays (already dark — fine on light navy)

### Logo sizing
- Default: keep `h-10`
- Tradition Bank: increase to `h-12`
- Same override mechanism as StatsBar, using `logoHeightLg` field

### Opacity
- Change default from `opacity-70` to `opacity-80`

---

## 3. Partner Content Data (`src/content/partners/*.md`)

### jamf.md
```yaml
logo: /images/logos/jamf.png        # was jamf-white.png
logoWhite: /images/logos/jamf-white.png  # keep for potential future dark-bg use
```

### tradition-bank.md
```yaml
logoHeightSm: "h-10"   # StatsBar — larger than default h-8
logoHeightLg: "h-12"   # LogoBar — larger than default h-10
```

### Schema update (`src/content.config.ts`)
- Add optional `logoHeightSm: z.string().optional()` and `logoHeightLg: z.string().optional()` to the partners schema

---

## 4. Theme Token (`src/styles/global.css`)

Add to `@theme {}`:
```css
--color-light-navy: #D6DFE8;
```

This enables `bg-light-navy`, `text-light-navy`, `border-light-navy` classes.

---

## 5. Support Page Card Alignment (`src/pages/support.astro`)

### Card heights
- Wrap cards in a grid/flex container with `items-stretch`
- Each card gets `h-full` so heights equalize across the row

### Image normalization
- Add `aspect-[16/10] object-cover` to the three card images so they crop to a consistent height regardless of source image dimensions

---

## 6. Curriculum Card Heights (`CurriculumCard.astro` / `CurriculumGrid.astro`)

- Add `h-full` to `CurriculumCard.astro` root element
- Use `flex flex-col` so the card body grows and checklist items don't affect card height consistency
- The grid container should use `items-stretch` (likely already does via grid, just needs card cooperation)

---

## 7. "Powered by" Badge Sizing

### Hero (`Hero.astro`)
- Increase Jamf CEI logo height — find current size and bump to `h-7` or `h-8`

### Footer (`Footer.astro`)
- Increase "Powered by" Jamf CEI logo from `h-5` → `h-6`

---

## 8. Curriculum "Our Approach" Whitespace (`src/pages/curriculum/index.astro`)

- Reduce vertical spacing between the teal `<hr>` divider and the "Our Approach" heading
- Likely an excessive `py` or `mt` value — tighten to standard section spacing

---

## Files Touched

| File | Change |
|---|---|
| `src/styles/global.css` | Add `--color-light-navy` token |
| `src/content.config.ts` | Add optional `logoHeight` to partners schema |
| `src/content/partners/jamf.md` | Update `logo` to color version |
| `src/content/partners/tradition-bank.md` | Add `logoHeight: "h-10"` |
| `src/components/StatsBar.astro` | Light navy bg, dark text, use `logo` instead of `logoWhite`, per-logo height |
| `src/components/LogoBar.astro` | Light navy bg, opacity bump, per-logo height |
| `src/pages/index.astro` | Map `logo` instead of `logoWhite` for stats |
| `src/pages/support.astro` | Card height alignment, image aspect ratios |
| `src/components/CurriculumCard.astro` | Add `h-full`, flex-col layout |
| `src/components/Hero.astro` | Bump "Powered by" logo size |
| `src/components/Footer.astro` | Bump "Powered by" logo size |
| `src/pages/curriculum/index.astro` | Tighten "Our Approach" whitespace |
| `public/images/logos/jamf.png` | New file (already converted) |
| `public/images/logos/jamf-white.png` | Updated file (already converted) |

---

## Out of Scope

- Home page content density (needs copy from stakeholders)
- Nav/footer MCRI logo white variant (asset doesn't exist)
- BenefitsAndEquity vertical alignment (deprioritized)
- Additional Technical Pathways visual weight (deprioritized)
- Student Work page empty state (awaiting Phase 4 content)
