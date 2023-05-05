import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AdminService } from './admin/admin.service';

@Module({
  controllers: [AuthController],
  providers: [AdminService],
})
export class AuthModule {}
