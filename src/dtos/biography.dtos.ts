import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBiographyDto {
  @IsNumber()
  start_year: number;

  @IsNumber()
  end_year: number;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
export class UpdateBiographyDto {
  @IsNumber()
  start_year: number;

  @IsNumber()
  end_year: number;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
