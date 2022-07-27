import { MailerService } from '@nestjs-modules/mailer';

export class ForgotPasswordMailer {

  constructor(private readonly mailerService: MailerService){}

  async sendEmail(name: string, email: string, token: string){
    const payload = { name, token };
    await this.mailerService.sendMail({
      to: email,
      subject: `HOB: Recuperação de senha`,
      template: 'forgot_password.hbs',
      context: { payload }
    });
  }
}