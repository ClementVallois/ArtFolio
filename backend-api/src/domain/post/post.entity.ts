import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AssetEntity } from '../asset/asset.entity';
import { UserEntity } from '../user/user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  isPinned: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @OneToMany(() => AssetEntity, (asset) => asset.post)
  assets: AssetEntity[];

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;
}
