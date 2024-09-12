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

export const jwtSchema = z.object({
  secret: z.string().trim().min(5),
  expiresIn: z.string(),
});

export const mailSchema = z.object({
  mailHost: z.string(),
  mailPort: z.coerce.number(),
  mailUser: z.string(),
  mailPass: z.string(),
  mailFrom: z.string(),
});

export const envConfigSchema = z.object({
  env: envSchema,
  port: z.coerce.number().positive().int(),
  host: z.string(),
  database: databaseSchema,
  jwt: jwtSchema,
  mail: mailSchema,
});
