import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateCertificateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsString()
  validity_link: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsDate()
  date_obtained: Date;
}
