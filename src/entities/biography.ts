import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Biography {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  start_year: number;

  @Column({
    nullable: true,
  })
  end_year: number;

  @Column()
  occupation: string;
}
