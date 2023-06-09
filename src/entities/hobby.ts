import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hobby {
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
}
