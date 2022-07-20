import { MailerService } from '@nestjs-modules/mailer';

export class WelcomeAdminMailer {

  constructor(private readonly mailerService: MailerService){}

  async sendEmail(name: string, email: string){
    await this.mailerService.sendMail({
      to: email,
      subject: `HOB: Conta de administrador criada!`,
      template: 'welcome_admin.hbs',
      context: { payload: { name } }
    });
  }
}