import { MailerService } from '@nestjs-modules/mailer';

export class WelcomeClientMailer {

  constructor(private readonly mailerService: MailerService){}

  async sendEmail(name: string, email: string){
    await this.mailerService.sendMail({
      to: email,
      subject: `HOB: Bem-vindo(a), ${name}`,
      template: 'welcome_client.hbs',
      context: { payload: { name } }
    });
  }
}
