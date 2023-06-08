import { Test, TestingModule } from '@nestjs/testing';
import { BiographyController } from './biography.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BiographyService } from './biography.service';

describe('BiographyController', () => {
  let controller: BiographyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: BiographyService,
          useValue: {
            getBiography: jest.fn(),
            getSortedBiography: jest.fn(),
            getBiographyById: jest.fn(),
            createBiography: jest.fn(),
            updateBiography: jest.fn(),
            deleteBiography: jest.fn(),
          },
        },
      ],
      controllers: [BiographyController],
    }).compile();

    controller = module.get<BiographyController>(BiographyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
