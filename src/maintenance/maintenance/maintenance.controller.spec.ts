import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceController } from './maintenance.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MaintenanceService } from './maintenance.service';

describe('MaintenanceController', () => {
  let controller: MaintenanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: MaintenanceService,
          useValue: {
            getMaintenance: jest.fn(),
            setMaintenance: jest.fn(),
          },
        },
        
      ],
      controllers: [MaintenanceController],
    }).compile();

    controller = module.get<MaintenanceController>(MaintenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
