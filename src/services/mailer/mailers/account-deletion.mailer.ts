import { MailerService } from '@nestjs-modules/mailer';

export class AccountDeletionMailer {

  constructor(private readonly mailerService: MailerService){}

  async sendEmail(name: string, email: string){
    const payload = {
      name,
      email,
      date: this.getCurrentDate(),
    };
    await this.mailerService.sendMail({
      to: email,
      subject: `HOB: Exclusão da sua conta`,
      template: 'account_deletion.hbs',
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