import { z } from 'zod';

export const normalizeUrl = (url: string) => {
  if (!url) return '';
  let trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return 'https://' + trimmed;
  }
  return trimmed;
};

const maxClicksSchema = z
  .union([z.string(), z.number()])
  .nullish()
  .refine(
    (val) => {
      if (val === null || val === undefined || val === '') return true;
      const num = Number(val);
      return !isNaN(num) && num >= 1;
    },
    { message: 'Max clicks must be a positive number.' }
  );

const expiresAtSchema = z.union([z.string(), z.date()]).nullish();

export const createUrlSchema = z.object({
  title: z.string().optional(),
  originalUrl: z
    .string()
    .min(1, { message: 'Destination URL is required.' })
    .refine(
      (val) => {
        try {
          new URL(normalizeUrl(val));
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Please enter a valid destination URL (e.g. https://example.com).' }
    ),
  customAlias: z
    .string()
    .optional()
    .refine(
      (val) => !val || !val.includes('/'),
      { message: 'Custom alias cannot contain slashes (/).' }
    )
    .refine(
      (val) => !val || /^[a-zA-Z0-9_-]+$/.test(val),
      { message: 'Custom alias can only contain letters, numbers, hyphens (-), and underscores (_).' }
    )
    .refine(
      (val) => !val || val.length >= 3,
      { message: 'Custom alias must be at least 3 characters long.' }
    ),
  password: z.string().optional(),
  maxClicks: maxClicksSchema,
  expiresAt: expiresAtSchema,
});

export type CreateUrlFormValues = z.infer<typeof createUrlSchema>;

export const editUrlSchema = z.object({
  title: z.string().optional(),
  originalUrl: z
    .string()
    .min(1, { message: 'Destination URL is required.' })
    .refine(
      (val) => {
        try {
          new URL(normalizeUrl(val));
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Please enter a valid destination URL.' }
    ),
  customAlias: z
    .string()
    .optional()
    .refine(
      (val) => !val || !val.includes('/'),
      { message: 'Custom alias cannot contain slashes (/).' }
    )
    .refine(
      (val) => !val || /^[a-zA-Z0-9_-]+$/.test(val),
      { message: 'Custom alias can only contain letters, numbers, -, _.' }
    )
    .refine(
      (val) => !val || val.length >= 3,
      { message: 'Custom alias must be at least 3 characters long.' }
    ),
  password: z.string().optional(),
  removePassword: z.boolean().optional(),
  maxClicks: maxClicksSchema,
  removeMaxClicks: z.boolean().optional(),
  expiresAt: expiresAtSchema,
  removeExpiresAt: z.boolean().optional(),
});

export type EditUrlFormValues = z.infer<typeof editUrlSchema>;
