import { IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class SendEmailDto{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsBoolean()
  isCopy: boolean;
}

