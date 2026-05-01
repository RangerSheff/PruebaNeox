import { Column, Entity, Unique, PrimaryColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  USER = 'user',
}

@Entity()
@Unique(['email'])
export class User {
  @PrimaryColumn({ unique: true })
  email: string;
  @Column()
  username: string;
  @Column()
  names: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
  @Column({ default: true })
  active: boolean;
}
