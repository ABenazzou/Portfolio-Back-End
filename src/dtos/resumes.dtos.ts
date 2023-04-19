import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  pdf: string;
}
