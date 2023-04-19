import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin';
import { Section } from 'src/entities/section';
import { Certificate } from 'src/entities/certificate';
import { Domain } from 'src/entities/domain';
import { Project } from 'src/entities/project';
import { Resume } from 'src/entities/resume';
import { Technology } from 'src/entities/technology';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      Certificate,
      Domain,
      Project,
      Resume,
      Section,
      Technology,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
