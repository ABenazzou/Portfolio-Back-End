import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAdminDTO } from 'src/dtos/admins.dtos';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInAdminDto: SignInAdminDTO) {
    return this.authService.signIn(signInAdminDto);
  }
}
