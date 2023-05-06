import { Module } from '@nestjs/common';
import { DomainController } from './domain/domain.controller';
import { DomainService } from './domain/domain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from 'src/entities/domain';
import { Certificate } from 'src/entities/certificate';
import { Project } from 'src/entities/project';
import { Resume } from 'src/entities/resume';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Domain, Certificate, Project, Resume])],
  controllers: [DomainController],
  providers: [DomainService, JwtService],
})
export class DomainsModule {}
