import { Column, Entity, Unique, PrimaryColumn } from 'typeorm';

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
  @Column({ default: true })
  active: boolean;
}
