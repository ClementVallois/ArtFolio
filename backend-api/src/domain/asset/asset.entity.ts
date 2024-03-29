import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  url: string;

  @Column({
    type: 'enum',
    enum: ['profile_picture', 'post_picture'],
    nullable: true,
  })
  type: string;

  @ManyToOne(() => User, (user) => user.assets)
  user: User;

  @ManyToOne(() => Post, (post) => post.assets)
  post: Post;
}
