import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  pdf: string;

  @IsNotEmpty()
  @IsString()
  lastUpdated: string
}

export class UpdateResumeDto {
  @IsNotEmpty()
  @IsString()
  pdf: string;

  @IsNotEmpty()
  @IsString()
  lastUpdated: string
}
