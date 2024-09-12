import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendConfirmEmailDto } from './dto/send-confirm-email.dto';
import { EnvConfigService } from '../env-config/env-config.service';
import { confirmEmail } from './template/confirm-email';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: EnvConfigService,
  ) {}

  async sendConfirmEmail(sendConfirmEmailDto: SendConfirmEmailDto) {
    const options = {
      to: sendConfirmEmailDto.to,
      from: this.config.get('mail').mailFrom,
      subject: sendConfirmEmailDto.title,
      html: confirmEmail({
        link: sendConfirmEmailDto.link,
        name: sendConfirmEmailDto.name,
      }),
    };

    try {
      await this.mailerService.sendMail(options);
    } catch (err) {
      console.log(err);
    }
  }
}
