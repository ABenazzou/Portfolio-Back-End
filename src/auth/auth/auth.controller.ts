import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAdminDto } from 'src/dtos/admins.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly adminService: AuthService) {}

  @Get()
  getAdmins() {
    return this.adminService.getAdmins();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createAdmins(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
}
