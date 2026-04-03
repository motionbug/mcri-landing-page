# MCRI Sitemap & Information Architecture
**MATTER Career Readiness Institute**
Version 1.0 | March 2026

---

## Audience Reference
| Audience | Priority | What They Need |
|---|---|---|
| **Apple community / Employer partners** | Primary | Program legitimacy, credential specifics, how to partner, employer outcomes |
| **Jamf stakeholders** | Secondary | CEI team context, program alignment with Jamf values, employed graduate numbers |
| **Parents & students** | Secondary | What the program is, how to get in, what life looks like, outcomes |

---

## Full Site Structure

```
mcri/
├── index                    (Home)
├── curriculum               (Curriculum)
│   ├── teal-plus            (TEAL+ Model sub-page)
│   └── kinder-to-career     (Kinder-to-Career sub-page)
├── student-work             (Student Work)
├── about                    (About)
└── support                  (Support)
```

---

## Page-by-Page IA

---

### `/` — Home

**Primary audience:** Apple community / employer partners (first impression, credibility signal)
**Goal:** Establish legitimacy, communicate mission in under 30 seconds, route audiences to relevant pages

#### Content Blocks (in order)

| # | Block | Layout Pattern | Key Content |
|---|---|---|---|
| 1 | **Nav** | Sticky top bar | Logo (left), nav links (center/right): Home, Curriculum, Student Work, About, Support. CTA button: "Become a Partner" |
| 2 | **Hero** | Full-width, dark overlay, image right or full-bleed | Headline: "MATTER Career Readiness Institute." Subhead: "Powered by Jamf Community Education Initiatives." Body: One sentence — what MCRI does and where. CTA: "See Our Curriculum" (primary), "Support the Program" (secondary). Image: students working at MCRI |
| 3 | **Impact Stats** | 4-column stat counter bar, dark background (navy) | 13 employed at Jamf / 9 at Mains'l / 1 at Tradition Bank / 1 at MATTER NGO. Label: "Zimbabweans employed full-time, working remotely" |
| 4 | **What Makes Us Special** | 50/50 split: text left, image right | Headline: "It's not the technology." Body from canvas verbatim. Link: "Learn more about our curriculum →" |
| 5 | **Jamf CEI Overview** | Card or callout band | Who Jamf CEI is, their role in curriculum design, link: "Meet the team →" (links to About) |
| 6 | **End-of-page CTA band** | Full-width, colored background (teal) | Dual CTAs: "Explore the Curriculum" + "Ways to Support" |
| 7 | **Employer Partner Logos** | Centered logo grid, light background | Jamf, Mains'l, Tradition Bank, MATTER NGO logos with names beneath. Section label: "Our Employer Partners". Appears below the CTA band. |
| 8 | **Footer** | 3-column + bottom bar | Col 1: MCRI logo + tagline. Col 2: Site links. Col 3: LinkedIn/company links only, no public email. Bottom: © MATTER NGO |

**Bottom-of-page CTA:** "Explore the Curriculum" (primary) + "Ways to Support" (secondary)

**Designer notes:**
- The stat counter section is the single most important trust signal for employer partners. It must be visually prominent — large numbers, company names, and logos together.
- "Powered by Jamf CEI" should appear in the hero — not buried. This legitimizes the curriculum for the Apple community instantly.
- Do not include an exhaustive program description on the home page. Route. Every section should have one job: earn the click to the next page.

---

### `/curriculum` — Curriculum

**Primary audience:** Employer partners (evaluating curriculum rigor), Jamf stakeholders
**Secondary audience:** Students/parents (understanding what the program involves)
**Goal:** Demonstrate curriculum depth, credential stack, and pathway from learning to employment

#### Content Blocks (in order)

| # | Block | Layout Pattern | Key Content |
|---|---|---|---|
| 1 | **Page Hero** | Full-width hero with text overlay | Headline: "A Curriculum Built for Real Employment." Sub: One line on the TEAL+ foundation. Breadcrumb nav. |
| 2 | **TEAL+ Foundation intro** | Split layout: icon/visual left, text right | What TEAL+ is (brief), how it's baked into the MCRI pre-requisite. Link: "Learn more about TEAL+ →" (sub-page) |
| 3 | **Curriculum Approach** | Centered text block with accent rule | The two-paragraph approach section from canvas verbatim |
| 4 | **Core Curriculum** | Tabbed or accordion grid, 6 tracks | One card/accordion per track: Apple, Swift Development, Jamf, Essential Skills, Agentic AI, macOS Fundamentals. Each card shows: track name, icon, bullet list of achievements, Credly badge widget (where applicable) |
| 5 | **Additional Pathways** | Simple 2-column tag list or icon grid | Web Services, Agile/SCRUM, Web Accessibility, SQL, UX/UI — with brief descriptor for each |
| 6 | **Instructional Model** | Split layout: image left, text right | In-person delivery, industry professionals, cert-paired. Image from classroom |
| 7 | **Apprenticeship Model** | Feature callout card (prominent, full-width-ish) | "Not an Internship" — the 6-month model, paid by Jamf CEI, designed for FT employment. Visually distinct from the curriculum section above it. |
| 8 | **Graduate Outcome + Badge** | Centered, badge hero | MCRI Professional badge image (Credly embed), description of what earning it means |
| 9 | **End CTA band** | Full-width, navy background | "Ready to partner with us?" → "Become an Employer Partner" button |

**Bottom-of-page CTA:** "Become an Employer Partner"

**Designer notes:**
- Each curriculum track card should show the Credly badge if one exists. This is the primary legitimacy signal for the Apple community — they know what these credentials mean.
- The Apprenticeship section needs to feel architecturally distinct from the curriculum list above it. Consider a diagonal section break or a contrasting background color (teal) to signal the transition from "learning" to "working."
- The "Additional Pathways" section is intentionally lower-hierarchy — these aren't guaranteed. Style accordingly (lighter treatment, smaller text).
- **Content gap:** Credly embed codes for all badges need to be collected (see brand-guide.md gap list).

---

### `/student-work` — Student Work

**Primary audience:** Employer partners (evaluating output quality), Apple community
**Secondary audience:** Students (inspiration), Parents (evidence of outcomes)
**Goal:** Show proof of capability — real projects built by real students

#### Content Blocks (in order)

| # | Block | Layout Pattern | Key Content |
|---|---|---|---|
| 1 | **Page Hero** | Minimal hero, text-only | Headline: "Work Built by MCRI Students." Sub: One line on what students build during the program. |
| 2 | **Portfolio Grid** | 3-column card grid | Each card: App name, student name (optional), description (1–2 sentences), screenshot/icon, link to published work or App Store. |
| 3 | **GitHub / Published links** | Simple list or card links | Links to any published student work, GitHub repos, or app portfolios |
| 4 | **End CTA** | Full-width band | "Interested in hiring from our program?" → "Become an Employer Partner" |

**Bottom-of-page CTA:** "Become an Employer Partner"

**Designer notes:**
- This page is currently a placeholder in the canvas ("Include link to published student work?"). It needs content before it can be built properly. However, the page structure and layout should be built with content slots ready.
- If only a small number of projects exist at launch, consider a 2-column grid instead of 3-column to avoid sparse-looking layout.
- Student names are optional — discuss with Dave/Rob whether students have consented to having their names on a public site.
- **Content gap:** No student work links or project names are provided in the canvas. This page may launch as a "Coming Soon" placeholder at Phase 1 and populate in Phase 4.

---

### `/about` — About

**Primary audience:** All three audiences, but especially parents/students and Jamf stakeholders
**Goal:** Tell the full story of MCRI — place, purpose, people, and global impact

#### Content Blocks (in order)

| # | Block | Layout Pattern | Key Content |
|---|---|---|---|
| 1 | **Page Hero** | Full-width hero with image | Headline: "By 2026, 30 Zimbabweans Employed & 2,000 Learning." Image: campus or students. (Use the canvas graphic as inspiration for the stat, but render it in the brand system — not as an image) |
| 2 | **Mission & Vision** | Split layout: text left, visual right | What MCRI is, location (Victoria Falls), the vision statement |
| 3 | **Location & Feeder Schools** | Text block + school list | MCRI location description, the 6 feeder high schools by name |
| 4 | **Equity & Gender Commitment** | Feature callout card | 50%+ girls and young women, the "why" — supporting the next generation of women in tech |
| 5 | **Sustainability** | 3 icon cards | Solar power / Local construction & sourcing / Universal design — one card each with icon, headline, 1-sentence description |
| 6 | **Hub Map** | Full-width map image + stat overlay | The hub map image from canvas. 28 hubs. 8 countries. Focus on Zimbabwe. |
| 7 | **Jamf CEI Team** | 3-column bio cards | One card each for Kelly, Valeria, Dave. Each card: photo (square crop), name, title, 2–3 sentence bio, LinkedIn icon link |
| 8 | **CEI Mission Statement** | Centered quote-style text block | The paragraph about living Jamf values, TEAL+, Kinder-to-Career from canvas |
| 9 | **Sub-page Links** | 2 feature cards | "Learn about the TEAL+ Model →" / "Explore Kinder-to-Career →" |
| 10 | **End CTA band** | Full-width | "Join us in building something remarkable." → "Ways to Support" |

**Bottom-of-page CTA:** "Ways to Support the MCRI"

**Designer notes:**
- The hub map is powerful visual evidence of global scale — give it a full-width treatment with a stat overlay ("28 Hubs across 8 Countries"). Don't shrink it to a thumbnail.
- Team bios should be warm and personal, not formal. The LinkedIn links are important for the Apple community — these are the real people they'd be working with.
- The gender equity section should not be buried. It's both a values signal and a practical program feature (stipend, housing, health insurance). Consider pulling the specific benefits (food, board, health insurance, stipend) into a visual list alongside the equity commitment.
- **Content gap:** TEAL+ model sub-page body copy is not provided. **Kinder-to-Career sub-page body copy is not provided.** Both sub-pages are placeholders until content is supplied.

---

### `/about/teal-plus` — TEAL+ Model (Sub-page)

**Primary audience:** Employer partners, Jamf stakeholders wanting depth
**Goal:** Explain the pedagogical foundation that produces MCRI's student quality

#### Content Blocks

| # | Block | Layout Pattern |
|---|---|---|
| 1 | **Page Hero** | Minimal hero: "The TEAL+ Model: Technology-Enabled Active Learning" |
| 2 | **What is TEAL+** | Body copy — *needs content from Valeria/Kelly* |
| 3 | **How it's applied at MCRI** | Body copy or 3-card breakdown |
| 4 | **Link back to Curriculum** | Inline CTA |

**⚠️ Content gap: Full body copy must be provided before this page can be written.**

---

### `/about/kinder-to-career` — Kinder-to-Career (Sub-page)

**Primary audience:** Jamf stakeholders, potential new program partners
**Goal:** Show MCRI as the final stage of a larger educational continuum

#### Content Blocks

| # | Block | Layout Pattern |
|---|---|---|
| 1 | **Page Hero** | "From Kinder to Career: The Continuum" |
| 2 | **Program overview** | Body copy — *needs content from Dave* |
| 3 | **MCRI as the final stage** | Visual timeline or flow diagram |
| 4 | **Link to About** | Inline CTA |

**⚠️ Content gap: Full body copy must be provided before this page can be written.**

---

### `/support` — Support

**Primary audience:** Apple community / potential employer partners and donors
**Goal:** Convert visitor intent into action — one of three clear paths

#### Content Blocks (in order)

| # | Block | Layout Pattern | Key Content |
|---|---|---|---|
| 1 | **Page Hero** | Minimal, text-focused | Headline: "There are many ways to make a difference." Sub: "Find the path that fits you." |
| 2 | **Support Path Cards** | 3-column card grid (large, prominent) | Card 1: Employer Partner. Card 2: Donate Software/Hardware/Training. Card 3: Donate Financially. Each card has: image, headline (from canvas), 2-sentence description, primary CTA button |
| 3 | **Employer Partner Detail** | Expanded section below card grid | Full description from canvas, link to Employment Partner Brief PDF |
| 4 | **Donate Software/Hardware Detail** | Expanded section | Full description, tools list (Apple, Sphero, GitHub, Slack), company LinkedIn contact link |
| 5 | **Donate Financially Detail** | Expanded section | Scholarship pathway (Benevity link, $600–$1,000 framing), direct MCRI donation (MATTER link) |
| 6 | **Thank You / Closing** | Centered text block | "Thank you so much for your support." — warm close, no pressure |
| 7 | **Contact CTA** | Simple card | MATTER Innovation Centre LinkedIn link with context for support questions |

**Bottom-of-page CTA:** Both donation links are inline CTAs within their sections; page-level CTA not needed

**Designer notes:**
- The three support paths should be visually equivalent in weight — no path should look more important than another before the user self-selects. The images from the canvas (one per support option) help differentiate them visually.
- The employer partner path has a downloadable PDF (the Employment Partner Brief). This is a high-value asset — give it a prominent link treatment, not just a buried hyperlink.
- Financial donation has two sub-paths (scholarship vs. direct MCRI). Both links must be prominently displayed. The $600–$1,000 framing is excellent — keep it. It makes an abstract donation tangible.
- **Content gap:** The Employment Partner Brief PDF (F0AP7L711J8) needs to be extracted from Slack and hosted in `public/docs/`. Do not link to the Slack file — it's not publicly accessible.

---

## Navigation Architecture

### Primary Nav
```
[MCRI Logo]  |  Home  Curriculum  Student Work  About  Support  |  [Become a Partner →]
```

### Mobile Nav
Hamburger menu, full-screen overlay, same links stacked vertically, CTA button at bottom.

### Footer Nav
```
MCRI                    Pages               Connect
[Logo]                  Home                [LinkedIn icon → MATTER Innovation Centre]
Powered by Jamf CEI     Curriculum          [Jamf CEI]
                        Student Work
Victoria Falls,         About               © 2026 MATTER NGO
Zimbabwe                Support
                        TEAL+ Model
                        Kinder-to-Career
```

---

## URL Structure

| URL | Page |
|---|---|
| `/` | Home |
| `/curriculum/` | Curriculum |
| `/curriculum/teal-plus/` | TEAL+ Model |
| `/curriculum/kinder-to-career/` | Kinder-to-Career |
| `/student-work/` | Student Work |
| `/about/` | About |
| `/support/` | Support |

**Note on sub-page routing:** TEAL+ and Kinder-to-Career are listed under `/curriculum/` in the URL structure (since they're pedagogical methodology content) but linked prominently from `/about/` (since that's where the team and mission content lives). This dual presence via nav and inline links is intentional — it serves both the employer audience (who approaches via Curriculum) and the general audience (who approaches via About).
