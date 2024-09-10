import { z } from 'zod';
import { envConfigSchema, envSchema } from './env-config.schema';

export type Environment = z.infer<typeof envSchema>;

export type EnvConfig = z.infer<typeof envConfigSchema>;
