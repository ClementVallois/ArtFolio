import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';

@Entity('assets')
export class AssetEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.assets)
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.assets)
  post: PostEntity;
}
