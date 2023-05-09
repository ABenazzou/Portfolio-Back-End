import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin';
import { Repository } from 'typeorm';

describe('AdminService', () => {
  let service: AdminService;
  let adminRepository: Repository<Admin>;
  const ADMIN_REPOSITORY_TOKEN = getRepositoryToken(Admin);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: ADMIN_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    adminRepository = module.get<Repository<Admin>>(ADMIN_REPOSITORY_TOKEN);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('adminRepository should be defined', () => {
    expect(adminRepository).toBeDefined();
  });
});
