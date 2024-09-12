import { envConfigSchema } from './env-config.schema';
import { EnvConfig } from './env-config.type';

export const factory = (): EnvConfig => {
  const result = envConfigSchema.safeParse({
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    host: process.env.HOST,
    database: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
      url: process.env.DATABASE_URL,
      username: process.env.DATABASE_USERNAME,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    mail: {
      mailHost: process.env.MAIL_HOST,
      mailPort: process.env.MAIL_PORT,
      mailUser: process.env.MAIL_USER,
      mailPass: process.env.MAIL_PASS,
      mailFrom: process.env.MAIL_FROM,
    },
  });

  if (result.success) {
    return result.data;
  }

  throw new Error(`Invalid configuration: ${result.error.message}`);
};
