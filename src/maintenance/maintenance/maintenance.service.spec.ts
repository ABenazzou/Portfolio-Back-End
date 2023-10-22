import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceService } from './maintenance.service';
import { Repository } from 'typeorm';
import { Maintenance } from 'src/entities/maintenance';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MaintenanceService', () => {
  let service: MaintenanceService;
  let maintenanceRepository: Repository<Maintenance>;
  const PROJECT_REPOSITORY_TOKEN = getRepositoryToken(Maintenance);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaintenanceService,
        {
          provide: PROJECT_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MaintenanceService>(MaintenanceService);
    maintenanceRepository = module.get<Repository<Maintenance>>(
      PROJECT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('projectRepository should be defined', () => {
    expect(maintenanceRepository).toBeDefined();
  });
});
