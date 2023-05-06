import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admins/admin/admin.service';
import { SignInAdminDTO } from 'src/dtos/admins.dtos';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInAdminDto: SignInAdminDTO) {
    const admin = await this.adminService.findOne(signInAdminDto.username);

    let isMatch = false;
    if (admin?.password) {
      isMatch = await bcrypt.compare(signInAdminDto.password, admin.password);
    }
    if (!isMatch || !admin) {
      throw new UnauthorizedException();
    }
    const payload = { username: admin.username, password: admin.password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
