import { Module } from '@nestjs/common';
import { ResumeController } from './resume/resume.controller';
import { ResumeService } from './resume/resume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from 'src/entities/resume';
import { Domain } from 'src/entities/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  // to update once domain service is done
  imports: [TypeOrmModule.forFeature([Resume, Domain])],
  controllers: [ResumeController],
  providers: [ResumeService, JwtService],
})
export class ResumesModule {}
