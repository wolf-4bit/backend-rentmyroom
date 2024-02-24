import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Property } from './property';
import * as bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export type UserRole = 'admin' | 'owner' | 'user';
@Entity()
export class User {
  @PrimaryColumn('text')
  id!: string;

  @Column('text')
  name!: string;

  @Column('text')
  @Unique('phone', ['phone'])
  phone!: string;

  @Column('text', { unique: true })
  @Unique('email', ['email'])
  email!: string;

  @Column('text')
  password!: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'owner', 'user'],
    default: 'user',
  })
  userRole: UserRole;
  @OneToMany(() => Property, (property) => property.owner)
  property!: Property[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  @BeforeInsert()
  generateNanoId() {
    this.id = nanoid();
  }
}
