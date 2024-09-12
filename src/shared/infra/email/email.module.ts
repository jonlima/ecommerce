import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EnvConfigService } from '../env-config/env-config.service';
import { EnvConfigModule } from '../env-config/env-config.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EnvConfigModule.forRoot()],
      inject: [EnvConfigService],
      useFactory: (config: EnvConfigService) => {
        return {
          transport: {
            host: config.get('mail').mailHost,
            port: config.get('mail').mailPort,
            auth: {
              user: config.get('mail').mailUser,
              pass: config.get('mail').mailPass,
            },
          },
          defaults: {
            from: config.get('mail').mailFrom,
          },
        };
      },
    }),
    EnvConfigModule.forRoot(),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
