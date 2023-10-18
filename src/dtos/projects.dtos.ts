import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsNumber()
  visits_count: number;

  @IsNotEmpty()
  @IsString()
  github_link: string;
}

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsNumber()
  visits_count: number;
 
  @IsNotEmpty()
  @IsString()
  github_link: string;
}
