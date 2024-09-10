import { z } from 'zod';

export const envSchema = z.enum(['development']);

export const databaseSchema = z.object({
  host: z.string(),
  database: z.string(),
  password: z.string(),
  port: z.coerce.number(),
  url: z.string().startsWith('postgresql://'),
  username: z.string(),
});

export const envConfigSchema = z.object({
  env: envSchema,
  port: z.coerce.number().positive().int(),
  database: databaseSchema,
});
