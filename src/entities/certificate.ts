import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Domain } from './domain';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  provider: string;

  @Column({
    unique: true,
  })
  validity_link: string;

  @Column()
  thumbnail: string;

  @Column()
  date_obtained: Date;

  @ManyToMany(() => Domain, (domain) => domain.certificates, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  domains: Domain[];
}
