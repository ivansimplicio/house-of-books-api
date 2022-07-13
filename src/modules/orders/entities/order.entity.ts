import { User } from './../../users/entities/user.entity';
import { OrderItem } from './../../order-items/entities/order-item.entity';
import { DeliveryAddress } from './../../delivery-addresses/entities/delivery-address.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {

  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false })
  amount: number;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => DeliveryAddress, (address) => address.order)
  deliveryAddress: DeliveryAddress;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
