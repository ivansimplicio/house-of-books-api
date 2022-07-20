import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import 'dotenv/config';
import { join } from 'path';

const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  },
  defaults: {
    from: process.env.SMTP_EMAIL_SENDER,
  },
  template: {
    dir: join(__dirname, '../../../resources/views/emails'),
    adapter: new HandlebarsAdapter()
  }
};

export default mailerConfig;
