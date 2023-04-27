import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto, UpdateProjectDto } from 'src/dtos/projects.dtos';
import { Domain } from 'src/entities/domain';
import { Project } from 'src/entities/project';
import { Technology } from 'src/entities/technology';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
  ) {}

  getProjects() {
    return this.projectRepository.find();
  }

  getSortedProjects() {
    return this.projectRepository.find({
      order: {
        visits_count: 'DESC',
      },
    });
  }

  async getProjectById(projectId: number) {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
      relations: {
        technologies: true,
        domains: true,
      },
    });
    if (project) {
      return project;
    }
    throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
  }

  async createProject(createProjectDto: CreateProjectDto) {
    const newProject = await this.projectRepository.create(createProjectDto);
    await this.projectRepository.save(newProject);
    return newProject;
  }

  async addProjectTechnology(id: number, technologyName: string) {
    const project = await this.getProjectById(id);
    const technology = await this.technologyRepository.findOne({
      where: {
        name: technologyName,
      },
    });
    if (technology) {
      project.technologies.push(technology);
      await this.projectRepository.save(project);
      return this.getProjectById(id);
    }
    throw new HttpException('Technology not found', HttpStatus.NOT_FOUND);
  }

  async addProjectDomain(id: number, domainName: string) {
    const project = await this.getProjectById(id);
    const domain = await this.domainRepository.findOne({
      where: {
        name: domainName,
      },
    });
    if (domain) {
      project.domains.push(domain);
      await this.projectRepository.save(project);
      return this.getProjectById(id);
    }
    throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
    await this.projectRepository.update(id, updateProjectDto);
    const updatedProject = await this.getProjectById(id);
    return updatedProject;
  }

  async deleteProject(id: number) {
    // should delete relations in the future or check constraints at the very least
    const deleteProject = await this.projectRepository.delete(id);
    if (!deleteProject.affected) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }
}
