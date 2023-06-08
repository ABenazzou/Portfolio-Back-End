import { Test, TestingModule } from '@nestjs/testing';
import { BiographyService } from './biography.service';
import { Repository } from 'typeorm';
import { Biography } from 'src/entities/biography';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BiographyService', () => {
  let service: BiographyService;
  let biographyRepository: Repository<Biography>;
  const BIOGRAPHY_REPOSITORY_TOKEN = getRepositoryToken(Biography);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BiographyService,
        {
          provide: BIOGRAPHY_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BiographyService>(BiographyService);
    biographyRepository = module.get<Repository<Biography>>(
      BIOGRAPHY_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('biographyRepository should be defined', () => {
    expect(biographyRepository).toBeDefined();
  });
});
