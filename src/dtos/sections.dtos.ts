import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { section_type } from 'src/entities/section';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(section_type)
  type: section_type;

  @IsNotEmpty()
  @IsBoolean()
  is_displayed: boolean;
}

export class UpdateSectionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(section_type)
  type: section_type;

  @IsNotEmpty()
  @IsBoolean()
  is_displayed: boolean;
}
