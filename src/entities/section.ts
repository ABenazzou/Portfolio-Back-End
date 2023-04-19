import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum section_type {
  REGULARCONTENT = 'regular_content',
  IMAGECONTENT = 'image_content',
  SOCIALMEDIALINK = 'social_media_link',
}

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: section_type,
    default: section_type.REGULARCONTENT,
  })
  type: section_type;

  @Column()
  is_displayed: boolean;
}
