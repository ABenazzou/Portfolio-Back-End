import { Test, TestingModule } from '@nestjs/testing';
import { TechnologyController } from './technology.controller';
import { TechnologyService } from './technology.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('TechnologyController', () => {
  let controller: TechnologyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: TechnologyService,
          useValue: {
            getTechnologyByName: jest.fn(),
            getTechnologies: jest.fn(),
            getTechnologyById: jest.fn(),
            createTechnology: jest.fn(),
            updateTechnology: jest.fn(),
            deleteTechnology: jest.fn(),
          },
        },
      ],
      controllers: [TechnologyController],
    }).compile();

    controller = module.get<TechnologyController>(TechnologyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
