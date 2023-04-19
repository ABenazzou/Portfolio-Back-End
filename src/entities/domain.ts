import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project';
import { Certificate } from './certificate';
import { Resume } from './resume';

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  logo: string;

  @ManyToMany(() => Project, (project) => project.domains)
  projects: Project[];

  @ManyToMany(() => Certificate, (certificate) => certificate.domains)
  certificates: Certificate[];

  @OneToOne(() => Resume, (resume) => resume.domain)
  resume: Resume;
}
