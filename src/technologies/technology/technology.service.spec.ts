import { Test, TestingModule } from '@nestjs/testing';
import { TechnologyService } from './technology.service';
import { Repository } from 'typeorm';
import { Technology } from 'src/entities/technology';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TechnologyService', () => {
  let service: TechnologyService;
  let technologyRepository: Repository<Technology>;
  const TECHNOLOGY_REPOSITORY_TOKEN = getRepositoryToken(Technology);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologyService,
        {
          provide: TECHNOLOGY_REPOSITORY_TOKEN,
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

    service = module.get<TechnologyService>(TechnologyService);
    technologyRepository = module.get<Repository<Technology>>(
      TECHNOLOGY_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('technologyRepository should be defined', () => {
    expect(technologyRepository).toBeDefined();
  });
});
