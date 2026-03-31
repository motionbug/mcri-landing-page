import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const curriculumCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/curriculum' }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number(),
    credentials: z.array(z.string()),
    credlyBadges: z.array(z.object({
      name: z.string(),
      badgeId: z.string().optional(),
      imageSrc: z.string().optional(),
    })).optional(),
  }),
});

const teamCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    photo: z.string(),
    linkedin: z.string().url(),
    order: z.number(),
  }),
});

const partnersCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/partners' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/support' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
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
