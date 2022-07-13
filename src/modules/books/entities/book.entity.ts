import { OrderItem } from './../../order-items/entities/order-item.entity';
import { Category } from './../../categories/entities/category.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity({ name: 'books' })
export class Book {

  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column({ nullable: false, unique: true })
  isbn: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false, name: 'publishing_company' })
  publishingCompany: string;

  @Column({ nullable: false })
  language: string;

  @Column({ name: 'release_date' })
  releaseDate: Date;

  @Column({ name: 'cover_type' })
  coverType: string;

  @Column({ nullable: false, name: 'number_of_pages' })
  numberOfPages: number;

  @Column({ nullable: false })
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable({
    name: 'books_categories',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id'
    }
  })
  categories: Category[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  items: OrderItem[];
}