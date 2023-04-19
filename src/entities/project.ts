import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Technology } from './technology';
import { Domain } from './domain';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  thumbnail: string;

  @Column()
  visits_count: number;

  @ManyToMany(() => Technology, (technology) => technology.projects)
  @JoinTable()
  technologies: Technology[];

  @ManyToMany(() => Domain, (domain) => domain.projects)
  @JoinTable()
  domains: Domain[];
}
