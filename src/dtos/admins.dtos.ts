import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
