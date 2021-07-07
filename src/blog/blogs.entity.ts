import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Blogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne((type) => Users, (users) => users.id)
  user: Users;

  @CreateDateColumn()
  created_at: Date;
}
