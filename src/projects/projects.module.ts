import { Module } from '@nestjs/common';
import { ProjectService } from './project/project.service';
import { ProjectController } from './project/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project';
import { Technology } from 'src/entities/technology';
import { Domain } from 'src/entities/domain';
import { JwtService } from '@nestjs/jwt';
import { TechnologyService } from 'src/technologies/technology/technology.service';
import { DomainService } from 'src/domains/domain/domain.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Technology, Domain])],
  controllers: [ProjectController],
  providers: [ProjectService, JwtService, TechnologyService, DomainService],
})
export class ProjectsModule {}
