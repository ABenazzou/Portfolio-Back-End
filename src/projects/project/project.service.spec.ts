import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { JwtService } from '@nestjs/jwt';
import { Project } from 'src/entities/project';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnologyService } from 'src/technologies/technology/technology.service';
import { DomainService } from 'src/domains/domain/domain.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let projectRepository: Repository<Project>;
  const PROJECT_REPOSITORY_TOKEN = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: TechnologyService,
          useValue: {
            getTechnologyByName: jest.fn(),
          },
        },
        {
          provide: DomainService,
          useValue: {
            getDomainByName: jest.fn(),
          },
        },
        {
          provide: PROJECT_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    projectRepository = module.get<Repository<Project>>(
      PROJECT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('projectRepository should be defined', () => {
    expect(projectRepository).toBeDefined();
  });
});
