# MCRI Website — Common Edits

Use this page if you already know how to open and edit a file in GitHub and just need to know which file to change.

For the full beginner-friendly guide, see [content-editing-guide.md](./content-editing-guide.md).

---

## Common Updates

| If you want to... | Edit this folder | Usually safe fields |
|---|---|---|
| Update a team bio or title | `src/content/team/` | `name`, `title`, `linkedin`, body text |
| Change curriculum text | `src/content/curriculum/` | `title`, `credentials`, body text |
| Update support card text | `src/content/support/` | `title`, `imageAlt`, `ctaLabel`, body text |
| Update partner website or counts | `src/content/partners/` | `name`, `href`, `employedCount` |
| Fix a typo in content | `src/content/` | only the text that needs changing |

---

## If You Want To Update A Team Bio

Edit a file in `src/content/team/`.

Usually safe:
- `name`
- `title`
- `linkedin`
- the paragraph text below the second `---`

Usually do not change:
- `photo`
- `order`

Example:

Before:
```md
title: Senior Program Engineer
```

After:
```md
title: Senior Program Engineer, Community Learning
```

---

## If You Want To Update Curriculum Text

Edit a file in `src/content/curriculum/`.

Usually safe:
- `title`
- items inside `credentials`
- the paragraph text below the second `---`

Usually do not change:
- `icon`
- `order`

Example:

```md
credentials:
  - Existing credential
  - New credential
```

---

## If You Want To Update Support Content

Edit a file in `src/content/support/`.

Usually safe:
- `title`
- `imageAlt`
- `ctaLabel`
- the paragraph text below the second `---`

Usually do not change:
- `image`
- `ctaHref`
- `ctaExternal`
- `anchorId`
- `order`

---

## If You Want To Update Partner Information

Edit a file in `src/content/partners/`.

Usually safe:
- `name`
- `href`
- `employedCount`

Usually do not change:
- `logo`
- `logoWhite`
- `order`
- `logoClass`
- `logoWhiteClass`
- `invertOnDark`

---

## If You Want To Fix A Typo

Change only the text that needs to be corrected.

Do not:
- rename the file
- change the field labels
- edit extra files “just in case”

---

## Stop And Ask First

Ask for help before editing anything in:

- `src/components/`
- `src/layouts/`
- `src/pages/`
- `src/styles/`
- `src/data/nav.ts`
- `src/content.config.ts`
- `.astro/`
- `dist/`
- `.github/`

Also ask first if you need to:

- replace an image or logo
- add a new file
- change the order of cards or sections
- change a URL you are not sure about
- add a new person’s contact details
