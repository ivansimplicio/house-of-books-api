import { Order } from './../../orders/entities/order.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'delivery_addresses' })
export class DeliveryAddress {
  
  @PrimaryGeneratedColumn('identity')
  id: number;
  
  @Column({ nullable: false })
  street: string;

  @Column()
  number: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false, name: 'zip_code' })
  zipCode: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false, name: 'order_id' })
  orderId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Order, (order) => order.deliveryAddress)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
