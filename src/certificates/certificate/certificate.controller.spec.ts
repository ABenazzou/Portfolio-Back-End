import { Test, TestingModule } from '@nestjs/testing';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('CertificateController', () => {
  let controller: CertificateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        ConfigService,
        {
          provide: CertificateService,
          useValue: {
            getCertificates: jest.fn(),
            getSortedCertificates: jest.fn(),
            getCertificatesById: jest.fn(),
            createCertificate: jest.fn(),
            addCertificateDomain: jest.fn(),
            updateCertificate: jest.fn(),
            deleteCertificate: jest.fn(),
          },
        },
      ],
      controllers: [CertificateController],
    }).compile();

    controller = module.get<CertificateController>(CertificateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
