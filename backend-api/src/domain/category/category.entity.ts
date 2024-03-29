import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';

@Entity('categories')
export class CategoryEntity {
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
  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'users_categories',
  })
  user: UserEntity[];

  /* 
  Relation with Post entity 
  +-------------+--------------+----------------------------+
  |                categories_posts_category                |
  +-------------+--------------+----------------------------+
  | postId      | int(11)      | PRIMARY KEY FOREIGN KEY    |
  | categoryId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
  +-------------+--------------+----------------------------+
  */
  @ManyToMany(() => PostEntity)
  @JoinTable({
    name: 'posts_categories',
  })
  post: PostEntity[];
}
