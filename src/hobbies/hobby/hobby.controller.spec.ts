import { Test, TestingModule } from '@nestjs/testing';
import { HobbyController } from './hobby.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HobbyService } from './hobby.service';

describe('HobbyController', () => {
  let controller: HobbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: HobbyService,
          useValue: {
            getHobbies: jest.fn(),
            createHobby: jest.fn(),
            getHobbyById: jest.fn(),
            updateHobby: jest.fn(),
            deleteHobby: jest.fn(),
          },
        },
      ],
      controllers: [HobbyController],
    }).compile();

    controller = module.get<HobbyController>(HobbyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
