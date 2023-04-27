import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/dtos/projects.dtos';

@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects() {
    return this.projectService.getProjects();
  }

  @Get('mostVisited')
  getSortedProjects() {
    return this.projectService.getSortedProjects();
  }

  @Get('id/:id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProjectById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Put('/id/:id')
  @UsePipes(ValidationPipe)
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete('/id/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }

  @Post('/id/:id/technology/:technology')
  async addProjectTechnology(
    @Param('id', ParseIntPipe) id: number,
    @Param('technology') technologyName: string,
  ) {
    return this.projectService.addProjectTechnology(id, technologyName);
  }

  @Post('/id/:id/domain/:domain')
  async addProjectDomain(
    @Param('id', ParseIntPipe) id: number,
    @Param('domain') domainName: string,
  ) {
    return this.projectService.addProjectDomain(id, domainName);
  }
}
