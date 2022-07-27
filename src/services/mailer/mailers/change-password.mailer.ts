import { MailerService } from '@nestjs-modules/mailer';

export class ChangePasswordMailer {

  constructor(private readonly mailerService: MailerService){}

  async sendEmail(name: string, email: string){
    const payload = {
      name,
      email,
      date: this.getCurrentDate()
    };

    await this.mailerService.sendMail({
      to: email,
      subject: `HOB: Alteração de senha`,
      template: 'change_password.hbs',
      context: { payload }
    });
  }

  private getCurrentDate(): string {
    const date = new Date();
    return date.toLocaleDateString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}