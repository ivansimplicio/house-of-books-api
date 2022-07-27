import { User } from './../../users/entities/user.entity';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'link_tokens' })
export class LinkToken {
  
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false, unique: true, name: 'user_id' })
  userId: string;

  @Column({ nullable: false, unique: true })
  token: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.linkToken)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
