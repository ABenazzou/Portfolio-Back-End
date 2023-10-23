import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainService } from 'src/domains/domain/domain.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/dtos/projects.dtos';
import { Project } from 'src/entities/project';
import { TechnologyService } from 'src/technologies/technology/technology.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly technologyService: TechnologyService,
    private readonly domainService: DomainService,
  ) {}

  getProjects() {
    return this.projectRepository.find();
  }

  getSortedProjects() {
    return this.projectRepository.find({
      order: {
        visits_count: 'DESC',
      },
      take: 4,
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
    try {
      await this.projectRepository.save(newProject);
    } catch (error) {
      throw new HttpException(
        'Project Name already exists',
        HttpStatus.CONFLICT,
      );
    }
    return newProject;
  }

  async addProjectTechnology(id: number, technologyId: number) {
    const project = await this.getProjectById(id);
    const technology = await this.technologyService.getTechnologyById(
      technologyId,
    );
    if (technology) {
      project.technologies.push(technology);
      await this.projectRepository.save(project);
      return this.getProjectById(id);
    }
    throw new HttpException('Technology not found', HttpStatus.NOT_FOUND);
  }

  /*
  By Id is faster due to index lookup
  async addProjectTechnology(id: number, technologyName: string) {
    const project = await this.getProjectById(id);
    const technology = await this.technologyService.getTechnologyByName(
      technologyName,
    );
    if (technology) {
      project.technologies.push(technology);
      await this.projectRepository.save(project);
      return this.getProjectById(id);
    }
    throw new HttpException('Technology not found', HttpStatus.NOT_FOUND);
  }
  */

  async addProjectDomain(id: number, domainId: number) {
    const project = await this.getProjectById(id);
    const domain = await this.domainService.getDomainById(domainId);
    if (domain) {
      project.domains.push(domain);
      await this.projectRepository.save(project);
      return this.getProjectById(id);
    }
    throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
  }

  async updateProjectVisits(id: number) {
    const project = await this.getProjectById(id);
    if (project) {
      project.visits_count ++;
      await this.projectRepository.save(project);
      return this.getProjectById(id);
    }
    throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
  }
  /*
  By Id is faster due to lookup 
  async addProjectDomain(id: number, domainName: string) {
    const project = await this.getProjectById(id);
    const domain = await this.domainService.getDomainByName(domainName);
    if (domain) {
      project.domains.push(domain);
      await this.projectRepository.save(project);
      return this.getProjectById(id);
    }
    throw new HttpException('Domain not found', HttpStatus.NOT_FOUND);
  }
  */

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
