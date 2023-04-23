import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Domain } from './domain';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pdf: string;

  @OneToOne(() => Domain, (domain) => domain.resume)
  @JoinColumn()
  domain: Domain;
}
