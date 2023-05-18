import { Test, TestingModule } from '@nestjs/testing';
import { DomainService } from './domain.service';
import { Repository } from 'typeorm';
import { Domain } from 'src/entities/domain';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

describe('DomainService', () => {
  let service: DomainService;
  let domainRepository: Repository<Domain>;
  const DOMAIN_REPOSITORY_TOKEN = getRepositoryToken(Domain);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainService,
        {
          provide: DOMAIN_REPOSITORY_TOKEN,
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

    service = module.get<DomainService>(DomainService);
    domainRepository = module.get<Repository<Domain>>(DOMAIN_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('domainRepository should be defined', () => {
    expect(domainRepository).toBeDefined();
  });
});
