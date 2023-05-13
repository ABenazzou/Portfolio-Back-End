import { Test, TestingModule } from '@nestjs/testing';
import { CertificateService } from './certificate.service';
import { DomainService } from 'src/domains/domain/domain.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Certificate } from 'src/entities/certificate';
import { Repository } from 'typeorm';

describe('CertificateService', () => {
  let service: CertificateService;
  let certificateRepository: Repository<Certificate>;
  const CERTIFICATE_REPOSITORY_TOKEN = getRepositoryToken(Certificate);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificateService,
        {
          provide: DomainService,
          useValue: {
            getDomainByName: jest.fn(),
          },
        },
        JwtService,
        {
          provide: CERTIFICATE_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CertificateService>(CertificateService);
    certificateRepository = module.get<Repository<Certificate>>(
      CERTIFICATE_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('certificateRepository should be defined', () => {
    expect(certificateRepository).toBeDefined();
  });
});
