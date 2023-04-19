import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Domain } from './domain';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain_id: number;

  @Column()
  pdf: string;

  @OneToOne(() => Domain, (domain) => domain.resume)
  @JoinTable()
  domain: Domain;
}
