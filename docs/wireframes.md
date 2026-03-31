# MCRI Wireframe Descriptions
**MATTER Career Readiness Institute — Page-by-Page Build Specs**
Version 1.0 | March 2026

---

## Reading This Document

Each section below describes a single page section as a wireframe specification. Format per entry:
- **Layout**: visual structure and spatial arrangement
- **Content**: exact or near-exact copy from the canvas, or placeholder labels
- **Components**: Astro component(s) to build or reuse
- **Mobile**: how the section stacks/adapts on small screens
- **Astro notes**: implementation guidance

---

# Page 1: Home (`/`)

---

## Section 1.1 — Navigation Bar

**Layout:**
Fixed/sticky horizontal bar, full viewport width, height 64px. Background: `--color-primary` (navy). Two zones: left zone (logo), right zone (nav links + CTA button). Uses flexbox: `justify-between`, `align-center`.

**Content:**
- Left: MCRI logo (white version), links to `/`
- Center/Right: `Home | Curriculum | Student Work | About | Support`
- Far right: Button — "Become a Partner" (CTA style: orange background, white text)

**Components:**
```
<Nav client:load />
```
Props: `links=[...]`, `ctaLabel="Become a Partner"`, `ctaHref="/support"`.
Active link state: white underline rule 2px below text.
On scroll past 80px: add `backdrop-blur` and slight transparency.

**Mobile (< 768px):**
Logo left, hamburger icon right. Tap hamburger → full-screen overlay slides in from right with nav links stacked vertically, CTA button at bottom. Close X in top-right of overlay.

**Astro notes:**
- Use `client:load` for scroll-aware behavior and mobile menu toggle
- Nav links come from a static array in `src/data/nav.ts`, not hardcoded in component
- Active state determined via `Astro.url.pathname`

---

## Section 1.2 — Hero

**Layout:**
Full-viewport-height section (min-height: 100vh). Background: full-bleed photograph of MCRI students working at laptops, with a dark overlay (`rgba(15, 43, 76, 0.72)` — the navy at 72% opacity). Text is left-aligned within a max-width container (1280px), vertically centered. Right 40% of the layout (on desktop) is visually dominated by the unobstructed photograph showing through.

```
[NAV BAR]
[===========================================]
[  MATTER Career Readiness Institute        |     ]
[  Powered by Jamf CEI [logo]               | IMG |
[                                           |     ]
[  Post-secondary tech education in         |     ]
[  Victoria Falls, Zimbabwe — with a        |     ]
[  direct pathway to employment.            |     ]
[                                           |     ]
[  [See Our Curriculum]  [Support Us]       |     ]
[===========================================]
```

**Content:**
- Eyebrow (small caps, `--color-ochre`): `VICTORIA FALLS, ZIMBABWE`
- H1: `MATTER Career Readiness Institute`
- Subheading row: `Powered by` + Jamf CEI logo (white version, inline, height 28px)
- Body (max-width 560px): `Post-secondary technology education built on empathy, collaboration, and problem solving — with a direct pathway to full-time employment.`
- CTA row: Primary button `See Our Curriculum` → `/curriculum/` | Ghost button `Support the Program` → `/support/`

**Components:**
```
<Hero
  eyebrow="Victoria Falls, Zimbabwe"
  headline="MATTER Career Readiness Institute"
  body="Post-secondary technology education built on empathy, collaboration, and problem solving — with a direct pathway to full-time employment."
  imageSrc="/images/hero-students-working.jpg"
  primaryCta={{ label: "See Our Curriculum", href: "/curriculum/" }}
  secondaryCta={{ label: "Support the Program", href: "/support/" }}
/>
```

**Mobile (< 768px):**
Text takes full width. Image is used as background only (no split). Reduce H1 to `--text-4xl`. Buttons stack vertically (full width). Min-height: 85vh.

**Astro notes:**
- Use `<Image />` from `astro:assets` for the hero background. Set `loading="eager"` and `fetchpriority="high"`.
- Hero is a static server-rendered section — no `client:` directive needed.

---

## Section 1.3 — Impact Stats Bar

**Layout:**
Full-width horizontal band, background `--color-primary` (navy), height ~140px desktop. Four stat units displayed in a 4-column flex row, centered. Each unit is center-aligned vertically with: [Company Logo] → [Number] → [Company Name]. A thin `--color-teal` divider separates each unit.

```
[========================================================================================]
[  [Jamf logo]    [Mainsl logo]    [Tradition logo]    [MATTER NGO logo]                ]
[     13              9                  1                    1                          ]
[    Jamf          Mains'l          Tradition Bank        MATTER NGO                    ]
[========================================================================================]
     ↑ "Zimbabweans employed full-time, working remotely" — centered label above numbers
```

**Content:**
- Section label (small, centered, above the 4 columns, `--color-white` at 70% opacity): `ZIMBABWEANS EMPLOYED FULL-TIME, WORKING REMOTELY`
- Stats:
  - Jamf: **13**
  - Mains'l: **9**
  - Tradition Bank: **1**
  - MATTER NGO: **1**

**Components:**
```
<StatsBar stats={[
  { logo: "/images/logos/jamf-white.png", count: 13, label: "Jamf" },
  { logo: "/images/logos/mainsl-white.png", count: 9, label: "Mains'l" },
  { logo: "/images/logos/tradition-white.png", count: 1, label: "Tradition Bank" },
  { logo: "/images/logos/matter-ngo-white.png", count: 1, label: "MATTER NGO" }
]} />
```

Numbers animate up from 0 when section enters viewport (Intersection Observer). Duration: 1.2s ease-out.

**Mobile (< 768px):**
2×2 grid. Same visual treatment. Section label wraps to 2 lines if needed.

**Astro notes:**
- `client:visible` for the counter animation — loads JS only when user scrolls to section
- Logos are white/reversed versions stored separately in `public/images/logos/`

---

## Section 1.4 — Employer Partner Logos

**Layout:**
Full-width section, background `--color-bg` (warm white). Centered content. Section heading centered above logo row. Logo row is flex, centered, with `gap: 48px`. All logos optically equal height (~48px). No carousel needed — 4 logos fit cleanly in a row.

```
[                                                  ]
[         Our Employer Partners                    ]
[  [Jamf]   [Mains'l]   [Tradition]   [MATTER]   ]
[                                                  ]
```

**Content:**
- Section heading: `Our Employer Partners`
- 4 logos: Jamf (color), Mains'l, Tradition Bank, MATTER NGO

**Components:**
```
<LogoBar
  heading="Our Employer Partners"
  logos={[
    { src: "/images/logos/jamf.png", alt: "Jamf", href: "https://jamf.com" },
    { src: "/images/logos/mainsl.png", alt: "Mains'l" },
    { src: "/images/logos/tradition.png", alt: "Tradition Bank" },
    { src: "/images/logos/matter-ngo.png", alt: "MATTER NGO", href: "https://matter.ngo" }
  ]}
/>
```

**Mobile (< 768px):**
2×2 grid, logos slightly smaller. Adequate white space between rows.

**Astro notes:**
- No JS needed. Pure static HTML/CSS.
- Use `<Image />` for logos with explicit `width` and `height` to avoid layout shift.

---

## Section 1.5 — What Makes Us Special (Split)

**Layout:**
50/50 split layout. Max-width 1280px, centered. Left side: text block. Right side: photograph. On desktop, text is left-padded 64px. Image fills right column fully (aspect ratio ~4:3, `object-fit: cover`). Slight diagonal clip or layered shadow on image edge for visual interest.

```
[===========================|===========================]
[  What makes our          |                           ]
[  program special?        |     [PHOTO: students      ]
[                          |      in classroom]        ]
[  It's not the technology.|                           ]
[  It's building up amazing|                           ]
[  people...               |                           ]
[                          |                           ]
[  [Learn about our        |                           ]
[   curriculum →]          |                           ]
[===========================|===========================]
```

**Content:**
- Section label (eyebrow, teal): `OUR APPROACH`
- H2: `What makes our program special?`
- Body: *"It's not the technology, it's building up amazing people by being focused on the essential skills of empathy, creativity, collaboration, and problem solving. Once a solid foundation has been laid, we layer technical training on top. The MCRI is the final stop in our Kinder-to-Career journey."*
- Link: `Learn more about our curriculum →` → `/curriculum/`
- Image: `img-F0ANN9VKP9D.jpeg` — students collaborating

**Components:**
```
<SplitSection
  eyebrow="Our Approach"
  heading="What makes our program special?"
  body="..."
  link={{ label: "Learn more about our curriculum", href: "/curriculum/" }}
  imageSrc="/images/students-collaborating.jpg"
  imageAlt="MCRI students collaborating in class"
  imagePosition="right"
/>
```

**Mobile (< 768px):**
Stack vertically: image first (full width, aspect-ratio 16:9), then text below.

---

## Section 1.6 — Jamf CEI Callout

**Layout:**
Full-width teal band (`--color-teal`), white text. Center-aligned. Jamf CEI logo (white version) + short paragraph + link to About page. Padding 64px vertical.

**Content:**
- Logo: Jamf CEI white version
- Heading: `Designed and supported by Jamf Community Education Initiatives`
- Body: `The CEI team aligns our curriculum with real workforce needs and the skills required by our employer partners.`
- Link (ghost button, white border): `Meet the Team →` → `/about/`

**Components:**
```
<CalloutBand
  logo="/images/logos/jamf-cei-white.png"
  heading="Designed and supported by Jamf Community Education Initiatives"
  body="..."
  cta={{ label: "Meet the Team", href: "/about/" }}
  background="teal"
/>
```

**Mobile:** Same, text wraps naturally. Logo scales down.

---

## Section 1.7 — End CTA Band

**Layout:**
Full-width, `--color-primary` (navy) background. Two large CTA buttons side by side, centered, on a single line on desktop. Heading above buttons.

**Content:**
- Heading: `Ready to get involved?`
- Button 1 (orange): `Explore the Curriculum` → `/curriculum/`
- Button 2 (ghost white): `Ways to Support` → `/support/`

**Components:**
```
<CTABand
  heading="Ready to get involved?"
  primaryCta={{ label: "Explore the Curriculum", href: "/curriculum/" }}
  secondaryCta={{ label: "Ways to Support", href: "/support/" }}
/>
```

**Mobile:** Buttons stack vertically, full width.

---

## Section 1.8 — Footer

**Layout:**
3-column grid above a bottom rule bar. Max-width 1280px, centered. Background `--color-primary`. All text white.

```
[MCRI Logo]           [Pages]              [Contact]
[Tagline]             Home                 dave.saltmarsh@jamf.com
[Powered by CEI logo] Curriculum           [LinkedIn icon]
                      Student Work
                      About                © 2026 MATTER NGO
                      Support
                      TEAL+ Model
                      Kinder-to-Career
```

**Components:**
```
<Footer />
```
Footer content is hardcoded in the component (not from content collections — it's too static and small to justify CMS overhead).

**Mobile:** Single column stack. Logo → Links → Contact.

---

# Page 2: Curriculum (`/curriculum/`)

---

## Section 2.1 — Page Hero

**Layout:**
Full-width, min-height 40vh (shorter than home hero). Dark overlay on background image. Text left-aligned, vertically centered. Breadcrumb above headline.

**Content:**
- Breadcrumb: `Home / Curriculum`
- H1: `A Curriculum Built for Real Employment`
- Subhead: `Every track is designed around the skills our employer partners actually need.`
- Image: classroom photograph (`img-F0AP3M1AJ5Q.jpeg`)

**Components:** `<PageHero />` with `breadcrumb`, `heading`, `subhead`, `imageSrc` props.

**Mobile:** Full width, same stacking. Image as background only.

---

## Section 2.2 — TEAL+ Foundation

**Layout:**
50/50 split. Left: teal-bordered card with TEAL+ icon and summary text. Right: short body copy and link.

**Content:**
- Card label: `PREREQUISITE`
- Card heading: `The TEAL+ Foundation`
- Body: *"Before applying to the MCRI, students attend a MATTER Innovation Hub where they are immersed in the TEAL+ model — technology-enabled active learning. They arrive as confident, collaborative, and curious learners."*
- Link: `Learn more about TEAL+ →` → `/curriculum/teal-plus/`

**Components:** `<SplitSection />` with `imagePosition="left"` using a decorative/icon treatment rather than a photograph.

---

## Section 2.3 — Curriculum Approach

**Layout:**
Centered text block, max-width 760px, generous vertical padding. Thin `--color-teal` rule above heading.

**Content:**
Verbatim from canvas: *"At the MCRI, essential skills are not separate from the technical curriculum — they are the foundation upon which all technical learning is built..."* (both paragraphs)

**Components:** Inline styled prose block within `curriculum.astro` — no separate component needed.

---

## Section 2.4 — Core Curriculum Tracks

**Layout:**
Section heading centered above a 3×2 card grid (6 cards). Each card: icon (top, `--color-teal`), track name (H3), credential list, Credly badge embed (if applicable). Cards have `border: 1px solid --color-border`, `border-radius: 12px`, `padding: 32px`, hover state: subtle shadow lift.

```
[=============] [=============] [=============]
[  🍎 Apple   ] [⚡ Swift Dev ] [ 🔒 Jamf     ]
[ • Apple     ] [ • Learn to  ] [ • JCA Pro   ]
[   Teacher   ] [   Code 1-3  ] [ • JCA Prot  ]
[   cert      ] [ • App Dev   ] [ • CLI badge ]
[ [badge]     ] [   w/ Swift  ] [ [badges]    ]
[=============] [=============] [=============]
[=============] [=============] [=============]
[ 🧠 Essential] [🤖 Agentic AI] [💻 macOS     ]
[ • Leadershi ] [ • Claude    ] [ • Navigate  ]
[ • GTD       ] [   Code in   ] [   macOS     ]
[             ] [   Action    ] [             ]
[=============] [=============] [=============]
```

**Content:** One card per track from canvas. Each card gets the full credential list as bullet items.

**Components:**
```
<CurriculumGrid tracks={curriculumData} />
```
Where `curriculumData` is loaded via `getCollection('curriculum')`. Each `.md` file in `src/content/curriculum/` represents one track, with frontmatter: `title`, `icon`, `credentials[]`, `credlyBadges[]`.

**Mobile (< 768px):** Single-column stack. Cards full width.

**Astro notes:**
- Credly badge embed: use `<script>` tag for Credly's embed JS, but load it `type="module"` with `async` to avoid blocking render. Credly provides a `<div data-iframe-width="..." data-iframe-height="..." data-share-badge-id="...">` embed — wrap in a `<CurriculumBadge />` component that handles loading state.
- If Credly embed codes are not yet collected, render a placeholder badge image with `aria-label="Badge pending"`.

---

## Section 2.5 — Additional Pathways

**Layout:**
Light gray background band (`--color-bg`). Heading + 2-column tag list. Tags are pill-style elements (`border-radius: 100px`, `border: 1px solid --color-border`, `padding: 8px 16px`).

**Content:**
- Heading: `Additional Technical Pathways`
- Subhead: `Based on employer needs and team availability, students may also explore:`
- Tags: Web Services / Agile & SCRUM / Web Accessibility / SQL / UX/UI

**Components:** Inline in `curriculum.astro` — too simple for a separate component.

---

## Section 2.6 — Instructional Model (Split)

**Layout:**
50/50 split, image left. Image: `img-F0AP1H8LSBY.jpeg`. Text right with heading and 2 sentences.

**Content:**
- H2: `Delivered by industry professionals`
- Body: *"Courses are delivered in person by industry professionals and are paired with certifications to validate student learning. Throughout the program, students continuously apply both technical and essential skills in collaborative, real-world contexts."*

**Components:** `<SplitSection imagePosition="left" />`

---

## Section 2.7 — Apprenticeship Model

**Layout:**
Full-width differentiated section. Background: `--color-teal`. White text. Two-column layout: large callout text left, detail list right. Visually distinct from everything above — this signals a transition from "learning" to "working."

```
[============================================]
[ NOT AN INTERNSHIP.          • Work as team  ]
[                               member        ]
[ A six-month apprenticeship  • Apply tech +  ]
[ designed as a direct path     skills        ]
[ to employment.              • Paid by Jamf  ]
[                               CEI           ]
[ Paid for by Jamf CEI.       • Direct path   ]
[                               to FT role    ]
[============================================]
```

**Content:**
- Eyebrow: `APPRENTICESHIP MODEL`
- H2: `Not an internship. A direct path to employment.`
- Left body: *"After completing the curriculum, students transition into a six-month apprenticeship with an employer partner, paid for by Jamf Community Education Initiatives."*
- Right list: the 3 bullet points from canvas, styled as large checklist items
- Image: `img-F0AP07AAWFP.jpeg` — used as a background texture with opacity, not a content image

**Components:**
```
<ApprenticeshipFeature />
```
Standalone component — this section is unique enough in design that it warrants its own component.

**Mobile:** Stack vertically. Eyebrow → Heading → Body → Checklist. Same teal background.

---

## Section 2.8 — Graduate Outcome + Badge

**Layout:**
Centered, white background. MCRI Professional badge centered (large, ~200px). Heading above, description below. Clean and ceremonial in feel.

**Content:**
- H2: `The MCRI Professional Badge`
- Body: *"Students who successfully complete the curriculum and are offered a full-time role with an employer partner earn the MCRI Professional badge, signifying both technical readiness and strong foundational professional skills."*
- Badge: MCRI Professional badge Credly embed OR static image (`img-F0AP3KUQA3C.png`)

**Components:**
```
<BadgeShowcase
  heading="The MCRI Professional Badge"
  body="..."
  badgeId="[credly-badge-id]"  // or imageSrc fallback
/>
```

---

## Section 2.9 — End CTA Band

Same `<CTABand />` component as Home Section 1.7, but:
- Heading: `Ready to partner with us?`
- Primary CTA: `Become an Employer Partner` → `/support/`
- Secondary CTA removed (single CTA for focus)

---

# Page 3: Student Work (`/student-work/`)

---

## Section 3.1 — Page Hero

**Layout:** Minimal, text-only hero. Centered. Max-height 280px. Light background.

**Content:**
- H1: `Work Built by MCRI Students`
- Subhead: `Every project below was designed, coded, and shipped by a graduate of the MATTER Career Readiness Institute.`

---

## Section 3.2 — Portfolio Grid

**Layout:**
3-column card grid (2-column on tablet, 1-column on mobile). Each card: full-width image top (app screenshot or student photo), app name (H3), 1-sentence description, optional student name, optional link button (`View Project →`).

```
[=============] [=============] [=============]
[  [IMG]      ] [  [IMG]      ] [  [IMG]      ]
[ App Name    ] [ App Name    ] [ App Name    ]
[ Description ] [ Description ] [ Description ]
[ [View →]   ] [ [View →]   ] [ [View →]   ]
[=============] [=============] [=============]
```

**Components:**
```
<PortfolioGrid projects={await getCollection('projects')} />
```
Content collection: `src/content/projects/` — each `.md` file has frontmatter: `title`, `student` (optional), `description`, `imageSrc`, `projectUrl` (optional).

**⚠️ Content gap:** If no projects are available at launch, render a placeholder:
```
<EmptyState
  heading="Student projects coming soon."
  body="We're collecting projects from our graduates. Check back shortly."
/>
```

---

## Section 3.3 — End CTA

`<CTABand heading="Interested in hiring from our program?" primaryCta={{ label: "Become an Employer Partner", href: "/support/" }} />`

---

# Page 4: About (`/about/`)

---

## Section 4.1 — Page Hero

**Layout:** Full-width, min-height 50vh. Background image: campus or students. Dark overlay. Center-aligned text (different from home hero which is left-aligned — here center works because this is a mission page, not an action page).

**Content:**
- H1: `Building the future of Zimbabwe, one student at a time.`
- Subhead: `By 2026: 30 Zimbabweans employed. 2,000 learning.`

**Designer note:** The "By 2026..." line from the canvas is rendered as designed text in the brand system — not as an image. The source image (`img-F0ALER2K2JZ.png`) can be used as design inspiration but text should be live HTML.

---

## Section 4.2 — Mission & Location

**Layout:** 50/50 split. Text left, image right. Image: campus exterior or student housing.

**Content:**
- H2: `Victoria Falls, Zimbabwe`
- Body: *"The MCRI is a post-secondary institution located in Victoria Falls, Zimbabwe. Students across Zimbabwe who have attended one of our MATTER Innovation Hub partner schools are able to apply by recommendation from their facilitator."*
- Sub-section: `Feeder Schools` — inline list: Mosi-oa-Tonya / Jafuta Center / King George VI / Dominican Convent / Gateway Senior High School / Nechilibi High School. Displayed as pill badges (teal outline).

**Components:** `<SplitSection />` with embedded `<SchoolBadge />` list.

---

## Section 4.3 — Program Benefits + Gender Equity

**Layout:**
Two-column layout. Left column: program benefits (icon list). Right column: gender equity commitment (feature callout card with accent border).

**Left — Program Benefits:**
- Icon + label cards: Food & board / Health insurance / Monthly stipend / Housing across the street
- Heading: `We take care of our students.`
- Body: *"We created a place where we would want to send our own loved ones."*

**Right — Gender Equity:**
- H3: `At least 50% girls and young women.`
- Body: *"In order to create change, it starts early by teaching boys and young men how to respect women. By being vigilant in including women in these spaces, we break down barriers and show that women belong in all places that men do."*

**Components:** `<BenefitsAndEquity />` — unique enough to warrant its own component. Uses icon cards internally.

**Mobile:** Stack columns vertically. Benefits first, equity second.

---

## Section 4.4 — Sustainability

**Layout:**
3-column icon card row. Light gray background. Each card: centered icon (line icon), heading, 1-sentence description.

**Content:**
- Card 1 — ☀️ Solar Powered: `All our buildings run 100% on solar energy.`
- Card 2 — 🏗️ Local Construction: `All construction and outfitting is hired and sourced locally, supporting the community economy.`
- Card 3 — ♿ Universal Design: `All structures are built with universal design in mind, so every student participates like their peers.`

**Components:** `<IconCardRow cards={sustainabilityCards} />` — reusable 3-column icon card grid used elsewhere on the site.

**Mobile:** Single column stack.

---

## Section 4.5 — Hub Map

**Layout:**
Full-width section. Background `--color-primary`. Map image (`img-F0AN5TV6QRG.png`) centered at 80% max-width. Stat overlay: two large numbers above or below map. Caption below.

```
[=================================================]
[          28 Hubs    ·    8 Countries             ]
[   [MAP IMAGE — full width with hub markers]     ]
[        with Zimbabwe highlighted                 ]
[=================================================]
```

**Content:**
- Stats: `28 Hubs` / `8 Countries`
- Caption: `Our network spans the globe, with the majority of our focus in Zimbabwe.`

**Components:** `<HubMap imageSrc="..." hubCount={28} countryCount={8} />`

**Mobile:** Map image scrollable horizontally if needed, or constrained to viewport width.

---

## Section 4.6 — Team Bios

**Layout:**
3-column card grid. Each card: square photo (1:1 crop), name, title, 2–3 sentence bio, LinkedIn icon link. Card background `--color-bg`, subtle shadow, border-radius 12px, padding 24px.

```
[=============] [=============] [=============]
[ [PHOTO]     ] [ [PHOTO]     ] [ [PHOTO]     ]
[ Kelly       ] [ Valeria     ] [ Dave        ]
[ Sr. Program ] [ Sr. Prog.   ] [ Sr. Director]
[ Engineer    ] [ Manager     ] [             ]
[             ] [             ] [             ]
[ Bio text... ] [ Bio text... ] [ Bio text... ]
[             ] [             ] [             ]
[ [LinkedIn ↗]]  [ [LinkedIn ↗]]  [ [LinkedIn ↗]]
[=============] [=============] [=============]
```

**Content:** From canvas verbatim. Three team members: Kelly Watkins Conrad, Valeria Tschida, David J. Saltmarsh.

**Components:**
```
<TeamGrid members={await getCollection('team')} />
```
Content collection: `src/content/team/` — one `.md` per member with frontmatter: `name`, `title`, `photo`, `linkedin`, body: bio text.

**Mobile:** Single column stack. Photos maintain square crop.

---

## Section 4.7 — CEI Mission Statement + Sub-page Links

**Layout:**
Two parts. Top: full-width centered text block (quote-style, large body text, `--color-primary`, left border accent in `--color-teal`). Bottom: 2-column feature cards linking to TEAL+ and Kinder-to-Career sub-pages.

**Content (top):**
*"The Jamf Community Education Initiatives team lives Jamf's values of selflessness and relentless self-improvement out in the world, where we enable students to think creatively to solve problems, learn the value of being better together, and how to empathize with others..."*

**Content (cards):**
- Card 1: `The TEAL+ Model` — brief descriptor — `Learn more →` → `/curriculum/teal-plus/`
- Card 2: `Kinder-to-Career` — brief descriptor — `Learn more →` → `/curriculum/kinder-to-career/`

**Components:** Inline prose + `<SubpageLinkCards />`.

---

## Section 4.8 — End CTA Band

`<CTABand heading="Join us in building something remarkable." primaryCta={{ label: "Ways to Support the MCRI", href: "/support/" }} />`

---

# Page 5: Support (`/support/`)

---

## Section 5.1 — Page Hero

**Layout:** Centered text hero, min-height 300px, `--color-bg` background (no dark overlay — this page should feel approachable, not dramatic).

**Content:**
- H1: `There are many ways to make a difference.`
- Subhead: `Find the path that fits you.`

---

## Section 5.2 — Support Path Cards (Primary)

**Layout:**
3-column card grid. Cards are large and prominent — the most visually prominent non-hero element on this page. Each card: full-width image top (16:9), heading, 2-sentence description, CTA button. Equal visual weight across all three.

```
[=================] [=================] [=================]
[ [IMAGE]         ] [ [IMAGE]         ] [ [IMAGE]         ]
[                 ] [                 ] [                 ]
[ Become an       ] [ Donate Software ] [ Donate          ]
[ Employer Partner] [ or Hardware     ] [ Financially     ]
[                 ] [                 ] [                 ]
[ If you want to  ] [ Support our     ] [ Help ensure     ]
[ make the biggest] [ Apple-first     ] [ young women     ]
[ impact...       ] [ program...      ] [ aren't left...  ]
[                 ] [                 ] [                 ]
[ [Learn More ↓]  ] [ [Contact Dave ↓]] [ [Donate Now ↓]  ]
[=================] [=================] [=================]
```

**Content:**
Cards use headings verbatim from canvas (adapted from first-person to third-person for the card context):
- Card 1: `Become an Employer Partner` — Image: `img-F0ANXB1LTJ7.jpeg`
- Card 2: `Donate Software, Hardware, or Training` — Image: `img-F0APY1RFDPA.jpeg`
- Card 3: `Support the Program Financially` — Image: `img-F0AP7B3MR9S.jpeg`

CTA buttons scroll down to the respective expanded sections (anchor links: `#employer-partner`, `#donate-items`, `#donate-money`).

**Components:**
```
<SupportCards options={await getCollection('support')} />
```
Content collection: `src/content/support/` — one `.md` per option.

**Mobile:** Single column stack. Cards full width.

---

## Section 5.3 — Employer Partner Detail (id="employer-partner")

**Layout:**
Full-width section, subtle gray background to distinguish from the cards above. Max-width 860px, centered. Text column with PDF download link prominently placed.

**Content:**
Verbatim from canvas: *"If you're wanting to make the biggest impact on the lives of others, becoming an employer partner is the way to do it..."*

PDF link: `📄 Download the Employer Partner Brief` → `/docs/mcri-employment-partner-brief.pdf`
Styled as a large link card (icon + filename + "PDF" label), not an inline anchor.

**⚠️ Content gap:** PDF must be extracted from Slack and committed to `public/docs/`.

---

## Section 5.4 — Donate Items Detail (id="donate-items")

**Layout:** Same as 5.3. Contact link at bottom.

**Content:**
Verbatim from canvas: *"If you're interested in supporting our program, but are unable to commit to taking an apprentice..."*
Tools mentioned: Apple, Sphero, GitHub, Slack.
Contact link: `dave.saltmarsh@jamf.com` — styled as a CTA button (`mailto:` link).

---

## Section 5.5 — Donate Financially Detail (id="donate-money")

**Layout:**
Two sub-cards side by side (or stacked on mobile). Each sub-card represents one donation pathway.

**Sub-card 1 — Scholarships:**
- Heading: `Fund a Young Woman's Education`
- Body: *"In Zimbabwe, families pay for the equivalent of Junior and Senior year of high school. A donation of $600–$1,000 covers a young girl's school fees for one year."*
- Image: `img-F0AP7B3MR9S.jpeg`
- Button (orange, external): `Donate via Benevity` → `https://jamf.benevity.org/community/fundraiser/28338`

**Sub-card 2 — MCRI Direct:**
- Heading: `Support the MCRI Directly`
- Body: *"Our program runs completely on generous donations from people like you."*
- Image: `img-F0APGR046BB.jpeg`
- Button (orange, external): `Donate via MATTER` → `https://www.matter.ngo/project/matter-career-readiness-institute/`

**Components:** `<DonationCards />` — two-up card layout, internal to support page.

---

## Section 5.6 — Thank You Closing

**Layout:** Centered, generous white space. Simple and warm.

**Content:**
- H3: `Thank you so much for your support.`
- Body: `Every contribution — whether time, expertise, software, or funding — directly changes the trajectory of a student's life in Zimbabwe.`

No CTA. The page has already done its conversion work.

---

## Section 5.7 — Contact Card

**Layout:** Small card, centered, max-width 480px. Border `--color-border`, border-radius 12px, padding 32px.

**Content:**
- Heading: `Have questions?`
- Body: `Reach out directly to Dave Saltmarsh, Senior Director of Community Education Initiatives at Jamf.`
- Link: `dave.saltmarsh@jamf.com`
- LinkedIn: `David J. Saltmarsh ↗`

**Components:** Inline in `support.astro`.

---

# Reusable Component Inventory

| Component | Used On | Props |
|---|---|---|
| `<Nav />` | All pages | `links`, `ctaLabel`, `ctaHref` |
| `<Footer />` | All pages | (static) |
| `<Hero />` | Home | `eyebrow`, `headline`, `body`, `imageSrc`, `primaryCta`, `secondaryCta` |
| `<PageHero />` | Curriculum, About, Support, Student Work | `heading`, `subhead`, `imageSrc`, `breadcrumb` |
| `<StatsBar />` | Home | `stats[]` |
| `<LogoBar />` | Home | `heading`, `logos[]` |
| `<SplitSection />` | Home, Curriculum, About | `heading`, `body`, `imageSrc`, `imagePosition`, `eyebrow`, `link` |
| `<CalloutBand />` | Home | `logo`, `heading`, `body`, `cta`, `background` |
| `<CTABand />` | All pages | `heading`, `primaryCta`, `secondaryCta` |
| `<CurriculumGrid />` | Curriculum | `tracks[]` via content collection |
| `<ApprenticeshipFeature />` | Curriculum | (internal data) |
| `<BadgeShowcase />` | Curriculum | `heading`, `body`, `badgeId`, `imageSrc` |
| `<TeamGrid />` | About | `members[]` via content collection |
| `<IconCardRow />` | About | `cards[]` |
| `<HubMap />` | About | `imageSrc`, `hubCount`, `countryCount` |
| `<SupportCards />` | Support | `options[]` via content collection |
| `<PortfolioGrid />` | Student Work | `projects[]` via content collection |
| `<EmptyState />` | Student Work | `heading`, `body` |
