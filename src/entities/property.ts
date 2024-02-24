import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user';
import { nanoid } from 'nanoid';

@Entity()
export class Property {
  @PrimaryColumn('text')
  id!: string;

  @Column('bigint')
  price!: number;

  @Column('text')
  description!: string;

  @Column('smallint')
  bhk!: number;

  @Column('text')
  city!: string;

  @Column('smallint')
  bathrooms!: number;

  @Column('text')
  location!: string;

  @Column('text')
  image!: string;

  @ManyToOne(() => User, (user) => user.property)
  owner!: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @BeforeInsert()
  generateNanoId() {
    this.id = nanoid();
  }
}
