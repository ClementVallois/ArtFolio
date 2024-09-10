import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('assets')
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

  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  userId: User;

  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  @ManyToOne(() => Post, (post) => post.id, {
    onDelete: 'CASCADE',
  })
  postId: Post;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
