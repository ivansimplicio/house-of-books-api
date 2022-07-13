import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'order_items' })
export class OrderItem {
  
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  discount: number;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false, name: 'book_id' })
  bookId: number;

  @Column({ nullable: false, name: 'order_id' })
  orderId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
