import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/dtos/projects.dtos';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { DomainService } from 'src/domains/domain/domain.service';
import { TechnologyService } from 'src/technologies/technology/technology.service';

@Controller('api/project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly domainService: DomainService,
    private readonly technologyService: TechnologyService,
  ) {}

  @Get()
  getProjects() {
    return this.projectService.getProjects();
  }

  @Get('mostVisited')
  getSortedProjects() {
    return this.projectService.getSortedProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProjectById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async addProjectTechnologyOrDomain(
    @Param('id', ParseIntPipe) id: number,
    @Query('technologyName') technologyName: string,
    @Query('domainName') domainName: string,
  ) {
    if (domainName !== undefined && technologyName !== undefined) {
      try {
        await this.domainService.getDomainByName(domainName);
        await this.technologyService.getTechnologyByName(technologyName);
      } catch (error) {
        throw error;
      }
      await this.projectService.addProjectTechnology(id, technologyName);
      await this.projectService.addProjectDomain(id, domainName);
      return this.projectService.getProjectById(id);
    } else if (domainName !== undefined) {
      return this.projectService.addProjectDomain(id, domainName);
    } else if (technologyName !== undefined) {
      return this.projectService.addProjectTechnology(id, technologyName);
    }
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
}
