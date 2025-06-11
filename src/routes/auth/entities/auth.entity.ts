import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  login: string;

  @Column('text')
  password: string;
}
