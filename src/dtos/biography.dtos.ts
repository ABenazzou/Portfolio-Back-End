import { IsNotEmpty, IsNumber, IsString, IsEmpty } from 'class-validator';

export class CreateBiographyDto {
  @IsNumber()
  @IsEmpty()
  start_year: number;

  @IsNumber()
  @IsEmpty()
  end_year: number;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
export class UpdateBiographyDto {
  @IsNumber()
  @IsEmpty()
  start_year: number;

  @IsNumber()
  @IsEmpty()
  end_year: number;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
