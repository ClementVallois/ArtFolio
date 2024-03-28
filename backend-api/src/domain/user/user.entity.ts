import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from '../asset/asset.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'date', length: 10, nullable: true })
  birthDate: Date;

  @Column({ unique: true, length: 100, nullable: true })
  username: string;

  @OneToMany(() => Asset, (asset) => asset.userId)
  assets: Asset[];

  @Column({ type: 'varchar', length: 750, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'deleted'],
    length: 20,
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

  @Column({ nullable: false, length })
  auth0Id: string;
}
