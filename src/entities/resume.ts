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

  @Column()
  lastUpdated: string;

  @OneToOne(() => Domain, (domain) => domain.resume, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  domain: Domain;
}
