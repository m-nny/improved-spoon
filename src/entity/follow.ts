import {
  BaseEntity,

  Entity,
  ManyToOne,
  PrimaryColumn,
  RelationId
} from 'typeorm';
import { User } from './user';

@Entity()
export class Follow extends BaseEntity {
  @PrimaryColumn()
  @RelationId((follow: Follow) => follow.followedUser)
  followedUserId: number;

  @PrimaryColumn()
  @RelationId((follow: Follow) => follow.followingUser)
  followingUserId: number;

  @ManyToOne(() => User, (user) => user.isFollowing)
  followingUser?: User;

  @ManyToOne(() => User, (user) => user.followedBy)
  followedUser?: User;
}
