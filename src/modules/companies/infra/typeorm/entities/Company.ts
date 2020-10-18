import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';

@Entity('companies')
class Company {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  blocked: boolean;

  @Column()
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'logo_url' })
  getlogoUrl(): string | null {
    if (!this.logo) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 's3':
        return `https://${uploadConfig.config.s3.bucket}.s3.amazonaws.com/${this.logo}`;
      case 'disk':
        return `${uploadConfig.config.disk.url}/files/${this.logo}`;
      default:
        return null;
    }
  }
}

export default Company;
