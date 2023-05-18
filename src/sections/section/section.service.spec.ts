import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from './section.service';
import { Repository } from 'typeorm';
import { Section } from 'src/entities/section';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SectionService', () => {
  let service: SectionService;
  let sectionRepository: Repository<Section>;
  const SECTION_REPOSITORY_TOKEN = getRepositoryToken(Section);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: SECTION_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
    sectionRepository = module.get<Repository<Section>>(
      SECTION_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sectionRepository should be defined', () => {
    expect(sectionRepository).toBeDefined();
  });
});
