import { Test, TestingModule } from '@nestjs/testing';
import { HobbyService } from './hobby.service';
import { Repository } from 'typeorm';
import { Hobby } from 'src/entities/hobby';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

describe('HobbyService', () => {
  let service: HobbyService;
  let hobbyRepository: Repository<Hobby>;
  const HOBBY_REPOSITORY_TOKEN = getRepositoryToken(Hobby);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HobbyService,
        {
          provide: HOBBY_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HobbyService>(HobbyService);
    hobbyRepository = module.get<Repository<Hobby>>(HOBBY_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hobbyRepository should be defined', () => {
    expect(hobbyRepository).toBeDefined();
  });
});
