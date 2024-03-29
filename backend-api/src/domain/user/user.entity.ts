import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssetEntity } from '../asset/asset.entity';
import { PostEntity } from '../post/post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ unique: true, length: 100, nullable: true })
  username: string;

  @OneToMany(() => AssetEntity, (asset) => asset.user)
  assets: AssetEntity[];

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @Column({ type: 'varchar', length: 750, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'deleted'],
    default: 'inactive',
    nullable: true,
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['artist', 'user', 'moderator'],
    nullable: true,
  })
  role: string;

  @Column({ nullable: false, length: 50 })
  auth0Id: string;
}
