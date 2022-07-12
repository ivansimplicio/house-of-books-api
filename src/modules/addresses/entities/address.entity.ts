import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'addresses' })
export class Address {
  
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

  @Column({ nullable: false, name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
