import { Test, TestingModule } from '@nestjs/testing';
import { ResumeService } from './resume.service';
import { Repository } from 'typeorm';
import { Resume } from 'src/entities/resume';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DomainService } from 'src/domains/domain/domain.service';

describe('ResumeService', () => {
  let service: ResumeService;
  let resumeRepository: Repository<Resume>;
  const RESUME_REPOSITORY_TOKEN = getRepositoryToken(Resume);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeService,
        {
          provide: RESUME_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: DomainService,
          useValue: {
            getDomainByName: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResumeService>(ResumeService);
    resumeRepository = module.get<Repository<Resume>>(RESUME_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('resumeRepository should be defined', () => {
    expect(resumeRepository).toBeDefined();
  });
});
