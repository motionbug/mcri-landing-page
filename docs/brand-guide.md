# MCRI Brand Guide
**MATTER Career Readiness Institute — Visual & Voice Identity**
Version 1.0 | March 2026

---

## 1. Brand Foundation

### Who We Are
The MATTER Career Readiness Institute (MCRI) is a post-secondary institution in Victoria Falls, Zimbabwe. We transform motivated young Zimbabweans into credentialed technology professionals through a rigorous, human-centered curriculum — and connect them directly to full-time remote employment with global partners.

### What the Brand Must Communicate
- **Legitimacy** — Real credentials, real employers, real outcomes. The Apple community and corporate partners need to trust this immediately.
- **Warmth** — This is a program about people, not a SaaS product. Students and families should feel welcomed and seen.
- **Ambition** — Victoria Falls to full-time remote work at Jamf. The scale of what's happening here is extraordinary.
- **Groundedness** — Solar-powered buildings, local construction, community roots. The brand should feel earned, not polished for its own sake.

---

## 2. Color Palette

The palette is derived from three anchors: the MCRI logo (deep navy/teal), the Jamf CEI brand (vibrant orange-red and charcoal), and the landscape of Zimbabwe (warm ochre earth, green canopy, golden light). The result is a palette that reads as professional and technology-forward while carrying warmth and humanity.

### Primary Colors

| Name | Hex | Usage |
|---|---|---|
| **MCRI Navy** | `#0F2B4C` | Primary backgrounds, nav bar, footer, headings |
| **CEI Orange** | `#E8531A` | Primary CTAs, accent on stats, highlights, links on dark backgrounds |
| **MCRI Teal** | `#1A7A6E` | Section dividers, secondary CTAs, badge/certification elements |

### Secondary Colors

| Name | Hex | Usage |
|---|---|---|
| **Victoria Ochre** | `#C8833A` | Warm accent, pull quotes, decorative dividers, stat callouts |
| **Canopy Green** | `#2D6A4F` | Supporting accent, success states, "employed" stat cards |
| **Warm White** | `#FAF8F5` | Page backgrounds (light mode), card backgrounds |

### Neutral Colors

| Name | Hex | Usage |
|---|---|---|
| **Charcoal** | `#1C1C1E` | Body text on light backgrounds |
| **Slate** | `#4A5568` | Secondary text, captions, metadata |
| **Mist** | `#E8E6E1` | Borders, dividers, subtle backgrounds |
| **Pure White** | `#FFFFFF` | Text on dark backgrounds, card text on colored surfaces |

### Contrast & Accessibility Notes
- `CEI Orange (#E8531A)` on `MCRI Navy (#0F2B4C)` passes WCAG AA at normal and large text.
- `Pure White (#FFFFFF)` on `MCRI Navy` passes WCAG AAA.
- `Charcoal (#1C1C1E)` on `Warm White (#FAF8F5)` passes WCAG AAA.
- Never use `Victoria Ochre` as text on `Warm White` — contrast ratio is insufficient for body text.

### CSS Custom Properties (Design Tokens)
```css
:root {
  --color-primary:        #0F2B4C;
  --color-cta:            #E8531A;
  --color-teal:           #1A7A6E;
  --color-ochre:          #C8833A;
  --color-green:          #2D6A4F;
  --color-bg:             #FAF8F5;
  --color-text:           #1C1C1E;
  --color-text-secondary: #4A5568;
  --color-border:         #E8E6E1;
  --color-white:          #FFFFFF;
}
```

---

## 3. Typography

### Font Pairing

**Heading Font: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)**
**Body Font: [Inter](https://fonts.google.com/specimen/Inter)**

### Rationale
Plus Jakarta Sans is geometric with humanist details — it reads as modern and professional without being cold. It carries weight well at large display sizes (hero headlines, stat numbers) and holds up at smaller sizes (card headings). Crucially, it signals "technology company" to the Apple/Jamf audience without the sterility of pure geometric typefaces like Neue Haas or Aktiv Grotesk.

Inter is the workhorse of modern web typography for good reason. It was designed specifically for screen legibility, has excellent language coverage, and pairs naturally with Jakarta Sans without competing. It communicates neutrality and readability — qualities you need when explaining curriculum tracks or program logistics to parents and employers alike.

Both are available on Google Fonts and free for all uses.

### Type Scale

```css
/* Heading - Plus Jakarta Sans */
--font-display: 'Plus Jakarta Sans', sans-serif;
--font-body:    'Inter', sans-serif;

/* Scale */
--text-xs:   0.75rem;   /* 12px — captions, labels */
--text-sm:   0.875rem;  /* 14px — metadata, nav items */
--text-base: 1rem;      /* 16px — body text */
--text-lg:   1.125rem;  /* 18px — lead paragraphs */
--text-xl:   1.25rem;   /* 20px — card headings */
--text-2xl:  1.5rem;    /* 24px — section subheadings */
--text-3xl:  1.875rem;  /* 30px — section headings */
--text-4xl:  2.25rem;   /* 36px — page headings */
--text-5xl:  3rem;      /* 48px — hero headline */
--text-6xl:  3.75rem;   /* 60px — stat numbers */
```

### Type Hierarchy in Practice

- **Hero headline**: Plus Jakarta Sans, 700 weight, `--text-5xl` desktop / `--text-4xl` mobile, color `--color-white` on dark hero background
- **Section headings (H2)**: Plus Jakarta Sans, 700, `--text-3xl`, color `--color-primary`
- **Card headings (H3)**: Plus Jakarta Sans, 600, `--text-xl`, color `--color-primary`
- **Body text**: Inter, 400, `--text-base`, color `--color-text`, line-height 1.7
- **Lead paragraph**: Inter, 400, `--text-lg`, color `--color-text-secondary`
- **Stat numbers**: Plus Jakarta Sans, 800, `--text-6xl`, color `--color-cta`
- **Navigation**: Inter, 500, `--text-sm`, uppercase, letter-spacing 0.05em
- **CTA buttons**: Plus Jakarta Sans, 600, `--text-base`

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
```

---

## 4. Voice & Tone

### The Voice
Direct. Warm. Evidence-based. The MCRI voice speaks like a trusted mentor who has done the work and has the receipts to prove it. It doesn't need to sell — it informs. The results do the selling.

### Four Voice Attributes

**1. Human First**
Every sentence puts people before programs. We talk about students, not "learners." We say "young women" not "female participants." We name the schools students come from. We show the actual employer logos.

**2. Earned Confidence**
We state outcomes plainly. We don't hedge with "we hope to" or "we strive to." If 13 graduates are employed at Jamf full-time, we say that. The confidence comes from documented outcomes, not marketing language.

**3. Purposefully Simple**
No jargon unless it's a term the audience already uses (Apple, Jamf, Swift, Credly). Avoid acronyms without explanation on first use — even TEAL+ gets defined. Write at an 8th-grade reading level for accessibility to non-native English speakers.

**4. Grounded in Place**
Victoria Falls isn't backdrop — it's context. References to solar power, local construction, feeder schools by name, and the physical walking distance from student housing to classrooms all reinforce that this is a real, specific, operating institution — not a hypothetical program.

### Do / Don't Examples

| ✅ Do | ❌ Don't |
|---|---|
| "24 Zimbabweans are employed full-time, working remotely." | "We've helped countless students achieve their dreams." |
| "Becoming an employer partner means coming to Zimbabwe." | "We offer exciting partnership opportunities." |
| "Students earn the Jamf Certified Associate — Jamf Pro credential." | "Learners acquire industry-recognized certifications." |
| "We make sure at least half our students are girls and young women." | "We are committed to gender equity and inclusion." |
| "It's not the technology. It's building up amazing people." | "Our holistic, student-centered approach prioritizes competency development." |
| "A $600–$1,000 donation covers one girl's school fees for a year." | "Financial contributions support our scholarship initiatives." |
| "Students walk from their housing across the street to class." | "We provide on-site residential accommodations." |

### Tone Variations by Section

| Page/Section | Tone Shift |
|---|---|
| **Hero / Home** | Proud, declarative, inviting — "Here's what's real." |
| **Curriculum** | Precise, professional — employer-facing, certifications-first |
| **About** | Warm, narrative — story of place, people, and purpose |
| **Support** | Personal, direct ask — no guilt, no pressure, clear paths |
| **Team Bios** | Collegial, first-person energy — these are real people |

---

## 5. Imagery Guidelines

### Photography Principles
All photography should be **real images from the MCRI and MATTER Innovation Hubs in Zimbabwe.** No stock photography. Ever. The realness is a competitive advantage.

**Qualities to prioritize:**
- Students working: on MacBooks, in workshops, presenting to each other
- Faces visible and expressive — joy, concentration, pride, collaboration
- Natural light or warm artificial light — avoid harsh fluorescent
- The Victoria Falls campus itself: classrooms, student housing, the environment
- Team members from the Jamf CEI in context, not headshot-studio poses

**Color treatment:**
- Keep color grading warm — slight golden-hour warmth if adjusting
- Avoid heavy desaturation or cool filters that drain the warmth from the images
- Consistent brightness and contrast across all photography on the same page

**Composition guidance:**
- Hero images: people occupy 40–60% of frame, allow visual space for text overlay
- Card images: 3:2 aspect ratio, cropped to show faces or activity, not feet or architecture
- Team bios: square crop (1:1), consistent framing shoulder-up, neutral or out-of-focus background

### Icon Style
Use a **line icon set with rounded corners** — recommend [Lucide](https://lucide.dev/) (already a common Astro/React dependency) or [Heroicons](https://heroicons.com/). Icons should be used sparingly: for navigation items, curriculum track headers, and support option cards only. No decorative icons without semantic purpose.

- Stroke weight: 1.5–2px
- Size: 20–24px inline, 32–40px as card icons
- Color: `--color-primary` on light backgrounds, `--color-white` on dark backgrounds

### Spacing Philosophy
Use an **8px base grid**. All spacing values (padding, margin, gap) should be multiples of 8. This creates visual consistency across sections with very different content densities.

```
4px  — tight inline spacing (icon + label)
8px  — within-component spacing
16px — between related elements
24px — between loosely related elements
32px — section sub-spacing
48px — section padding (mobile)
64px — section padding (desktop)
96px — major section breaks
```

---

## 6. Logo Usage

### MCRI Logo
- **Primary placement**: Top-left of navigation bar, white version on dark backgrounds, full-color on light backgrounds
- **Minimum size**: 120px wide (digital); never scale below legibility
- **Clear space**: Maintain clear space equal to the height of the "M" in MCRI on all sides
- **On photography**: Use white or reversed version only, placed on sufficiently dark areas of the image
- **Never**: Stretch, rotate, recolor, add drop shadows, place on low-contrast backgrounds, or crowd with other logos at equal visual weight

### Co-branding with Jamf CEI
The Jamf CEI logo appears as "Powered by" beneath or adjacent to the MCRI logo on the homepage hero. Rules:
- MCRI logo is primary (larger, positioned first)
- Jamf CEI logo is secondary ("Powered by" label precedes it, smaller size)
- Maintain visual separation — do not merge or overlap the two marks
- Use the "Jamf CEI Original Colors" version on white/light backgrounds

### Partner Logos (Employer Trust Bar)
Jamf, Mains'l, Tradition Bank, MATTER NGO — display in a horizontal row on the homepage. Rules:
- All logos displayed at the same optical height (not the same pixel height)
- Use full-color versions when on `Warm White (#FAF8F5)` background
- Use white/reversed versions when on `MCRI Navy (#0F2B4C)` background
- Adequate padding between logos — never touching
- No logo should visually compete with the MCRI or CEI marks

---

## 7. Component & UI Patterns

### CTA Buttons
```
Primary CTA:   background --color-cta, text --color-white, border-radius 6px, padding 12px 24px
Secondary CTA: background transparent, text --color-primary, border 2px solid --color-primary, same radius/padding
Ghost (dark):  background transparent, text --color-white, border 2px solid --color-white
```

### Section Layout Patterns (from AgenceX inspiration)
| Pattern | Used For |
|---|---|
| **Full-width hero** with overlay text | Home hero, page headers |
| **Stat counter bar** | Impact numbers on Home |
| **Logo carousel/grid** | Employer trust bar |
| **3-column card grid** | Curriculum tracks, Support options |
| **Split layout (50/50)** | "What makes us special," Mission/Vision |
| **Timeline/accordion** | Curriculum detail, TEAL+ model |
| **Team bio cards** | About page, team section |
| **Full-width CTA band** | End-of-page conversion sections |

### Dark/Light Mode
The site should support both, defaulting to **light mode**. The MCRI Navy palette works naturally as a dark mode base. Use CSS custom properties for all color values — makes theming trivial.

---

## 8. Content Gaps to Flag

The following items are referenced in the canvas as placeholders. Content must be sourced or created before launch:

1. **Student Work page** — "Include link to published student work?" — No concrete links provided. Recommend a curated gallery of 4–8 student app projects with title, description, and screenshot. *Flag to Rob/Dave for content.*
2. **TEAL+ Model sub-page** — Referenced but no body copy provided in canvas. *Flag to Valeria/Kelly for content.*
3. **Kinder-to-Career sub-page** — Referenced but no body copy provided in canvas. *Flag to Dave for content.*
4. **Employment Partner Brief PDF** — Linked in canvas (F0AP7L711J8). This PDF should be hosted in the repo under `public/docs/` and linked from the Support page. *Needs to be extracted from Slack and committed to the repo.*
5. **Credly badge widget code** — The MCRI Professional badge, Jamf Certified Associate, Apple Teacher, and App Development with Swift badges all need their Credly embed codes collected. *Flag to Kelly.*
6. **Student photos/photography library** — Images in the canvas are Slack-hosted. They need to be downloaded, renamed descriptively (`students-working-classroom-2024.jpg`), and committed to `public/images/`. *Flag to Rob.*
