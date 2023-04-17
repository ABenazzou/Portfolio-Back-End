import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
