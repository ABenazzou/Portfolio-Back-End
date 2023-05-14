import { Test, TestingModule } from '@nestjs/testing';
import { DomainController } from './domain.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DomainService } from './domain.service';

describe('DomainController', () => {
  let controller: DomainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: DomainService,
          useValue: {
            getDomains: jest.fn(),
            getDomainById: jest.fn(),
            getDomainByName: jest.fn(),
            createDomain: jest.fn(),
            updateDomain: jest.fn(),
            deleteDomain: jest.fn(),
          },
        },
      ],
      controllers: [DomainController],
    }).compile();

    controller = module.get<DomainController>(DomainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
