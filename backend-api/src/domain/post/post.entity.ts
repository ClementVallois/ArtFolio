import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Asset } from '../asset/asset.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  isPinned: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @OneToMany(() => Asset, (asset) => asset.post)
  assets: Asset[];

  @ManyToOne(() => Asset, (asset) => asset.user)
  user: Asset;
}
