import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class UpdateHobbyDto {
  // @IsNotEmpty()
  // @IsNumber()
  // id: number;

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
