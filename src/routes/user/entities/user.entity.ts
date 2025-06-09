import {
  Entity,
  Column,
  PrimaryColumn,
  VersionColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  login: string;

  @Column('text')
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
