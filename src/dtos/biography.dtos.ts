import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateBiographyDto {
  @IsNumber()
  @IsOptional()
  start_year: number;

  @IsNumber()
  @IsOptional()
  end_year: number;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
export class UpdateBiographyDto {
  @IsNumber()
  @IsOptional()
  start_year: number;

  @IsNumber()
  @IsOptional()
  end_year: number;

  @IsNotEmpty()
  @IsString()
  occupation: string;
}
