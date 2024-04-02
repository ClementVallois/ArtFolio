import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 50, nullable: false })
  name: string;

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
  })
  post: Post[];
}
