import { Module } from '@nestjs/common';
import { ProjectService } from './project/project.service';
import { ProjectController } from './project/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project';
import { Technology } from 'src/entities/technology';
import { Domain } from 'src/entities/domain';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Technology, Domain])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectsModule {}