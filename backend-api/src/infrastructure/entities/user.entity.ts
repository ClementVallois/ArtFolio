import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ unique: true, length: 100, nullable: false })
  username: string;

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

  @Column({ unique: true, nullable: false, length: 31 })
  auth0Id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
