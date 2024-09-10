import { envConfigSchema } from './env-config.schema';
import { EnvConfig } from './env-config.type';

export const factory = (): EnvConfig => {
  const result = envConfigSchema.safeParse({
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
      url: process.env.DATABASE_URL,
      username: process.env.DATABASE_USERNAME,
    },
  });

  if (result.success) {
    return result.data;
  }

  throw new Error(`Invalid configuration: ${result.error.message}`);
};
