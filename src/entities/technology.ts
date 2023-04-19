import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  logo: string;

  @Column()
  description: string;

  @ManyToMany(() => Project, (project) => project.technologies)
  projects: Project[];
}
