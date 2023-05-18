import { Test, TestingModule } from '@nestjs/testing';
import { SectionController } from './section.controller';
import { JwtService } from '@nestjs/jwt';
import { SectionService } from './section.service';
import { ConfigService } from '@nestjs/config';

describe('SectionController', () => {
  let controller: SectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: SectionService,
          useValue: {
            getSections: jest.fn(),
            getDisplayableSections: jest.fn(),
            getSectionByTitle: jest.fn(),
            getSectionByType: jest.fn(),
            getSectionById: jest.fn(),
            createSection: jest.fn(),
            updateSection: jest.fn(),
            deleteSection: jest.fn(),
          },
        },
      ],
      controllers: [SectionController],
    }).compile();

    controller = module.get<SectionController>(SectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
