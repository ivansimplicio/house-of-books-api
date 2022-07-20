import { DeliveryAddress } from './../../../modules/delivery-addresses/models/delivery-address.model';
import { Order } from './../../../modules/orders/entities/order.entity';
import { MailerService } from '@nestjs-modules/mailer';

export class NewOrderMailer {

  constructor(private readonly mailerService: MailerService){}

  async sendEmail(order: Order){
    await this.mailerService.sendMail({
      to: order.user.email,
      subject: `HOB: Novo pedido realizado!`,
      template: 'new_order.hbs',
      context: { payload: this.preparePayload(order) }
    });
  }

  private preparePayload(order: Order) {
    return {
      user: {
        name: order.user.name,
      },
      order: {
        id: order.id,
        date: this.formatDate(order.createdAt),
        amount: this.formatValue(order.amount),
        items: this.formatItems(order),
        address: this.formatAddress(order.deliveryAddress),
      },
    };
  }

  private formatItems(order: Order){
    return order.items.map(item => ({
      book: {
        title: item.book.title,
        value: this.formatValue(item.book.value)
      },
      quantity: item.quantity,
      discount: this.formatValue((item.book.value * item.discount * item.quantity)),
      amount: this.formatValue(item.amount)
    }));
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  private formatValue(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  private formatAddress(address: DeliveryAddress): string {
    let content = ''
      .concat(address.number ? `, ${address.number}` : '')
      .concat(address.district ? `, ${address.district}` : '');
    return `${address.street}${content} - ${address.zipCode} - ${address.city}/${address.state}`;
  }
}
