import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  company_id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 's3':
        return `https://${uploadConfig.config.s3.bucket}.s3.amazonaws.com/${this.avatar}`;
      case 'disk':
        return `${uploadConfig.config.disk.url}/files/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
