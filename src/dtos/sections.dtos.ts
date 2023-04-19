import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { section_type } from 'src/entities/section';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  type: section_type;

  @IsNotEmpty()
  @IsBoolean()
  is_displayed: boolean;
}
