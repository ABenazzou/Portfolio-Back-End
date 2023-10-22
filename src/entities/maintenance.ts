import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  maintenanceBool: boolean;
}
