import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  company_id: number;

  @Column()
  category_id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  order: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0.0 })
  price: number;

  @Column()
  photo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
