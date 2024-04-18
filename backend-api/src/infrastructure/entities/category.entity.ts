import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  /* 
  Relation with User entity 
  +-------------+--------------+----------------------------+
  |                users_categories_category                |
  +-------------+--------------+----------------------------+
  | userId      | int(11)      | PRIMARY KEY FOREIGN KEY    |
  | categoryId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
  +-------------+--------------+----------------------------+
  */
  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_categories',
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  user: User[];

  /* 
  Relation with Post entity 
  +-------------+--------------+----------------------------+
  |                categories_posts_category                |
  +-------------+--------------+----------------------------+
  | postId      | int(11)      | PRIMARY KEY FOREIGN KEY    |
  | categoryId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
  +-------------+--------------+----------------------------+
  */
  @ManyToMany(() => Post)
  @JoinTable({
    name: 'posts_categories',
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'post_id', referencedColumnName: 'id' },
  })
  post: Post[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
