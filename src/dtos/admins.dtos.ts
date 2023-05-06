import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInAdminDTO {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
