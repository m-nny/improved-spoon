import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Follow } from './follow';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Follow, (follow) => follow.followingUser)
  isFollowing?: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followedUser)
  followedBy?: Follow[];
}
