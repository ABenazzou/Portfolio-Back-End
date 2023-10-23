import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProjectService } from './project.service';
import { TechnologyService } from 'src/technologies/technology/technology.service';
import { DomainService } from 'src/domains/domain/domain.service';

describe('ProjectController', () => {
  let controller: ProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: TechnologyService,
          useValue: { getTechnologyByName: jest.fn() },
        },
        {
          provide: ProjectService,
          useValue: {
            getProjects: jest.fn(),
            getSortedProjects: jest.fn(),
            getProjectById: jest.fn(),
            createProject: jest.fn(),
            updateProject: jest.fn(),
            deleteProject: jest.fn(),
            addProjectTechnology: jest.fn(),
            addProjectDomain: jest.fn(),
            updateProjectVisits: jest.fn()
          },
        },
        {
          provide: DomainService,
          useValue: {
            getDomainByName: jest.fn(),
          },
        },
      ],
      controllers: [ProjectController],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
