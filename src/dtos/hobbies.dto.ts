import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHobbyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
